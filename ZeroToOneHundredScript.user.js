// ==UserScript==
// @name         Talibri - Auto Move to Inventory
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @match        talibri.com/dashboard
// @match        *talibri.com/dashboard
// @match        talibri.com/dashboard/
// @match        *talibri.com/dashboard
// @grant        none
// ==/UserScript==

///When you go to the dashboard send to Fly Agaric
function Refresh( ) {
    ///Refreshes the page
    location.reload();
}

function MoveToFlyAgaric( ) {
    ///Refreshes the page
    this.document.location = 'http://talibri.com/locations/13/show';
}

function MoveToHops( ) {
  this.document.location = 'http://talibri.com/locations/10/show';
}

function StopGatherCraft() {
  $('button.btn:nth-child(2)').click();
}

function SearedSalmon() {
  $('.recipe-77').click();

}


MoveToInventory();

// BLAH BLAH BLAH //
// FLY AGARIC     //
var NormBreakpoint  =
var ElderBreakpoint =

function StartFlyAgaric() {
  //Start gathering Fly Agaric
  $('#start_46 > img').click()
}

function FlyAgaricTracker() {
  // On Failure
  if ($('#skill_details').text().includes('the right plant')) {

  } else if ($('#skill_details').text().includes('received')){
    var FlyCount = $('#skill_details > div > div.panel-body').text().split('now have ')[1].split(' ')[0]
    var FlyQuality = $('#skill_details > div > div.panel-body').text().split('now have ')[1].split(' ')[1]
    console.log("FlyCount")
    console.log("FlyQuality")
  } else if ($('#skill_details').text().includes('out of sync')){

  }

//  if (FlyCount > )

}

// Start the hops stuff

function StartFlyAgaric() {
  //Start gathering Fly Agaric
  $('#start_47 > img').click()
}

function MoveToHops( ) {
    ///Refreshes the page
    this.document.location = 'http://talibri.com/locations/10/show';
}





MoveToInventory();

var reslog = 0;
var runcount = 0;

function startCollect( ) {
  timer = window.setTimeout("gather()",200);
}

function gather( ) {
  reslog = document.evaluate('//*[@id="skill_details"]/div/div[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
  timer = window.setTimeout("gather()",5000)
  console.log(reslog)
  runcount++
  console.log("runcount: "+runcount)
}

startCollect();


var pokelog = 0;
var iter = 0;

(function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)

function startCollect( ) {
  timer = window.setTimeout("scanner()",30000);
}

function scanner( ) {
  pokelog = document.evaluate('//*[@id="map"]/div[1]/div[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
  timer = window.setTimeout("scanner()",1000)
  iter++
  console.save(pokelog)
}

startCollect();
