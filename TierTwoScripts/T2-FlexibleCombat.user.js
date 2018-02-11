// ==UserScript==
// @name         T2-AutoCombatFlexible
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       Dragon
// @match        *talibri.com/combat_zones/*/adventure
// @grant        none
// ==/UserScript==


//DefineHealPoints, Base and Exceptions
var HealHP = 55; //Percent
var HealMP = 5;  //Raw value

var HealHPX1 = 55;
var HealMPX1 = 300;

var HealHPX2 = 40;
var HealMPX2 = 100;

var HealHPX3 = 25;
var HealMPX3 = 10;

//Define Item Classes
var HealVal = 40; //percent
var ManaPotionVal = 35; //integer

//Destinations
var ManaLocation     = 'https://talibri.com/combat_zones/3/adventure';
var FightLocation    = 'https://talibri.com/combat_zones/7/adventure';
var SitLocation      = 'https://talibri.com/combat_zones/7/adventure';

//Exception Information
var maxhit  = 1;
var DoTdmg  = 1;

//Define Enemy Classes
RefreshList = []; //Avoid These
WeakEnemy   = []; //HealOnThese

///What to do against certain enemy groups - these can all be the same or different

///What to do when you have no mana or mana potions
function NoMana() {
  $("div.user-skill-bar").children()[2].click();
}

//Attack Sets
//Skill Layout
//Slot 1 - Antipode
//Slot 2 - Freeze
//Slot 3 - Ignite
//Slot 4 - Lightning
//Slot 5 - Earth Eruption (Physical)

//Standard
var StandardEnemy         = ["Gecko","Wolf"];
var TierOneEnemy          = ["Zap Bat"];
var TierTwoEnemy          = ["Shock Scorpion"];
var TierThreeEnemy        = ["Lightning Elemental"];

var EarthResistEnemy      = [];
var LightningResistEnemy  = [];
var FireResistEnemy       = [];
var IceResistEnemy        = [];
var IceHealEnemy          = [];
var FireHealEnemy         = [];

function StandardCombo() {
  $("div.user-skill-bar").children()[0].click(); //Antipode
  $("div.user-skill-bar").children()[1].click(); //Freeze
  $("div.user-skill-bar").children()[2].click(); //Ignite
  $("div.user-skill-bar").children()[3].click(); //Lightning
  $("div.user-skill-bar").children()[4].click(); //Earth
}

//Weak to Electric / Strong to Earth
function EarthResist () {
  $("div.user-skill-bar").children()[3].click(); //Lightning
  $("div.user-skill-bar").children()[0].click(); //Antipode
  $("div.user-skill-bar").children()[1].click(); //Freeze
  $("div.user-skill-bar").children()[2].click(); //Ignite
  $("div.user-skill-bar").children()[4].click(); //Earth
}

//Weak to Earth / Strong to Electric
function ElectricResist() {
  $("div.user-skill-bar").children()[4].click(); //Earth
  $("div.user-skill-bar").children()[0].click(); //Antipode
  $("div.user-skill-bar").children()[1].click(); //Freeze
  $("div.user-skill-bar").children()[2].click(); //Ignite
  $("div.user-skill-bar").children()[3].click(); //Lightning
}

//Weak to Fire / Strong to Ice
function IceResist() {
  $("div.user-skill-bar").children()[0].click(); //Antipode
  $("div.user-skill-bar").children()[3].click(); //Lightning
  $("div.user-skill-bar").children()[4].click(); //Earth
  $("div.user-skill-bar").children()[2].click(); //Ignite
  $("div.user-skill-bar").children()[1].click(); //Freeze
}

//Weak to Ice / Strong to Fire
function FireResist() {
  $("div.user-skill-bar").children()[1].click(); //Freeze
  $("div.user-skill-bar").children()[0].click(); //Antipode
  $("div.user-skill-bar").children()[3].click(); //Lightning
  $("div.user-skill-bar").children()[4].click(); //Earth
  $("div.user-skill-bar").children()[2].click(); //Ignite
}

//Weak to Fire / Strong to Ice
function IceHeal() {
  $("div.user-skill-bar").children()[0].click(); //Antipode
  $("div.user-skill-bar").children()[3].click(); //Lightning
  $("div.user-skill-bar").children()[4].click(); //Earth
  $("div.user-skill-bar").children()[2].click(); //Ignite
  $("div.user-skill-bar").children()[1].click(); //Freeze
}

//Weak to Ice / Strong to Fire
function FireHeal() {
  $("div.user-skill-bar").children()[1].click(); //Freeze
  $("div.user-skill-bar").children()[3].click(); //Lightning
  $("div.user-skill-bar").children()[4].click(); //Earth
  $("div.user-skill-bar").children()[0].click(); //Antipode
  $("div.user-skill-bar").children()[2].click(); //Ignite
}

//Used to avoid the bad enemies
function Refresh( ) {
    ///Refreshes the page
    location.reload();
}

function HealthIngest() {
  $("div.user-item-bar").children()[0].click();
}


