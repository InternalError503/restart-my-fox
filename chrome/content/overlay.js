// Copyright (c) 2014 8pecxstudios.com 

//Kris Maglione: (Quote) your code unduly difficult to read > > Fixed i hope its easier to read now sorry if the code was hard to read.
var RestartMyFox = {
	
	restartBrowser: function() {	

		try{
			//Kris Maglione: In any case, please just call `Application.restart` rather than implementing the logic yourself. >> I hope this was what you were after.
			Cc["@mozilla.org/toolkit/app-startup;1"].getService(Ci.nsIAppStartup).quit(Ci.nsIAppStartup.eRestart | Ci.nsIAppStartup.eAttemptQuit);
	
			}catch (e){
				//Catch any nasty errors and output to dialogue message
				alert("An error was encountered while attempting to restart browser! " + e);					
		}
        
	}	
	
}

