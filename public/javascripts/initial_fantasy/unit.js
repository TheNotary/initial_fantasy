function Unit(type, id, image, position, stance){
  if(arguments.length == 0) return;
  this.id = id;
  this.name = Unit.getUnitName(type, id);
  this.type = type;  // mob, hero, critter
  this.image = image;
  //this.shadowImages;
  this.position = position; // position on the battle screen...
  this.x = position[0];  // these variables are for hovering/ flying effects and misc. toneberry shananagins
  this.y = position[1];
  this.directionX = 0;
  this.directionY = 0;
  this.lastX;
  this.lastY;
  if(image.width == undefined){throw "Something Is wrong with the image you passed this monster...";}
  this.width = image.width;
  this.height = image.height;
  this.speedY = 0;
  this.speedX = 0;
  
  this.apex = 4;  // highest point in hover animation (from position[1])
  this.nadir = 0; // lowest point in hover animation... For all my hover animations, this MUST BE set to 0.
  
  this.lastWidth;
  this.lastHeight;
  this.mirrorY = false;  // set this to true to turn an enemy facing the other way...
  
  this.unitMoved = true;
  
  // this.stance is almost like "effect"...  I can have a flying effect, then a ghost effect, then a burning effect, etc...
  this.stance = stance;      // "ground", "flying", "burning", "ghost/ Transparent", ...
  
  this.stats = Unit.getBaseStats(type, id);
  
  this.htmlElements = new HtmlElements(this.name);
  
  this.currentAnimation = new ActionAnimation("blank");  // new Animation("Swinging") (for when the player selected fighting)
  this.dead = false;   // mark true to stop drawing the mob
}

Unit.prototype.getX = function(){
  return this.x;
}
Unit.prototype.setX = function(val){
  this.x = val;
  this.unitMoved = true;
  switch(this.type){
    case unitType.mob:
      battleScreen.aMobHasMoved = true;
      break;
    case unitType.flying:
      battleScreen.aHeroHasMoved = true;
      break;
  }
}
Unit.prototype.getY = function(){
  return this.y;
}
Unit.prototype.setY = function(val){
  this.y = val;
  this.unitMoved = true;
  if (this.type == unitType.mob){
    battleScreen.aMobHasMoved = true;
  }
}



unitType = {
  mob: 0,
  hero: 1,
  critter: 2
}

