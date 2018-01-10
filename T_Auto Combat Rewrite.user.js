// ==UserScript==
// @name         T - Auto Combat Rewrite
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Dragon
// @match        *talibri.com/combat_zones/*/adventure
// @match        *talibri.com/combat_zones/*/adventure
// @grant        none
// ==/UserScript==

///Define Min HP Points and Percent
var HealHPNormal         = 0.1;
var HealMPNormal         = 1;

var HealHPvsWeak = 0.1;
var HealMPvsWeak = 1;

var damagebreak = 1;

///Define Enemy Classes
//Weak enemies you can take extra time to heal on
WeakEnemy   =  ["Imp","Gecko"];
//Strong enemies you want to avoid
RefreshList =  ["Lesser Demon","Lightning Elemental"];

//Burst - your strongest attack
function Burst() {
  $("div.user-skill-bar").children()[0].click();
}

///What to do when you have no mana or mana potions
function NoMana() {
  $("div.user-skill-bar").children()[2].click();
}

///What to do against certain enemy gorups
EnemyGroup1 = ["Gecko","Imp"];
function Combo1() {
  $("div.user-skill-bar").children()[0].click();
  $("div.user-skill-bar").children()[1].click();
  $("div.user-skill-bar").children()[2].click();
}

EnemyGroup2 = ["Crab","Griffin","Cow"];
function Combo2() {
  $("div.user-skill-bar").children()[0].click();
  $("div.user-skill-bar").children()[1].click();
  $("div.user-skill-bar").children()[2].click();
}

EnemyGroup3 = ["Bee","Wyvern"];
function Combo3() {
  $("div.user-skill-bar").children()[0].click();
  $("div.user-skill-bar").children()[1].click();
  $("div.user-skill-bar").children()[2].click();
}

function Refresh( ) {
    ///Refreshes the page
    location.reload();
}
function StartCombat( ) {
    ///Starts Combat When Screen is in pre-attack
    $('#combat_details > div > div.panel-footer > div > div.col-md-12 > button').click();
}

function ManaIngest() {
  //Grab Potion Counts - sets value of 2->1 if empty, 3/4/5 to 2 if empty
  var Item2Count = $('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(2)').text().replace(/\D/g,'');
  var Item3Count = $('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(3)').text().replace(/\D/g,'');
  var Item4Count = $('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(4)').text().replace(/\D/g,'');
  console.log('slot 1: '+$('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(1)').text());
  console.log('slot 2: '+$('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(2)').text());
  console.log('slot 3: '+$('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(3)').text());
  if (Item2Count > 0 ){
    $("div.user-item-bar").children()[1].click();
    console.log("Clicking item 2");
    console.log(Item2Count);
  } else if (Item3Count>0){
    $("div.user-item-bar").children()[2].click();
    console.log("Clicking item 3");
    console.log(Item3Count);
  } else if (Item4Count>0){
    $("div.user-item-bar").children()[3].click();
  } else {
    //executes a non-mana attack (Skill 3)
    $("div.user-skill-bar").children()[2].click();
  }
}

function CombatManager() {
    var combattext = $('#combat_details > div > div.panel-heading.text-center > h3');
    if (combattext.text()==="Prepare for combat!") {
        console.log("Starting combat");
        StartCombat();
    } else {
        console.log("Executing combat script");
        Combat();
    }
}


//This is the actual combat function
function Combat( ) {
    //Collect the current information
    //Grab and Break out Health DataFrame - no change required
    var hdata = $('#user-stat-health span').text();
    var hsplit = hdata.split('/');
    var hpercent = Math.floor((hsplit[0] / hsplit[2]) * 100);
    var hval   = hsplit[0];
    //Grab and Break out Mana - no change required
    var mdata   = $('#user-stat-mana span').text();
    var msplit = mdata.split('/');
    var mval   = msplit[0];
    var mpercent = Math.floor((msplit[0] / msplit[2]) * 100);
    //Grab Enemy Data - no change required
    var enemydata  = $('span.in-combat-enemy-name').text();
    var enemyname  = $('span.in-combat-enemy-name').text();
    var enemyhp    = $('div.col-md-4.stat-health > span').text();

    //Grab Potion Counts - sets value of 2->1 if empty, 3/4/5 to 2 if empty
    var Item1Count = $('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(1)').text().replace(/\D/g,'');
    var Item2Count = $('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(2)').text().replace(/\D/g,'');
    var Item3Count = $('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(3)').text().replace(/\D/g,'');
    var Item4Count = $('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(4)').text().replace(/\D/g,'');
    console.log("Got to here");
    console.log("Test for mana val: " + (mval>=HealMPNormal));

    //Run some tests
    console.log("Enemy Name: "+enemyname);
    console.log("Enemy name Weak: "+(RefreshList.includes(enemyname)>=0));
    console.log("HPvsWeak: "+(hval<HealHPvsWeak));
    console.log("Item1Ct: " +(Item1Count>0));
    console.log("Item1Qt: " + Item1Count);
    console.log("Item2Qt: " + Item2Count);
    console.log("ManaCtWk: "+(mval<HealMPvsWeak));
    console.log("Enemy Group 2:" + (EnemyGroup1.includes(enemyname)>=0));

    //Start to Evaluate Combat Actions
    //if (RefreshList.includes(enemyname)>=0) { Refresh();} else
    if (WeakEnemy.includes(enemyname)) {
      if (hval<HealHPvsWeak && Item1Count>0) {
        $("div.user-item-bar").children()[0].click();
      } else if (mval<HealMPvsWeak) {
        ManaIngest();
      }
    } else if ((hval < HealHPNormal) && Item1Count>0) {
        console.log("Heal");
        $("div.user-item-bar").children()[0].click();
    } else if (mval < HealMPNormal) {
        console.log("Mana Ingest");
        ManaIngest();
    } else if (enemyhp < damagebreak && mval>HealMPNormal) {
        console.log("Burst");
        Burst();
    } else if (EnemyGroup1.includes(enemyname)) {
        console.log("Combo 1");
        Combo1();
    } else if (EnemyGroup2.includes(enemyname)) {
        console.log("Combo 2");
        Combo2();
    } else if (EnemyGroup3.includes(enemyname)) {
        console.log("Combo 3");
        Combo3();
    } else if (mval>=HealMPNormal) {
        console.log("Combo 1");
        Combo1();
    } else {
        console.log("No Mana");
        NoMana();
    }
    console.log("Got to end");
}

///Starts function and then restarts every 5-6 seconds - based on observed actions per minute with client-server latency
CombatManager();
setInterval(CombatManager,60/10*1000);
