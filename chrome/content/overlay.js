/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Cu.import("resource://gre/modules/Services.jsm");
Services.prefs.QueryInterface(Ci.nsIPrefBranch);

var RestartMyFox = {
	
	Prompter: Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService),
	RMFBundle: Cc["@mozilla.org/intl/stringbundle;1"].getService(Ci.nsIStringBundleService).createBundle("chrome://R-M-F/locale/RMFdialogue.properties"),
	Branding: Services.strings.createBundle("chrome://branding/locale/brand.properties").GetStringFromName("brandShortName"),
	
	init: function (){
		
		try {
				 document.getElementById("PanelUI-popup").addEventListener("popupshowing", function (e) {				 
					if (!Services.prefs.getBoolPref("extensions.restart_my_fox.paneluibutton")){					
						document.getElementById("panel_menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").hidden = true;	
					}else{
						document.getElementById("panel_menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").hidden = false;		
					}
				});
				
				 document.getElementById("toolbar-menubar").addEventListener("popupshowing", function (e) {					 
					if (!Services.prefs.getBoolPref("extensions.restart_my_fox.menubarbutton")){					
						document.getElementById("menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").hidden = true;
					}else{
						document.getElementById("menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").hidden = false;					
					}
				});				
		}catch (e){}	
			
	},
	
	restartBrowser: function() {	

		try{
				
			if (this.Prompter.confirm(null, this.RMFbundle.formatStringFromName("dialogue.title", [this.Branding], 1), 
				this.RMFBundle.formatStringFromName("dialogue.message", [this.Branding], 1))){
				
					if (Services.prefs.getBoolPref("extensions.restart_my_fox.purgecache")){
					
						Services.appinfo.invalidateCachesOnRestart();
						Cc["@mozilla.org/toolkit/app-startup;1"].getService(Ci.nsIAppStartup).quit(Ci.nsIAppStartup.eRestart | Ci.nsIAppStartup.eAttemptQuit);
						
					}else{
					
						Cc["@mozilla.org/toolkit/app-startup;1"].getService(Ci.nsIAppStartup).quit(Ci.nsIAppStartup.eRestart | Ci.nsIAppStartup.eAttemptQuit);
					}
			}
			
			}catch (e){
				//Catch any nasty errors and output to dialogue.
				alert("Were sorry, Something has gone wrong while attempting to restart browser! " + e);					
		}
        
	}	
	
}
RestartMyFox.init();