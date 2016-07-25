#!/usr/bin/python

# Imports
import os
import re
import sys

from glob import glob
from zipfile import ZipFile, ZIP_STORED, ZIP_DEFLATED

# XPI package files, Note must update when adding or removing files.
resources = [
	"install.rdf",
	"chrome.manifest",
	"defaults/preferences/prefs.js",
	"chrome/content/options.js",
	"chrome/content/overlay.js",
	"chrome/content/R-M-F.xul",
	"chrome/content/RMF_options.xul",
	"chrome/locale/*/*",
	"chrome/skin/*"
	]

# Zip package
class ZipOutFile(ZipFile):
    def __init__(self, zfile):
        ZipFile.__init__(self, zfile, "w", ZIP_DEFLATED)

    def __enter__(self):
        return self

    def __exit__(self, type, value, traceback):
        self.close()

# Enumerate resource files and folders.	
def get_files(resources):
    for r in resources:
        if os.path.isfile(r):
            yield r
            continue
        for g in glob(r):
            yield g

# Build XPI package.
def buildXPI( version ):
	destination = "xpi/restart_my_fox-" + version + "-fx.xpi"
	# Check if the package already exists in our destination and remove it.
	if os.path.exists(destination):
		print("Found & removing: " + destination)
		os.remove(destination)
	print('Creating package please wait!')	
	with ZipOutFile(destination) as zp:
		for f in sorted(get_files(resources), key=str.lower):
			compress_type = ZIP_STORED if f.endswith(".png") else ZIP_DEFLATED
			zp.write(f, compress_type=compress_type)
			print("Compressing: " + f.replace('\\', '/'))
	return;

# Since we use command line arguments we require two in total "build" & "0.0.0" (Version) for XPI package.	
if sys.argv[1] == "build":
	# Make XPI directory if not exists.
	if not os.path.exists("xpi"):
		os.makedirs("xpi")
	# Send version to build XPI package.
	buildXPI(sys.argv[2])
	sys.exit()
else:
	# If the above command line arguments were not set say goodbye.
	print('Invalid commands or failed build!')
	sys.exit()