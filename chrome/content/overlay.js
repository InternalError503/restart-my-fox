/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Cu.import("resource://gre/modules/Services.jsm");
Services.prefs.QueryInterface(Ci.nsIPrefBranch);

var RestartMyFox = {
	
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
RestartMyFox.init();