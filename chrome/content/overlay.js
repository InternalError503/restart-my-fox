// Copyright (c) 2014 8pecxstudios.com 

var RestartMyFox = {
	
	restartBrowser: function() {	

		try{

			Cc["@mozilla.org/toolkit/app-startup;1"].getService(Ci.nsIAppStartup).quit(Ci.nsIAppStartup.eRestart | Ci.nsIAppStartup.eAttemptQuit);
	
			}catch (e){
				//Catch any nasty errors and output to dialogue.
				alert("Were sorry, Something has gone wrong while attempting to restart browser! " + e);					
		}
        
	}	
	
}

