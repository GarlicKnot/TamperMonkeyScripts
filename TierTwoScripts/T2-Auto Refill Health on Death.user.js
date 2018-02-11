// ==UserScript==
// @name         T2-Auto Refill Health on Death
// @namespace    http://tampermonkey.net/
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *talibri.com/inventory
// @run-at       document-start
// @grant        GM_Style
// ==/UserScript==

var FightLocation ='https://talibri.com/combat_zones/7/adventure';
var itemkey = '#user_item_3984341 > td.actions > button';

function healthcheck() {
    var hdata = $('#user-stat-health span').text();
    var hsplit = hdata.split('/');
    var hpercent = Math.floor((hsplit[0] / hsplit[2]) * 100);
    console.log(hpercent);
    if (hpercent < 100) {
        console.log("CLICKING");
        $(itemkey).click();
        $(itemkey).click();
        $(itemkey).click();
        $(itemkey).click();
        this.document.location = FightLocation;
    }
}

waitForKeyElements(
    itemkey,
    healthcheck);