// ==UserScript==
// @name         Talibri - Automatic Combat
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Dragon
// @match        *talibri.com/combat_zones/*/adventure
// @grant        none
// ==/UserScript==

///There are some enemies that should simply be avoided - this serves to do that
function Refresh( ) {
    ///Refreshes the page
    location.reload();
}
///Starts the combat function so you don't have to click start - also restarts upon death or refresh
function StartCombat( ) {
    ///Starts Combat from attack pre-screen
    $('#combat_details > div > div.panel-footer > div > div.col-md-12 > button').click();
}

///Solves for death
function Dead( ) {
    ///moves you back to combat when you die - change the # to change the zone
    this.document.location = 'http://talibri.com/combat_zones/5/adventure';
}
function AttackCombo1( ) {
      ///Common function for all battles - edit as desired by changing button #
      document.evaluate('//*[@id="combat_details"]/div/div[3]/div/div[2]/div/div/button[2]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
      document.evaluate('//*[@id="combat_details"]/div/div[3]/div/div[2]/div/div/button[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
      document.evaluate('//*[@id="combat_details"]/div/div[3]/div/div[2]/div/div/button[3]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
      document.evaluate('//*[@id="combat_details"]/div/div[3]/div/div[2]/div/div/button[4]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
}

function AttackCombo2( ) {
      ///Common function for all battles - edit as desired by changing button #
      document.evaluate('//*[@id="combat_details"]/div/div[3]/div/div[2]/div/div/button[2]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
      document.evaluate('//*[@id="combat_details"]/div/div[3]/div/div[2]/div/div/button[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
      document.evaluate('//*[@id="combat_details"]/div/div[3]/div/div[2]/div/div/button[3]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
      document.evaluate('//*[@id="combat_details"]/div/div[3]/div/div[2]/div/div/button[4]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
}

///This is the function that will execute every ~five seconds in combat
function combat( ) {
    ///Grab and Break out Health DataFrame - no change required
    var hdata = $('#user-stat-health span').text();
    var hsplit = hdata.split('/');
    var hpercent = Math.floor((hsplit[0] / hsplit[2]) * 100);
    var hval   = hsplit[0];
    ///Grab and Break out Mana - no change required
    var mdata   = $('#user-stat-mana span').text();
    var msplit = mdata.split('/');
    var mval   = msplit[0];
    var mpercent = Math.floor((msplit[0] / msplit[2]) * 100);
    ///Grab Enemy Data - no change required
    var enemydata  = $('#combat_details > div > div.panel-heading > h3 > span.in-combat-enemy-name').text();

    ///console log for data - optional - can take and use a script to pull gold/hour, enemy frequency, etc.
    console.log($('#combat_details > div > div.panel-body.combat-panel > div:nth-child(2)').text());

    ///Custom heal - change 40 to customize %. Consumes slot #1 (default healing)
    if ($('#combat_details > div > div.panel-heading.text-center > h3').text() === "Prepare for combat!") {
        $('#combat_details > div > div.panel-footer > div > div.col-md-12 > button').click();
    } else if (hval < 133) {
      document.evaluate('//*[@id="combat_details"]/div/div[3]/div/div[1]/div/div/button[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
    } else if (mval < 2) {
      document.evaluate('//*[@id="combat_details"]/div/div[3]/div/div[1]/div/div/button[2]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
    } else if (enemydata === "Zap Bat") {
      AttackCombo1();
    } else if (enemydata === "Shock Scorpion") {
      Refresh();
    } else if (enemydata == "Lightning Elemental") {
      AttackCombo2();
    } else if (enemydata == "Greater Demon") {
      AttackCombo1();
    } else if (enemydata == "Reaper") {
      Refresh();
    } else if (enemydata == "Lesser Demon") {
      Refresh();
    }
}

///Starts function and then restarts every 5-6 seconds - based on observed actions per minute with client-server latency
combat();
setInterval(combat,60/11*1000);
