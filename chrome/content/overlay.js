/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
Cu.import("resource://gre/modules/Services.jsm");
Services.prefs.QueryInterface(Ci.nsIPrefBranch);

var RestartMyFox = {

    RMFBundle: Services.strings.createBundle("chrome://R-M-F/locale/RMFdialogue.properties"),
    Branding: Services.strings.createBundle("chrome://branding/locale/brand.properties").GetStringFromName("brandShortName"),

    init: function() {

        try {
            document.getElementById("PanelUI-popup").addEventListener("popupshowing", function(e) {
                if (!Services.prefs.getBoolPref("extensions.restart_my_fox.paneluibutton")) {
                    document.getElementById("panel_menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").hidden = true;
                } else {
                    document.getElementById("panel_menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").hidden = false;
                }
                if (Services.prefs.getBoolPref("extensions.restart_my_fox.panelbtnsmall")) {
                    document.getElementById("panel_menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").className = "rmf_small_icon";
                }
                if (Services.prefs.getBoolPref("extensions.restart_my_fox.customicon")) {
                    if (Services.prefs.getBoolPref("extensions.restart_my_fox.customicondark")) {
                        document.getElementById("panel_menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").className = "rmf_custom_icon_puid";
                    } else {
                        document.getElementById("panel_menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").className = "rmf_custom_icon_pui";
                    }
                    document.getElementById("panel_menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").style.backgroundColor = Services.prefs.getCharPref("extensions.restart_my_fox.customiconcolor");
                }
            });

            //Listen for change "panelbtnsmall" if false clear attribute
            Application.prefs.get("extensions.restart_my_fox.panelbtnsmall").events.addListener("change", function(aEvent) {
                if (!Services.prefs.getBoolPref("extensions.restart_my_fox.panelbtnsmall")) {
                    document.getElementById("panel_menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").removeAttribute('class');
                }
            });

            //Listen for change "customicon" if false clear attributes
            Application.prefs.get("extensions.restart_my_fox.customicon").events.addListener("change", function(aEvent) {
                if (!Services.prefs.getBoolPref("extensions.restart_my_fox.customicon")) {
                    document.getElementById("panel_menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").removeAttribute('class');
                    document.getElementById("panel_menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").removeAttribute('style');
                }
            });

            //Listen for change "customicondark" if false clear attribute
            Application.prefs.get("extensions.restart_my_fox.customicondark").events.addListener("change", function(aEvent) {
                if (!Services.prefs.getBoolPref("extensions.restart_my_fox.customicondark")) {
                    document.getElementById("panel_menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").removeAttribute('class');
                }
            });

            document.getElementById("toolbar-menubar").addEventListener("popupshowing", function(e) {
                if (!Services.prefs.getBoolPref("extensions.restart_my_fox.menubarbutton")) {
                    document.getElementById("menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").hidden = true;
                } else {
                    document.getElementById("menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").hidden = false;
                }
            });

            window.addEventListener("beforecustomization", function(e) {
                document.getElementById("panel_menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").setAttribute('disabled', true);
            }, false);

            window.addEventListener("aftercustomization", function(e) {
                document.getElementById("panel_menu_948622EF9DD31D8EC28360C72957C429_restartBrowser").removeAttribute('disabled');
            }, false);

        } catch (e) {}

    },

    restartBrowser: function() {

        try {

            if (Services.prefs.getBoolPref("extensions.restart_my_fox.requireconfirm")) {
                if (Services.prompt.confirm(null, this.RMFBundle.formatStringFromName("dialogue.title", [this.Branding], 1),
                        this.RMFBundle.formatStringFromName("dialogue.message", [this.Branding], 1))) {

                    if (Services.prefs.getBoolPref("extensions.restart_my_fox.purgecache")) {
                        Services.appinfo.invalidateCachesOnRestart();
                        Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit);
                    } else {
                        Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit);
                    }
                }
            } else {
                if (Services.prefs.getBoolPref("extensions.restart_my_fox.purgecache")) {
                    Services.appinfo.invalidateCachesOnRestart();
                    Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit);
                } else {
                    Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit);
                }
            }
        } catch (e) {
            //Catch any nasty errors and output to dialogue.
            alert("Were sorry, Something has gone wrong while attempting to restart browser! " + e);
        }

    }

}
RestartMyFox.init();