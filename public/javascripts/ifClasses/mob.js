function Mob(type, id, image, position, stance){
  Unit.call(this, type, id, image, position, stance);
  
  
  this.shadowImages = [imgflightShadow0, imgflightShadow1, imgflightShadow2, imgflightShadow3];
  
}


Mob.prototype = new Unit();


BattlePositions = {
  position1: [368, 296],         
  position2: [255, 199],      
  position3: [111, 253]
}


Mob.prototype.drawUnit = function(offsetForSlideIn){
  switch(this.stance){
    case "ground":
    case undefined:
      this.drawSimpleGroundUnit(offsetForSlideIn);
      break;
    case "flying":
      this.drawFlyingUnit(offsetForSlideIn);
      break;
  }
  
}


// TODO:  add acceleration and add a delay between each mob so they come one at a time almost.  
Mob.prototype.drawSimpleGroundUnit = function(offsetForSlideIn){
  var calculatedX = this.position[0] + offsetForSlideIn;
    // Draw the mobs up...
    battleScreen.context.drawImage(this.image,
      calculatedX, this.position[1] - this.image.height,
      this.image.width, this.image.height);
}

Mob.prototype.drawFlyingUnit = function(offsetForSlideIn){
  var calculatedX = this.position[0] + offsetForSlideIn;
  
  battleScreen.context.drawImage(this.image,
      calculatedX, this.position[1] - this.image.height-50,
      this.image.width, this.image.height);
      
  // draw shadow now too...
  battleScreen.context.drawImage(this.shadowImages[0],
    calculatedX-12, this.position[1] + 20,
    this.shadowImages[0].width, this.shadowImages[0].height);
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



