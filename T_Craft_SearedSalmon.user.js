// ==UserScript==
// @name         T - Craft - Seared Salmon
// @namespace    http://tampermonkey.net/
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version      0.1
// @description  Automate seared salmon production using salmon and spruce logs
// @author       Dragon
// @match        *talibri.com/crafting/2?city_id=1
// @grant        GM_Style
// ==/UserScript==

//Need to adjust match function appropriately
var recipebase1  = 'Salmon';
var minresource1 = 1;

var recipebase2  = 'Spruce Logs';
var minresource2 = 2;

//Key elements - have to pull these with inspect
var targetrecipe = '.recipe-77';


var dropdownOne    = 'body > div.container-fluid > div > div.col-md-9.main-page > div.panel.panel-success > div.panel-body > div > div.col-md-6.recipe-requirements > div.ingredients.ingredients-77 > div:nth-child(2) > div > button';
var dropdownTwo    = 'body > div.container-fluid > div > div.col-md-9.main-page > div.panel.panel-success > div.panel-body > div > div.col-md-6.recipe-requirements > div.ingredients.ingredients-77 > div:nth-child(3) > div > button';
var startbutton  = 'body > div.container-fluid > div > div.col-md-9.main-page > div.panel.panel-success > div.panel-body > div > div.col-md-3.recipe-yields > div.produces.produces-77 > div:nth-child(6) > button';

//Establish Rarity Usage Order
var P1 = "Ascendant";
var P2 = "Infernal";
var P3 = "Imbued";
var P4 = "Ancient";
var P5 = "Rare";
var P6 = "Elder";
//don't include normal here

//Build Ingredient Names
var base = "Use ";
var S1 = base.concat(P1," ",recipebase1);
var S2 = base.concat(P2," ",recipebase1);
var S3 = base.concat(P3," ",recipebase1);
var S4 = base.concat(P4," ",recipebase1);
var S5 = base.concat(P5," ",recipebase1);
var S6 = base.concat(P6," ",recipebase1);
var S7 = base.concat(recipebase1); //exception for normal

var T1 = base.concat(P1," ",recipebase2);
var T2 = base.concat(P2," ",recipebase2);
var T3 = base.concat(P3," ",recipebase2);
var T4 = base.concat(P4," ",recipebase2);
var T5 = base.concat(P5," ",recipebase2);
var T6 = base.concat(P6," ",recipebase2);
var T7 = base.concat(recipebase1); //exception for normal

// Function Part 1 - Autostart: This goes from page load through starting craft execution
// Step 1: Click the target recipe

waitForKeyElements (
    targetrecipe,
    activateRecipeSelection
);

function activateRecipeSelection (jNode) {
   $(targetrecipe).trigger("click");
    //Setup for step 2
    waitForKeyElements(
        dropdownOne,
        openDropdownOne());
}

// Step 2: Open dropdown 1 & Evaluate Resources on Hand
// Also evaluate the different resources on hand and prioritize highest value one
function openDropdownOne (jNode) {
    $(dropdownOne).trigger("click");
    if (parseInt($("ul.dropdown-menu li a:contains('"+S1+"')").text().replace(/(^.+)(\w\d+\w)(.+$)/i,'$2'))>minresource1) {
        PrimaryResource = S1;
    } else if (parseInt($("ul.dropdown-menu li a:contains('"+S2+"')").text().replace(/(^.+)(\w\d+\w)(.+$)/i,'$2'))>minresource1) {
        PrimaryResource = S2;
    } else if (parseInt($("ul.dropdown-menu li a:contains('"+S3+"')").text().replace(/(^.+)(\w\d+\w)(.+$)/i,'$2'))>minresource1) {
        PrimaryResource = S3;
    } else if (parseInt($("ul.dropdown-menu li a:contains('"+S4+"')").text().replace(/(^.+)(\w\d+\w)(.+$)/i,'$2'))>minresource1) {
        PrimaryResource = S4;
    } else if (parseInt($("ul.dropdown-menu li a:contains('"+S5+"')").text().replace(/(^.+)(\w\d+\w)(.+$)/i,'$2'))>minresource1) {
        PrimaryResource = S5;
    } else if (parseInt($("ul.dropdown-menu li a:contains('"+S6+"')").text().replace(/(^.+)(\w\d+\w)(.+$)/i,'$2'))>minresource1) {
        PrimaryResource = S6;
    } else if (parseInt($("ul.dropdown-menu li a:contains('"+S7+"')").text().replace( /(^.+)(\w\d+\w)(.+$)/i,'$2'))>minresource1) {
        PrimaryResource = S7;
    }
    //Setup for step 3
    waitForKeyElements(
        "ul.dropdown-menu li a:contains('" + recipebase1 + "'):visible",
        selectTargetIngredientOne());
}
//Step 3: Select target ingredient
function selectTargetIngredientOne (jNode) {
    $("ul.dropdown-menu li a:contains('" + PrimaryResource + "'):visible").trigger("click");
    //Setup for Step 4
    waitForKeyElements(
        dropdownTwo,
        openDropdownTwo());
}

// Step 4: Open dropdown 2 & Evaluate Resources on Hand
// Also evaluate the different resources on hand and prioritize highest value one
function openDropdownTwo (jNode) {
    $(dropdownTwo).trigger("click");
    if (parseInt($("ul.dropdown-menu li a:contains('"+T1+"')").text().replace( /(^.+)(\w\d+\w)(.+$)/i,'$2'))>minresource2) {
        PrimaryResource = T1;
    } else if (parseInt($("ul.dropdown-menu li a:contains('"+T2+"')").text().replace( /(^.+)(\w\d+\w)(.+$)/i,'$2'))>minresource2) {
        PrimaryResource = T2;
    } else if (parseInt($("ul.dropdown-menu li a:contains('"+T3+"')").text().replace( /(^.+)(\w\d+\w)(.+$)/i,'$2'))>minresource2) {
        PrimaryResource = T3;
    } else if (parseInt($("ul.dropdown-menu li a:contains('"+T4+"')").text().replace( /(^.+)(\w\d+\w)(.+$)/i,'$2'))>minresource2) {
        PrimaryResource = T4;
    } else if (parseInt($("ul.dropdown-menu li a:contains('"+T5+"')").text().replace( /(^.+)(\w\d+\w)(.+$)/i,'$2'))>minresource2) {
        PrimaryResource = T5;
    } else if (parseInt($("ul.dropdown-menu li a:contains('"+T6+"')").text().replace( /(^.+)(\w\d+\w)(.+$)/i,'$2'))>minresource2) {
        PrimaryResource = T6;
    } else if (parseInt($("ul.dropdown-menu li a:contains('"+T7+"')").text().replace( /(^.+)(\w\d+\w)(.+$)/i,'$2'))>minresource2) {
        PrimaryResource = T7;
    }
    //Setup for step 5
    waitForKeyElements(
        "ul.dropdown-menu li a:contains('" + recipebase2 + "'):visible",
        selectTargetIngredientTwo());
}
//Step 5: Select target ingredient
function selectTargetIngredientTwo (jNode) {
    $("ul.dropdown-menu li a:contains('" + PrimaryResource + "'):visible").trigger("click");
    //Setup for Step 4
    waitForKeyElements(
        startbutton,
        startfunction);
}

//Step 6: Start the function
function startfunction(jNode){
    $(startbutton).trigger("click");
}