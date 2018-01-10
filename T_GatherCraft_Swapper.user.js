// ==UserScript==
// @name         T - GatherCraft - Swapper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @match        *talibri.com/locations/1/show
// @match        *talibri.com/locations/13/show
// @match        *talibri.com/locations/10/show
// @match        *talibri.com/locations/7/show
// @match        *talibri.com/crafting/3?city_id=2
// @match        *talibri.com/crafting/2?city_id=1
// @match        *talibri.com/crafting/6?city_id=2
// @grant        GM_Style
// ==/UserScript==

//Baseline values
var inventory = {
    "Normal":0,
    "Elder" :0,
    "Rare":0,
    "Ancient":0,
    "Imbued":0,
    "Infernal":0,
    "Ascendant":0,
};

//Dictionary for maximimums when to switch
var Max = {
    "Seared Salmon":1,
    "Pine Logs":1,
    "Salmon":1,
    "Mana Potion":260,
    "Fly Agaric":1600,
    "Hops":800
};

var TypeDict = {

  'https://talibri.com/locations/1/show': "Spruce Logs",
  'https://talibri.com/locations/7/show': "Salmon",
  'https://talibri.com/crafting/2?city_id=1':"Seared Salmon",
  'https://talibri.com/locations/13/show':"Fly Agaric",
  'https://talibri.com/locations/10/show' :"Hops",
  'https://talibri.com/crafting/6?city_id=2':"Mana Potion"
};

skillresult = '#skill_details > div > div.panel-body';


function TotalResourceCounter() {
    currentURL = document.URL;
    Type = TypeDict[currentURL];
    if($(skillresult).text()!==""){
      skillresults = $(skillresult).text();
      if (skillresults.includes("reeled in")) {
        //apply fish solution
        var countsplitter   = (skillresults.split("!")[2].split(".")[0].replace( /\D+/g, ''));
        var qualitysplit = skillresults.split("!")[2].split(".")[0];
      } else if (skillresults.includes('produced' && 'Salmon')){
        //apply cooking solution
        var countsplitter   = (skillresults.split(".")[1].split("!")[1].replace( /\D+/g, ''));
        var qualitysplit = skillresults.split(".")[1].split("!")[0];

      } else if (skillresults.includes('picked')) {
          var countsplitter = skillresults.split("!")[1].split(".")[0].replace( /\D+/g, '');
          var qualitysplit  = skillresults.split("!")[1].split(".")[0];
      } else if (skillresults.includes('produced')) {
          var countsplitter = skillresults.split("!")[1].split(".")[0].replace( /\D+/g, '');
          var qualitysplit  = skillresults.split("!")[0].split(".")[1];
      } else {
        console.log("I think we failed to succeed this time :*|");
        var countsplitter = 0;
        var qualitysplit = "None";
      }

      //Split out quality and update count
      if (skillresults.includes("Elder")){
          inventory.Elder = parseInt(countsplitter);
      } else if (skillresults.includes("Rare")) {
          inventory.Rare = parseInt(countsplitter);
      } else if (skillresults.includes("Ancient")) {
          inventory.Ancient = parseInt(countsplitter);
      } else if (skillresults.includes("Imbued")) {
          inventory.Imbued = parseInt(countsplitter);
      } else if (skillresults.includes("Infernal")) {
          inventory.Infernal = parseInt(countsplitter);
      } else if (skillresults.includes("Ascendant")) {
          inventory.Ascendant = parseInt(countsplitter);
      } else if (parseInt(countsplitter)>0) {
          inventory.Normal = parseInt(countsplitter);
      } else {
          console.log("Failure detected");
      }
      console.log(inventory);

      //Log information so you can see it
      SumResource = dictsum(inventory);
      console.log("Current Resource Type: "+Type);
      var breakpoint = Max[Type];
      console.log("Current Goal: "+breakpoint);
      console.log("Current Total: "+SumResource);
      var perc = Math.floor((SumResource / breakpoint) * 100);
      console.log("Percent to Goal: "+perc);



      //Order for this example is Logs -> Salmon -> Seared Salmon -> Fly Agaric -> Hops -> Mana Potion
      if (SumResource>breakpoint && Type==="Spruce Logs") {
          //rotate to salmon
          window.location = 'https://talibri.com/locations/7/show';
      } else if (SumResource>breakpoint && Type==="Salmon") {
          //rotate to cooking seared salmon
          window.location = 'https://talibri.com/crafting/2?city_id=1';
      } else if (SumResource>breakpoint && Type==="Seared Salmon") {
          //Rotate to Fly Agaric
          window.location = 'https://talibri.com/locations/13/show';
      } else if (SumResource>breakpoint && Type==="Fly Agaric") {
          //Rotate to Hops
          window.location = 'https://talibri.com/locations/10/show';
      } else if (SumResource>breakpoint && Type==="Hops") {
          //Rotate to Mana Potions
          window.location = 'https://talibri.com/crafting/6?city_id=2';
      } else if (SumResource>breakpoint && Type==="Mana Potion") {
          //Rotate to combat
          window.location = 'https://talibri.com/combat_zones';
      }
    }
}

//Runs function every ~5 seconds to check - rate can likely be dropped no problem
TotalResourceCounter();
setInterval(TotalResourceCounter,60/11*1000);

//Dictionary Sum
function dictsum(obj) {
  var sum = 0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseFloat( obj[el] );
    }
  }
  return sum;
}
