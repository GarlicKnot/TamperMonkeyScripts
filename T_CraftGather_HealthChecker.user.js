// ==UserScript==
// @name         T - CraftGather - Health Checker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Checks on the health of crafting, if you run out of resources it refreshes
// @author       You
// @run-at       document-end
// @match        *talibri.com/crafting/3?city_id=2
// @match        *talibri.com/crafting/2?city_id=1
// @match        *talibri.com/crafting/6?city_id=2
// @match        *talibri.com/locations/1/show
// @match        *talibri.com/locations/13/show
// @match        *talibri.com/locations/10/show
// @match        *talibri.com/locations/7/show
// @grant        GM_Style
// ==/UserScript==



//Function Part 2 - Check for Resource Exhaustion
//Check to see if you have a failure - in the case of failure refresh. Brute force method to solve failure
function ResourceExhaustedCheck() {
    var headertext = $('#skill_details > div > div.panel-heading > h3').text();
    var failuremessagecraft  = "Something went wrong please refresh the page and try again.";
    var failuremessagegather = "Hmmm it seems your timer may be out of sync with the server... Please refresh the page and give it another go!";
    console.log("Running health checker");
    if (headertext === failuremessagegather | headertext===failuremessagecraft) {
        ///Refreshes the page
        location.reload();
    }
}
//Runs function every ~5 seconds to check - rate can likely be dropped no problem
ResourceExhaustedCheck();
setInterval(ResourceExhaustedCheck,60/11*1000);
