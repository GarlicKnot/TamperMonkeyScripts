// ==UserScript==
// @name         Talibri - Auto Move to Inventory
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        talibri.com/combat_zones/
// @match        talibri.com/combat_zones
// @grant        none
// ==/UserScript==

///Upon death moves the user to inventory page for auto-healing before being pushed back into combat

function MoveToInventory( ) {
    ///Refreshes the page
    this.document.location = 'http://talibri.com/inventory';
}
MoveToInventory();
