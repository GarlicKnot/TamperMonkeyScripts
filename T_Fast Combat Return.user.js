// ==UserScript==
// @name         T - Fast Combat Return
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Returns straight back to combat when you die
// @author       You
// @run-at       document-start
// @match        *talibri.com/combat_zones/
// @match        *talibri.com/combat_zones
// @grant        none
// ==/UserScript==

//Sends back to combat - need to adjust to the correct combat zone
//Configured for zone 7
function DeadReset( ) {
    ///moves you back to combat when you die
    this.document.location = 'https://talibri.com/combat_zones/9/adventure';
}

DeadReset();