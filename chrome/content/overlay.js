// Copyright (c) 2014 8pecxstudios.com \\
// use of restart my fox code is strictly by permissions only even when its very simple code. \\

var RestartMyFox = {
	
	restartBrowser: function() {	

		try{
			const Omega = Ci.nsIAppStartup;
				var Alpha = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
				var Zeus = Cc["@mozilla.org/supports-PRBool;1"].createInstance(Ci.nsISupportsPRBool);
			Alpha.notifyObservers(Zeus, "quit-application-requested", null);
   
			if (Zeus.data)
				return;
				
			Alpha.notifyObservers(null, "quit-application-granted", null);
			
				var pegasus = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
				var Argos = pegasus.getEnumerator(null);
				
			while (Argos.hasMoreElements()) {
				var MazdaRX7 = Argos.getNext();
			if (("tryToClose" in MazdaRX7) && !MazdaRX7.tryToClose())
				return;
    }
    Cc["@mozilla.org/toolkit/app-startup;1"].getService(Omega).quit(Omega.eRestart | Omega.eAttemptQuit);
	
			}catch (e){
				//Catch any nasty errors and output to dialogue and console
				alert("A Error Was Encountered While Attempting To Restart Browser! " + e);					
		}
        
	}	
	
}

