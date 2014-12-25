// Copyright (c) 2014 8pecxstudios.com 

Cu.import("resource://gre/modules/Services.jsm");

var RestartMyFox = {
	
	restartBrowser: function() {	

		try{
		
				var RestartMyFoxPrefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("extensions.restart_my_fox.");
				
				if (RestartMyFoxPrefs.getBoolPref("purgecache")){
				
					Services.appinfo.invalidateCachesOnRestart();
					Cc["@mozilla.org/toolkit/app-startup;1"].getService(Ci.nsIAppStartup).quit(Ci.nsIAppStartup.eRestart | Ci.nsIAppStartup.eAttemptQuit);
					
				}else{
				
				Cc["@mozilla.org/toolkit/app-startup;1"].getService(Ci.nsIAppStartup).quit(Ci.nsIAppStartup.eRestart | Ci.nsIAppStartup.eAttemptQuit);
			}
	
			}catch (e){
				//Catch any nasty errors and output to dialogue.
				alert("Were sorry, Something has gone wrong while attempting to restart browser! " + e);					
		}
        
	}	
	
}

