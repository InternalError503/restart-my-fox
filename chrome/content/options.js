/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
Components.utils.import("resource://gre/modules/Services.jsm");
Services.prefs.QueryInterface(Components.interfaces.nsIPrefBranch);

var RestartMyFoxOptions = {

    init: function() {
        try {

            //Set default states
            if (Services.prefs.getBoolPref("extensions.restart_my_fox.panelbtnsmall") === true) {
                document.getElementById("restart_my_fox_customicon").disabled = true;
                document.getElementById("rmfcustomicon").disabled = true;
                document.getElementById("rmfcustomiconcolor").disabled = true;
                document.getElementById("rmfcustomiconcolort").disabled = true;
                document.getElementById("rmfcustomiconcolorc").disabled = true;
                document.getElementById("restart_my_fox_customiconcolor").disabled = true;
                document.getElementById("restart_my_fox_customicondark").disabled = true;
            } else {
                document.getElementById("restart_my_fox_customicon").disabled = false;
                document.getElementById("rmfcustomicon").disabled = false;
                document.getElementById("rmfcustomiconcolor").disabled = false;
                document.getElementById("rmfcustomiconcolort").disabled = false;
                document.getElementById("rmfcustomiconcolorc").disabled = false;
                document.getElementById("restart_my_fox_customiconcolor").disabled = false;
                document.getElementById("restart_my_fox_customicondark").disabled = false;
            }

            if (Services.prefs.getBoolPref("extensions.restart_my_fox.customicon") === true) {
                document.getElementById("restart_my_fox_panelbtnsmall").disabled = true;
            } else {
                document.getElementById("restart_my_fox_panelbtnsmall").disabled = false;
            }

            //Listen for change
            Application.prefs.get("extensions.restart_my_fox.panelbtnsmall").events.addListener("change", function(aEvent) {
                if (Services.prefs.getBoolPref("extensions.restart_my_fox.panelbtnsmall") === true) {
                    document.getElementById("restart_my_fox_customicon").disabled = true;
                    document.getElementById("rmfcustomicon").disabled = true;
                    document.getElementById("rmfcustomiconcolor").disabled = true;
                    document.getElementById("rmfcustomiconcolort").disabled = true;
                    document.getElementById("rmfcustomiconcolorc").disabled = true;
                    document.getElementById("restart_my_fox_customiconcolor").disabled = true;
                    document.getElementById("restart_my_fox_customicondark").disabled = true;
                } else {
                    document.getElementById("restart_my_fox_customicon").disabled = false;
                    document.getElementById("rmfcustomicon").disabled = false;
                    document.getElementById("rmfcustomiconcolor").disabled = false;
                    document.getElementById("rmfcustomiconcolort").disabled = false;
                    document.getElementById("rmfcustomiconcolorc").disabled = false;
                    document.getElementById("restart_my_fox_customiconcolor").disabled = false;
                    document.getElementById("restart_my_fox_customicondark").disabled = false;
                }
            });

            Application.prefs.get("extensions.restart_my_fox.customicon").events.addListener("change", function(aEvent) {
                if (Services.prefs.getBoolPref("extensions.restart_my_fox.customicon") === true) {
                    document.getElementById("restart_my_fox_panelbtnsmall").disabled = true;
                } else {
                    document.getElementById("restart_my_fox_panelbtnsmall").disabled = false;
                }
            });

        } catch (e) {}
    }

}
window.addEventListener("load", function() {
    RestartMyFoxOptions.init();
}, false);