function ActionMenu(){
  this.pickingTarget = false;
  this.actionSelected = "";  // "fight", "magic"
}


battleAction = {
  fight: 1,
  magic: 2,
  defend: 3,
  row: 4
}


ActionMenu.prototype.fight = function(ele){
  audioContext.playSound(audMenuMove);
  
  // let other methods know that the next click on a mob is FOR REALZORZ!
  this.pickingTarget = true;
  this.actionSelected = battleAction.fight;
  
  // initiate CSS animation
  element = document.getElementsByClassName(ele)[0];
  element.className += " activated_picking";
}

ActionMenu.prototype.targetSelected = function(target){
  //console.debug("PEWPEWPEW");
  
  // begin cast time on "fight" Command...
  switch(this.actionSelected){
    case battleAction.fight:
      ActionMenu.performFight(target);
      this.finishedSelecting(target);
      break;
  }
  
}

ActionMenu.performFight = function(unit){
  audioContext.playSound(audMenuMove);
  
  // Initiate the fight delay timer???
  
  // Kill the mob / combat calculations
  unit.stats.hp -= 10;
  if (unit.stats.hp < 1){
    unit.dead = true;
  }
  
  
  
  // Initiate the attack animation
  battleScreen.heroes[0].currentAnimation = new ActionAnimation("fight");
  battleScreen.heroes[0].unitMoved = true;
  battleScreen.aHeroHasMoved = true;
  
  // Initiate the mob's defend animation
  //battleScreen.mobs[0].currentAnimation = new ActionAnimation("recieveFight");
  
  
  
  // Initiate mob death animation
  unit.unitMoved = true;
  
}


var glob;
ActionMenu.prototype.finishedSelecting = function(target) {
  var heroActor = battleScreen.heroes[battleScreen.heroSelected];
  
  this.pickingTarget = false;
  heroActor.isSelected = false;
  heroActor.heroIsReady = false;
  heroActor.stats.waitBar = 0;
  heroActor.htmlElements.readyBarHasBeenDrawn = false;
  
  battleScreen.heroQueue.splice(0,1);
  battleScreen.aHeroIsReady = false;
  battleScreen.heroSelected = null;
  // manually clear the yellow progress bar
  heroActor.htmlElements.waitBar.clearRect(0,0,100,100);
  
  BattleScreen.selectNextHero();
  
  glob = heroActor.htmlElements.waitBar;
  //alert('come back here... you need to refactor this so it works for all units...');
  //alert(heroActor.name);
  
  // dissable CSS animation
  element = document.getElementsByClassName('activated_picking')[0];
  element.className = element.className.replace(/activated_picking/g, '');
  
  // hide the fight button...
  $('div#fight_button').slideUp();
  battleScreen.commandListShowing = false;
  
  
}


BattleScreen.selectNextHero = function() {
  
  
  if (battleScreen.heroQueue.length !=0) {
    var hero = battleScreen.heroes[battleScreen.heroQueue[0]];
    hero.isSelected = true;
    hero.heroIsReady = true;
    //console.debug('next hero up: ' + hero.name);
    battleScreen.heroSelected = battleScreen.heroQueue[0];
    battleScreen.aHeroIsReady = true;
  }
  
  
}
