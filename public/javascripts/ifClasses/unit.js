function Unit(type, id, image, position, stance){
  if(arguments.length == 0) return;
  this.id = 1;
  this.type = type;  // mob, hero, critter
  this.image = image;
  //this.shadowImages;
  this.position = position; // position on the battle screen...
  this.x = position[0];  // these variables are for hovering/ flying effects and misc. toneberry shananagins
  this.y = position[1]; 
  this.mirrorY = false;  // set this to true to turn an enemy facing the other way...
  
  // this.stance is almost like "effect"...  I can have a flying effect, then a ghost effect, then a burning effect, etc...
  this.stance = stance;      // "ground", "flying", "burning", "ghost/ Transparent", ...
  
  this.stats = Unit.getBaseStats(type, id);
}


unitType = {
  mob: 0,
  hero: 1,
  critter: 2
}

enemyPositions = {
  position1: [368, 296],         
  position2: [255, 199],      
  position3: [111, 253]
}

var initialHeroYValue = 170;
var paddingPerHero = 84;
var frontRowXValue = 890;
var backRowXValue = 910;
partyPositions = {
  row1Front: [frontRowXValue, initialHeroYValue],
  row1Back: [backRowXValue, initialHeroYValue],
  row2Front: [frontRowXValue, initialHeroYValue + paddingPerHero*1],   
  row2Back: [backRowXValue, initialHeroYValue + paddingPerHero*1],
  row3Front: [frontRowXValue, initialHeroYValue + paddingPerHero*2],
  row3Back: [backRowXValue, initialHeroYValue + paddingPerHero*2],
  row4Front: [frontRowXValue, initialHeroYValue + paddingPerHero*3],
  row4Back: [backRowXValue, initialHeroYValue + paddingPerHero*3]
}

// I want to make it so another person's full party can be on screen for a fight.
// var initialHeroYValue = 170;
// var paddingPerHero = 70;
// var frontRowXValue = 840;
// var backRowXValue = 910;
partyPositionsOther = {
  row1Front: [frontRowXValue, initialHeroYValue],
  row1Back: [backRowXValue, initialHeroYValue],
  row2Front: [frontRowXValue, initialHeroYValue + paddingPerHero*1],   
  row2Back: [backRowXValue, initialHeroYValue + paddingPerHero*1],
  row3Front: [frontRowXValue, initialHeroYValue + paddingPerHero*2],
  row3Back: [backRowXValue, initialHeroYValue + paddingPerHero*2],
  row4Front: [frontRowXValue, initialHeroYValue + paddingPerHero*3],
  row4Back: [backRowXValue, initialHeroYValue + paddingPerHero*3]
}


Unit.getBaseStats = function(type, id){
  // pull down base stats from a save file or something like that... I guess the database for this user... very complicated down the road
  
  var combatStats = new CombatStats(0, 0, 10, 0, 1, 1);
  
  return combatStats;
}


Unit.prototype.drawUnit = function(offsetForSlideIn){
  switch(this.stance){
    case "ground":
    case undefined:
      this.drawGroundUnit(offsetForSlideIn);
      break;
    case "flying":
      this.drawFlyingUnit(offsetForSlideIn);
      break;
    case "burning":
      this.drawBurningUnit(offsetForSlideIn);
      break;
    case "ghost":
      this.drawGhostUnit(offsetForSlideIn);
      break;
  }
}


// TODO:  add acceleration and add a delay between each mob so they come one at a time almost.  
Unit.prototype.drawGroundUnit = function(offsetForSlideIn){
  //var calculatedX = this.calculateX(offsetForSlideIn);//this.position[0] + offsetForSlideIn;
  calculatedX = this.x;
    // Draw the mobs up...
    battleScreen.context.drawImage(this.image,
      calculatedX, this.y - this.image.height,
      this.image.width, this.image.height);
}

Unit.prototype.calculateX = function(offsetForSlideIn){
  throw "Method not defined.  This is an abstract class, your mob and hero classes must inherit from it and define their own method.";
}



function CombatStats(str, stam, speed, attack, hp, mp){
  this.str = str;
  this.stam = stam;
  this.speed = speed;
  this.attack = attack;
  this.hp = hp;
  this.mp = mp;
  
  this.immunities = new Immunities(["fire", "ice"]);
  this.absorbtions = "";
  this.weaknesses = "";
  this.combatActions = "";
}


function Immunities(list){
  this.fire = (jQuery.inArray("fire", list) != -1) ? false: true;  // oh man this is ugly, but atleast on one line...
  this.ice = (jQuery.inArray("ice", list) != -1) ? false: true;  
}

function Absorbtions(){
  this.fire = false;
  this.ice = false;
  this.thunder = true;
}


function CombatActions(){
  this.attack = true;
  this.spells = "";
  this.mobAttacks = new MobAttacks();
}

function MobAttacks(){
  this.fight = true;
  this.magic = ["fire", "ice", "lightning"];
  this.mobAttacks = ["Goblin Kick"];
}



