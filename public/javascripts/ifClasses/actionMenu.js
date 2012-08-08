function ActionMenu(){
  this.pickingTarget = false;
  this.actionSelected = "";  // "fight", "magic"
}


enum battleAction = {
  fight: 1,
  magic: 2,
  defend: 3,
  row: 4
}

ActionMenu.prototype.fight = function(ele){
  //alert('going to fight who?');
  // let other methods know that the next click on a mob is FOR REALZORZ!
  this.pickingTarget = true;
  this.actionSelected = battleAction.fight;
  
  // initiate CSS animation
  element = document.getElementsByClassName(ele)[0];
  element.className += " activated_picking";
}

ActionMenu.prototype.targetSelected = function(unit){
  //alert('pewpew: ' + unit.name);
  console.debug("PEWPEWPEW");
  
  // begin cast time on "fight" Command...
  switch(this.actionSelected){
    case battleAction.fight:
      ActionMenu.performFight(unit);
      this.finishedSelecting();
      break;
  }
  
  actionMenu.finishedSelecting();
}

ActionMenu.performFight = function(unit){
  // Initiate the fight delay timer???
  
  // Initiate the attack animation
  
  // Initiate the mob's defend animation
  
  // Kill the mob / combat calculations
  
  // Initiate mob death animation
  
  // 
}



ActionMenu.prototype.finishedSelecting = function(){
  
  this.pickingTarget = false;
  // dissable CSS animation
  element = document.getElementsByClassName('activated_picking')[0];
  element.className = element.className.replace(/activated_picking/g, '');
  
}
