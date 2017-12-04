// ==UserScript==
// @name         Talibri - Auto Refill Health on Death
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *talibri.com/inventory
// @grant        none
// ==/UserScript==

///Checks the health of the user when in the inventory screen every second; if user not at 100% health then eats defined potion #user_item_xxxxxx - this only occurs after death so saves a combat turn or two and allows for consumption of lower end/cheaper food
function healthcheck() {
    var hdata = $('#user-stat-health span').text();
    var hsplit = hdata.split('/');
    var hpercent = Math.floor((hsplit[0] / hsplit[2]) * 100);
    if (hpercent < 99) {
        $('#user_item_12393 > td.actions > button').click();
    } else if (hpercent > 98) {
        this.document.location = 'http://talibri.com/combat_zones/5/adventure';
    }
}

///Starts function and then restarts every 5-6 seconds - based on observed actions per minute with client-server latency
healthcheck();
setInterval(healthcheck,1000);
