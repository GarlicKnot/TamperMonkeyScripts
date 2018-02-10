// ==UserScript==
// @name         Fill Buy Orders
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @match        *talibri.com/trade/1
// @match        talibri.com/trade/1
// @grant        none
// ==/UserScript==


var marketbar = 'body > div.container-fluid > div > div.col-md-9.main-page > div > div.panel-body > div > div:nth-child(1) > a.buy-order-select'
var Material         = 'body > div.container-fluid > div > div.col-md-9.main-page > div.panel.panel-success > div.panel-body > div > div:nth-child(2) > div > a.filter-material';
var RawFish          = 'body > div.container-fluid > div > div.col-md-9.main-page > div.panel.panel-success > div.panel-body > div > div:nth-child(2) > div > a.filter-raw-fish';
var Food             = 'body > div.container-fluid > div > div.col-md-9.main-page > div.panel.panel-success > div.panel-body > div > div:nth-child(2) > div > a.filter-food';
var Herb             = 'body > div.container-fluid > div > div.col-md-9.main-page > div.panel.panel-success > div.panel-body > div > div:nth-child(2) > div > a.filter-herb';
var RefinedMaterial  = 'body > div.container-fluid > div > div.col-md-9.main-page > div.panel.panel-success > div.panel-body > div > div:nth-child(2) > div > a.filter-refined-material';
var Ammunition       = 'body > div.container-fluid > div > div.col-md-9.main-page > div.panel.panel-success > div.panel-body > div > div:nth-child(2) > div > a.filter-ammunition';
var CombatPotion     = 'body > div.container-fluid > div > div.col-md-9.main-page > div.panel.panel-success > div.panel-body > div > div:nth-child(2) > div > a.filter-combat-potion';
var ConsumablePotion = 'body > div.container-fluid > div > div.col-md-9.main-page > div.panel.panel-success > div.panel-body > div > div:nth-child(2) > div > a.filter-consumable-potion';


waitForKeyElements (
  marketbar,
  MoveToSell
);

function MovetoSell(jNode) {
  $('body > div.container-fluid > div > div.col-md-9.main-page > div > div.panel-body > div > div:nth-child(1) > a.sell-order-select').trigger("click")
  waitForKeyElements (
    Food,
    MoveToFood
  );
}


function MoveToFood(jNode) {
  $(Food).trigger("click");
  console.log("Got This Far")

}


///Open up buy orders
function Move() {
  ///Open up Buy Orders
  $('body > div.container-fluid > div > div.col-md-9.main-page > div > div.panel-body > div > div:nth-child(1) > a.buy-order-select').click();
}

function BuyOrderTypeSelection() {
  ///Open up target subsection - edit this to target
  waitForKeyElements (
    Food,
    ActivateSellSelection
  );
}

function MoveToFoo


waitForKeyElements(
  $('#listing-1870 > td.actions > button'),
  ClickID();
)

ClickID() {
  $('#listing-1870 > td.actions > button').click()
}

function TryForID() {
    if ($('#listing-1870 > td.actions > button').text() === 'undefined') {
        timer = window.setTimeout("TryforID()",5000);
    } else {
        console.log($('#listing-1870 > td.actions > button').text());
        return $('#listing-1870 > td.actions > button').text();

    }

}

function TryForID2() {
    var listing = $('#listing-1870 > td.actions > button').text();
    return listing;
}

function IDChecker() {
    if (TryForID2 === 'undefined') {
        timer = window.setTimeout("TryForID2()", 1000);
    } else {
        var thing = TryForID2();
        console.log(TryForID2());
    }

}

function BuyOrderIdentification() {
  ///Define the Sell Order - Edit to the correct one
  BuyOrderlisting = TryForID();
  console.log(BuyOrderListing);
  $(BuyOrderListing).click();
  window.onload = $(BuyOrderListing).click();
  console.log(BuyOrderListing);
  ///Grab your current inventory
  var CurrentInventory = $('body > div.modal.fade.in > div > div > div.modal-body > form > div > label').text();
  ///
  var NumericInventory = CurrentInventory.split(/You have{0,1}/)[1].replace(/[^0-9]/g,'');
  ///Sell Goal
  console.log(NumericInventory);
}



window.onload = BuyOrders();
window.onload = BuyOrderTypeSelection();
///window.onload = BuyOrderIdentification();
