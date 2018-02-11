// ==UserScript==
// @name         T2-Fast Combat Shift to Inventory
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
    //moves you to inventory on death
    //You have to define the zone you move back to - zone 1-9 - OLD
    this.document.location = 'https://talibri.com/inventory';
}

DeadReset();