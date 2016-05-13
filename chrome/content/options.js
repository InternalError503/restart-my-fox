/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

(function(global) {
 
var {Services} = Components.utils.import("resource://gre/modules/Services.jsm", {});

if (typeof RestartMyFoxOptions  == "undefined") {
    var RestartMyFoxOptions  = {};
};
if (!RestartMyFoxOptions ) {
    RestartMyFoxOptions  = {};
};

RestartMyFoxOptions = {

    init: function() {
        try {

            //Set default states
            if (Services.prefs.getBoolPref("extensions.restart_my_fox.panelbtnsmall") === true) {
                document.getElementById("restart_my_fox_customicon").disabled = true;
                document.getElementById("rmfcustomiconcolor").disabled = true;
                document.getElementById("rmfcustomiconcolort").disabled = true;
                document.getElementById("rmfcustomiconcolorc").disabled = true;
                document.getElementById("restart_my_fox_customiconcolor").disabled = true;
                document.getElementById("restart_my_fox_customicondark").disabled = true;
            } else {
                document.getElementById("restart_my_fox_customicon").disabled = false;
                document.getElementById("rmfcustomicon").disabled = false;
            }

                if (Services.prefs.getBoolPref("extensions.restart_my_fox.customicon") === true) {
                    document.getElementById("restart_my_fox_panelbtnsmall").disabled = true;
                    document.getElementById("rmfcustomiconcolor").disabled = false;
                    document.getElementById("rmfcustomiconcolort").disabled = false;
                    document.getElementById("rmfcustomiconcolorc").disabled = false;
                    document.getElementById("restart_my_fox_customiconcolor").disabled = false;
                    document.getElementById("restart_my_fox_customicondark").disabled = false;
                } else {
                    document.getElementById("restart_my_fox_panelbtnsmall").disabled = false;
                    document.getElementById("rmfcustomiconcolor").disabled = true;
                    document.getElementById("rmfcustomiconcolort").disabled = true;
                    document.getElementById("rmfcustomiconcolorc").disabled = true;
                    document.getElementById("restart_my_fox_customiconcolor").disabled = true;
                    document.getElementById("restart_my_fox_customicondark").disabled = true;
                }

            function PrefListener(branch_name, callback) {
                // Keeping a reference to the observed preference branch or it will get
                // garbage collected.
                this._branch = Services.prefs.getBranch(branch_name);
                this._branch.QueryInterface(Components.interfaces.nsIPrefBranch2);
                this._callback = callback;
            }

            PrefListener.prototype.observe = function(subject, topic, data) {
                if (topic == 'nsPref:changed')
                    this._callback(this._branch, data);
            };

            PrefListener.prototype.register = function(trigger) {
                this._branch.addObserver('', this, false);
                if (trigger) {
                    let that = this;
                    this._branch.getChildList('', {}).
                    forEach(function(pref_leaf_name) {
                        that._callback(that._branch, pref_leaf_name);
                    });
                }
            };

            PrefListener.prototype.unregister = function() {
                if (this._branch)
                    this._branch.removeObserver('', this);
            };

            var RestartMyFoxSettingsListener_Op = new PrefListener(
                "extensions.restart_my_fox.",
                function(branch, name) {
                    switch (name) {
                        //Listen for change "panelbtnsmall" if false clear attribute
                        case "panelbtnsmall":
								if (branch.getBoolPref("panelbtnsmall") === true) {
									document.getElementById("restart_my_fox_customicon").disabled = true;
									document.getElementById("rmfcustomiconcolor").disabled = true;
									document.getElementById("rmfcustomiconcolort").disabled = true;
									document.getElementById("rmfcustomiconcolorc").disabled = true;
									document.getElementById("restart_my_fox_customiconcolor").disabled = true;
									document.getElementById("restart_my_fox_customicondark").disabled = true;
								} else {
									document.getElementById("restart_my_fox_customicon").disabled = false;
								}                          
                            break;
                            //Listen for change "customicon" if false clear attributes
                        case "customicon":
							if (branch.getBoolPref("customicon") === true) {
								document.getElementById("restart_my_fox_panelbtnsmall").disabled = true;
								document.getElementById("rmfcustomiconcolor").disabled = false;
								document.getElementById("rmfcustomiconcolort").disabled = false;
								document.getElementById("rmfcustomiconcolorc").disabled = false;
								document.getElementById("restart_my_fox_customiconcolor").disabled = false;
								document.getElementById("restart_my_fox_customicondark").disabled = false;
							} else {
								document.getElementById("restart_my_fox_panelbtnsmall").disabled = false;
								document.getElementById("rmfcustomiconcolor").disabled = true;
								document.getElementById("rmfcustomiconcolort").disabled = true;
								document.getElementById("rmfcustomiconcolorc").disabled = true;
								document.getElementById("restart_my_fox_customiconcolor").disabled = true;
								document.getElementById("restart_my_fox_customicondark").disabled = true;
							}
                            break;
                    }
                }
            );

            RestartMyFoxSettingsListener_Op.register(true);			

        } catch (e) {}
    }

}
global.RestartMyFoxOptions = RestartMyFoxOptions;
	window.addEventListener("load", function() {
		window.removeEventListener("load", RestartMyFoxOptions.init(), false);
		RestartMyFoxOptions.init();
	}, false);
}(this));