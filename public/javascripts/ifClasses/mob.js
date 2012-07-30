function Mob(id, image){
  this.id = 1;
  this.image = image;
  this.position = BattlePositions.position1; // position on the battle screen...
  this.actualX = BattlePositions.position1[0];  // for debugging...
  
  this.stats = getStats(id);
  
  
}

function getStats(id){
  // ajax querie to pull down stats from database...
  var combatStats = new CombatStats(0, 0, 10, 0, 1, 1);
  
  return combatStats;
}

BattlePositions = {
  position1: [279/3, 231/3],         // 10c, 10c ->  30px, 30px
  position2: [1, 10]
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
  
}



