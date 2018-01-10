// ==UserScript==
// @name         T - Gather - Starter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @run-at       document-end
// @match        *talibri.com/locations/1/show
// @match        *talibri.com/locations/13/show
// @match        *talibri.com/locations/10/show
// @match        *talibri.com/locations/7/show
// @grant        GM_Style
// ==/UserScript==

var TypeDictStartButtons = {
  'https://talibri.com/locations/1/show': "#start_16",
  'https://talibri.com/locations/7/show': "#start_31",
  'https://talibri.com/locations/13/show':"#start_46",
  'https://talibri.com/locations/10/show' :"#start_47",
};

function GatherStarter() {
    currentURL = document.URL;
    startbutton = TypeDictStartButtons[currentURL];
    console.log("Start Button: " + startbutton);
    $(startbutton).trigger("click");
}

GatherStarter();