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

///Define Min HP Points and Percent - basically when you hit this break point versus anything but a "weak enemy" you heal
var HealHPNormal         = 80;
var HealMPNormal         = 1;
///Define Weak HP Points and Percent - it's more efficient to heal to max health versus the weakest mob in each zone than wait for the hard one
var HealHPvsWeak = 116;
var HealMPvsWeak = 10;

//if you have a 1 shot kill you can slot the breakpoint in here - so if you can do 100 damage and enemy drops to/below that you'll auto-use that skill combo (your Burst skill)
var damagebreak = 1;

///Define Enemy Classes
//Weak enemies you can take extra time to heal on
WeakEnemy   =  ["Imp","Gecko","Bat"];
//Strong enemies you want to avoid
RefreshList =  ["Lightning Elemental"];


//For these skills edit the children()[0] part - [0] is skill 1, [1] is skill 2, etc.


//Burst - your strongest attack
function Burst() {
  $("div.user-skill-bar").children()[0].click();
}

///What to do when you have no mana or mana potions
function NoMana() {
  $("div.user-skill-bar").children()[2].click();
}

///What to do against certain enemy groups - these can all be the same or different

//This is your default combo - if you don't identify any enemies for the other combos you'll use this one all the time
EnemyGroup1 = ["Gecko","Imp","Wolf"];
function Combo1() {
  $("div.user-skill-bar").children()[0].click();
  $("div.user-skill-bar").children()[1].click();
  $("div.user-skill-bar").children()[2].click();
}

EnemyGroup2 = ["FakeEnemy"];
function Combo2() {
  $("div.user-skill-bar").children()[0].click();
  $("div.user-skill-bar").children()[1].click();
  $("div.user-skill-bar").children()[2].click();
}

EnemyGroup3 = ["FakeEnemy"];
function Combo3() {
  $("div.user-skill-bar").children()[0].click();
  $("div.user-skill-bar").children()[2].click();
  $("div.user-skill-bar").children()[1].click();
}

//Used to avoid the bad enemies
function Refresh( ) {
    ///Refreshes the page
    location.reload();
}
//Starts combat on entry to page
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

//IDs when combat not started and starts it
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

    //Run some tests - mostly for troubleshooting when i break it
    console.log("Enemy Name: "+enemyname);
    console.log("Enemy name Weak: "+(RefreshList.includes(enemyname)>=0));
    console.log("HPvsWeak: "+(hval<HealHPvsWeak));
    console.log("Item1Ct: " +(Item1Count>0));
    console.log("Item1Qt: " + Item1Count);
    console.log("Item2Qt: " + Item2Count);
    console.log("ManaCtWk: "+(mval<HealMPvsWeak));
    console.log("Enemy Group 2:" + (EnemyGroup2.includes(enemyname)>=0));

    //Start to Evaluate Combat Actions
    if (RefreshList.includes(enemyname)) {
      Refresh();
    //Step 1 ID if a weak enemy - if so check for weak enemy heal/recover breakpoints
    } else if (WeakEnemy.includes(enemyname)) {
      if (hval<HealHPvsWeak && Item1Count>0) {
        $("div.user-item-bar").children()[0].click();
      } else if (mval<HealMPvsWeak) {
        ManaIngest();
      }
//Step 2 check for normal breakpoints for heal/recover
    } else if ((hval < HealHPNormal) && Item1Count>0) {
        console.log("Heal");
        $("div.user-item-bar").children()[0].click();
    } else if (mval < HealMPNormal) {
        console.log("Mana Ingest");
        ManaIngest();
//Step 3 check for burst breakpoint - if below use your burst attack (assuming you have enough mana)
    } else if (enemyhp < damagebreak && mval>HealMPNormal) {
        console.log("Burst");
        Burst();
//Step 4 check for enemy groups - if defined within group use that combo
    } else if (EnemyGroup1.includes(enemyname)) {
        console.log("Combo 1");
        Combo1();
    } else if (EnemyGroup2.includes(enemyname)) {
        console.log("Combo 2");
        Combo2();
    } else if (EnemyGroup3.includes(enemyname)) {
        console.log("Combo 3");
        Combo3();
//Step 5 if not in enemy groups run Combo 1 assuming you have mana for it
    } else if (mval>=HealMPNormal) {
        console.log("Combo 1");
        Combo1();
    } else {
//Step 6 if you run out of mana use your NoMana combo
        console.log("No Mana");
        NoMana();
    }
//Step 7 if something else broke and you got to here you'll use default combo 1
    console.log("Got to end");
    Combo1();
}

///Starts function and then restarts every 5-6 seconds - based on observed actions per minute with client-server latency
CombatManager();
setInterval(CombatManager,60/10*1000);
