// Copyright (c) 2014 8pecxstudios.com 

Cu.import("resource://gre/modules/Services.jsm");
Services.prefs.QueryInterface(Ci.nsIPrefBranch);

var RestartMyFox = {
	
	restartBrowser: function() {	

		try{
						
				if (Services.prefs.getBoolPref("extensions.restart_my_fox.purgecache")){
				
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