enemyPositions = {
  position1: [398, 296],
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

Unit.getUnitName = function(type, id){
  if (type == unitType.mob){
    // maybe this should get pulled down along with combat stats
    if(id == 2) return "Eagle";
    if(id==1) return "goblin";
    if(id==3) return "Floating Eye";
    if(id==4) return "Sword Rat";
    return "Unknown Monster!";
  }
  else if (type == unitType.hero){
    if(id==0)return "Cecil";
    if(id==1)return "Kain";
    if(id==2)return "Rosa";
    if(id==3)return "Matzu!";
  }
  
}

Unit.getBaseStats = function(type, id){
  // pull down base stats from a save file or something like that... I guess the database for this user... very complicated down the road
  var combatStats = new CombatStats(0, 0, 10, 0, 100, 1);
  
  switch(type){
    case unitType.mob:
      combatStats = new CombatStats(0, 0, 10, 0, 450, 1, 1, 1);
      break;
    case unitType.hero:
      if (id==0) combatStats = new CombatStats(0, 0, 10, 0, 450, 100, 325, 25);
      if (id>0) combatStats = new CombatStats(0, 0, 10, 0, 450, 125, 325, 25);
      break;
  }
  
  return combatStats;
}


// this clears the last thing drawn on the screen
Unit.prototype.clearFromScreen = function(){
  
  switch(this.stance){
    case "ground":
    case undefined:
      battleScreen.context.clearRect(this.lastX, this.lastY-this.height, this.width, this.height);
      break;
    case "flying":
      // clear the mob
      battleScreen.context.clearRect(this.lastX, this.lastY-this.height-50, this.width, this.height);
      // then clear the shadow
      battleScreen.context.clearRect(this.lastX-12, this.position[1]+20, this.shadowImages[0].width, this.shadowImages[0].height);
      break;
  }
  
}

Unit.prototype.drawUnit = function(){
  
  switch(this.stance){
    case "ground":
    case undefined:
      this.drawGroundUnit();
      break;
    case "flying":
      this.drawFlyingUnit();
      break;
    case "burning":
      this.drawBurningUnit();
      break;
    case "ghost":
      this.drawGhostUnit();
      break;
  }
  
}



// TODO:  add acceleration and add a delay between each mob so they come one at a time almost.  
Unit.prototype.drawGroundUnit = function(){
  if (this.unitMoved){
    //var animationCalculatedOffsetX = this.calculateAnimationOffsetX();
    
    //this.clearFromScreen();// clear screen for mobs (prevent them from blurring in...)
    calculatedX = this.x;
    // Draw the mobs up...
    battleScreen.context.drawImage(this.image,
      
      calculatedX, 
      this.y - this.height,
      
      this.width, this.height);
    
    this.lastX = this.x;
    this.lastY = this.y;
    this.lastWidth = this.width;
    this.lastHeight = this.height;
    this.unitMoved = false;
  }
  if (this.currentAnimation.name != "blank"){
    // console.debug(this.currentAnimation.name);
    
  }
}

Unit.prototype.calculateAnimationOffsetX = function(){
  
  if(this.currentAnimation.name == "fight"){
    // console.debug(this.currentAnimation.name);
    this.x = this.x - 50;
    this.currentAnimation = new ActionAnimation("blank");
    return -50;
  }
  return 0;
}



// this is where you link up all the html elements so it's faster to modify the values in the game loop
function HtmlElements(name, row){
  if (arguments.length == 0) return;
  //this.name = $('#charRow_'+row+' .current_hp');
  
  if (arguments.length == 1) return;
  this.name = $('#charRow_'+row+' .name');
  this.hp = $('#charRow_'+row+' .current_hp');
  this.mp = $('#charRow_'+row+' .current_mp');
  this.maxHp = $('#charRow_'+row+' .max_hp');
  this.maxMp = $('#charRow_'+row+' .max_mp');
  this.waitBar = $('#charRow_'+ row +' .time .wait_bar')[0].getContext("2d");
  
  this.readyBarHasBeenDrawn = false;  // so we know if we should make the whole bar yellow or not
}


function CombatStats(str, stam, speed, attack, maxHp, maxMp, hp, mp){
  this.str = str;
  this.stam = stam;
  this.speed = speed;
  this.attack = attack;
  this.hp = hp;
  this.mp = mp;
  this.maxHp = maxHp;
  this.maxMp = maxMp;
  this.waitBar = 20;  // you know, the status bar that indicates when they'll strike next
  
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



var lastRunsTick = 0;
Unit.herosTurnEffect_flashingOutline = function(heroes, context){
  if (tickCount % 3 == 0){
    for (var j = 0; j < heroes.length; j++){
      //if (j > 0) continue;
      if (lastRunsTick == tickCount){break;}// for somereason it can run the loop twice on the same tickCount...
                                            // I think 'tickCount' is incremented on the update loop, but we're calling this in the draw loop... sometimes before update has a chance to incriment again
      hero = heroes[j];
      if (hero.isSelected){
        
        var imgd = context.getImageData(hero.x, hero.y-hero.height, hero.width, hero.height);
        var pix = imgd.data;
        
        var foundABlackPixel = false;
        // Loop over each pixel and replace all black pixels with grey.
        for (var i = 0, n = pix.length; i < n; i += 4) {
          if (pix[i] == 0 && pix[i+1] == 0 && pix[i+2] == 0 && pix[i+3] != 0){   // don't count transparent pixels
            pix[i] = 120;
            pix[i+1] = 120;
            pix[i+2] = 120;
            foundABlackPixel = true;
          }
        }
        
        if (!foundABlackPixel){
          // Loop over each pixel and replace grey pixels with black
          for (var i = 0, n = pix.length; i < n; i += 4) {
            if (pix[i] == 120 && pix[i+1] == 120 && pix[i+2] == 120){
              pix[i] = 0;
              pix[i+1] = 0;
              pix[i+2] = 0;
            }
          }
        }
        
        // Draw the ImageData at the given (x,y) coordinates.
        context.putImageData(imgd, hero.x, hero.y-hero.height);
        lastRunsTick = tickCount;
      }
    }
  }
}

