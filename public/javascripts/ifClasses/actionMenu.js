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
  audMenuMove.src = "/audio/misc/menu_move.ogg";
  audMenuMove.play();
  
  
  
  
  //alert('going to fight who?');
  // let other methods know that the next click on a mob is FOR REALZORZ!
  this.pickingTarget = true;
  this.actionSelected = battleAction.fight;
  
  // initiate CSS animation
  element = document.getElementsByClassName(ele)[0];
  element.className += " activated_picking";
}

ActionMenu.prototype.targetSelected = function(unit){
  console.debug("PEWPEWPEW");
  
  // begin cast time on "fight" Command...
  switch(this.actionSelected){
    case battleAction.fight:
      ActionMenu.performFight(unit);
      this.finishedSelecting();
      break;
  }
  
}

ActionMenu.performFight = function(unit){
  //audMenuUnitSelect.pause();
  audMenuUnitSelect.src = "/audio/misc/menu_move.ogg";
  audMenuUnitSelect.play();
  
  // Initiate the fight delay timer???
  
  // Kill the mob / combat calculations
  unit.stats.hp -= 10;
  //alert(unit.stats.hp);
  
  
  
  // Initiate the attack animation
  battleScreen.heroes[0].currentAnimation = new ActionAnimation("fight");
  battleScreen.heroes[0].unitMoved = true;
  battleScreen.aHeroHasMoved = true;
  
  // Initiate the mob's defend animation
  //battleScreen.mobs[0].currentAnimation = new ActionAnimation("recieveFight");
  
  
  
  // Initiate mob death animation
  
  // 
}



ActionMenu.prototype.finishedSelecting = function(){
  
  this.pickingTarget = false;
  // dissable CSS animation
  element = document.getElementsByClassName('activated_picking')[0];
  element.className = element.className.replace(/activated_picking/g, '');
  
}

