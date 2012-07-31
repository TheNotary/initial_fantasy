function Unit(type, id, image, position, stance){
  this.id = 1;
  this.type = type;  // mob, hero, critter
  this.image = image;
  //this.shadowImages;
  this.position = position; // position on the battle screen...
  this.x = 0;  // these variables are for hovering/ flying effects and misc. toneberry shananagins
  this.y = 0; 
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

partyPositions = {
  row1Front: [500, 199],
  row1Back: [550, 199]
}


Unit.getBaseStats = function(type, id){
  // pull down base stats from a save file or something like that... I guess the database for this user... very complicated down the road
  
  var combatStats = new CombatStats(0, 0, 10, 0, 1, 1);
  
  return combatStats;
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



