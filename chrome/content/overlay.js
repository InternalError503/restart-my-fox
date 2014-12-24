// Copyright (c) 2013 8pecxstudios \\
// Use of this code is strictly by permissions only even tho its very simple code. \\

var RestartMyFox = {
	
	restartBrowser: function() {	

		try{
			const nsIAppStartup = Ci.nsIAppStartup;
				var nsIObSer = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
				var QuitThis = Cc["@mozilla.org/supports-PRBool;1"].createInstance(Ci.nsISupportsPRBool);
			nsIObSer.notifyObservers(QuitThis, "quit-application-requested", null);
   
			if (QuitThis.data)
				return;
				
			nsIObSer.notifyObservers(null, "quit-application-granted", null);
			
				var windowMed = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
				var gEnum = windowMed.getEnumerator(null);
				
			while (gEnum.hasMoreElements()) {
				var RX7 = gEnum.getNext();
			if (("tryToClose" in RX7) && !RX7.tryToClose())
				return;
    }
    Cc["@mozilla.org/toolkit/app-startup;1"].getService(nsIAppStartup).quit(nsIAppStartup.eRestart | nsIAppStartup.eAttemptQuit);
	
			}catch (e){
				//Catch any nasty errors and output to dialogue and console
				alert("A Error Was Encountered While Attempting To Restart Browser! " + e);					
		}
        
	}	
	
}