function ManaIngest() {
  //Grab Potion Counts - sets value of 2->1 if empty, 3/4/5 to 2 if empty
  var Item2Count = $('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(2)').text().replace(/\D/g,'');
  var Item3Count = $('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(3)').text().replace(/\D/g,'');
  var Item4Count = $('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(4)').text().replace(/\D/g,'');
  //console.log('slot 1: '+$('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(1)').text());
  //console.log('slot 2: '+$('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(2)').text());
  //console.log('slot 3: '+$('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(3)').text());
  if (Item2Count > 0 ){
    $("div.user-item-bar").children()[1].click();
    //console.log("Clicking item 2");
    //console.log(Item2Count);
  } else if (Item3Count>0){
    $("div.user-item-bar").children()[2].click();
    //console.log("Clicking item 3");
    //console.log(Item3Count);
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
        console.log("Starting Combat Needs to Happen");
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
    //Grab Combat Info
    var lastCombatText = $('#combat_details div.combat-panel').children('div').last().text();
    var creistselectric = lastCombatText.includes('Electric');
    var cresistearth    = lastCombatText.includes('Earth');
    var cresistice      = lastCombatText.includes('Ice');
    var cresistfire     = lastCombatText.includes('Fire');
    var chealsfire      = lastCombatText.includes('Fire2');
    var chealsice       = lastCombatText.includes('Ice2');
    var defeated        = lastCombatText.includes('You killed the');

    //Burning
    var Ignited = ($('div.panel-body.user-status-effects.text-center > div > div > img').attr("alt") === "Fire3");

    if ($('div.panel-body.user-status-effects.text-center > div > div > img').attr("alt") === "Fire3") {
        var Burning = 1;
    } else {
        var Burning = 0;
    };

//        (/(You used [^\.!]*\. You have 0 remaining\.|You have 0 [^\.!]* remaining.|You do not have any [^\.!]* remaining!|You don't have enough [^\.!]* to use that ability!|You do not have the [^\.!]* necessary to use that ability!)/.test(lastCombatText)) {
//          setSkillUsability(previousAction.type, previousAction.arg, false);
//        }
    //Grab Potion Counts - sets value of 2->1 if empty, 3/4/5 to 2 if empty
    var Item1Count = $('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(1)').text().replace(/\D/g,'');
    var Item2Count = $('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(2)').text().replace(/\D/g,'');
    var Item3Count = $('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(3)').text().replace(/\D/g,'');
    var Item4Count = $('#combat_details > div > div.panel-footer > div > div:nth-child(1) > div > div > button:nth-child(4)').text().replace(/\D/g,'');

    //Start to Evaluate Combat Actions
    //Current List
    //1. Refresh
    //2. Mana Location Configuration
    //3. One Shot Combo Configuration
    //3. If HP under health benchmark heal
    //4. If enemy heals against Fire dmg
    //   a. Use Fire Heal Kit
    //5. All other cases
    //   a. Use Ignite if Enemy not burning
    //   b.

    console.log("Ignite Check");
    console.log(Ignited);
    console.log(lastCombatText);
    console.log("defeated");
    console.log(defeated);
    console.log(defeated===true);
    console.log(defeated===false);

    if (RefreshList.includes(enemyname)) {
        Refresh();
    //Mana Refresh
    } else if (window.location.href === ManaLocation) {
      if (mval<(msplit[1]-ManaPotionVal)) {
            ManaIngest();
        } else {
        this.document.location = FightLocation;
        }
    //One Shot Combo
    } else if (window.location.href === SitLocation) {
      if (TierOneEnemy.includes(enemyname)) {
        if (hpercent<=HealHPX1) {
          HealthIngest();
        } else if (mval<=HealMPX1) {
          ManaIngest();
        } else {
          StandardCombo();
        }
    } else if (TierTwoEnemy.includes(enemyname)) {
        if (hpercent<=HealHPX2) {
          HealthIngest();
        } else if (mval<=HealMPX2) {
          ManaIngest();
        } else {
          StandardCombo();
        }
    } else if (TierThreeEnemy.includes(enemyname)) {
        if (hpercent<=HealHPX3) {
          HealthIngest();
        } else if (mval<=HealMPX3) {
          ManaIngest();
        } else {
          StandardCombo();
        }
    } else if (defeated === true && mpercent<60) {
      this.document.location = ManaLocation;
    } else if (hpercent<HealHP) {
      HealthIngest();
    } else if (chealsfire===true) {
      FireHeal();
    } else {
      if (Ignited === false) {
        $("div.user-skill-bar").children()[2].click(); //Ignite
      } else if (creistselectric===true) {
        ElectricResist();
      } else if (cresistearth===true) {
        EarthResist();
      } else if (cresistfire===true) {
        FireResist();
      } else if (cresistice===true) {
        IceResist();
      } else if (chealsice===true) {
        IceHeal();
      } else {
        StandardCombo();
      }
    }
  }
}

///Starts function and then restarts every 5-6 seconds - based on observed actions per minute with client-server latency
CombatManager();
setInterval(CombatManager,60/10*1000);
