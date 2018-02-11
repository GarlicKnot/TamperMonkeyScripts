// ==UserScript==
// @name         T2-Auto Combat Flexible Starter
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @run-at       document-end
// @author       Dragon
// @match        *talibri.com/combat_zones/*/adventure
// @grant        none
// ==/UserScript==

//Starts combat on entry to page
function StartCombat( ) {
    ///Starts Combat When Screen is in pre-attack
    $('#combat_details > div > div.panel-footer > div > div.col-md-12 > button').click();
}


//IDs when combat not started and starts it
function CombatManager() {
    var combattext = $('#combat_details > div > div.panel-heading.text-center > h3');
    if (combattext.text()==="Prepare for combat!") {
        console.log("Starting combat");
        StartCombat();
    }
}

CombatManager();
setInterval(CombatManager,100/10*1000);
