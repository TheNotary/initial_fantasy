function ActionMenu(){
  this.pickingTarget = false;
}


ActionMenu.prototype.fight = function(ele){
  //alert('going to fight who?');
  // let other methods know that the next click on a mob is FOR REALZORZ!
  this.pickingTarget = true;
  // initiate CSS animation
  element = document.getElementsByClassName(ele)[0];
  element.className += " activated_picking";
}

ActionMenu.prototype.finishedSelecting = function(){
  
  this.pickingTarget = false;
  // dissable CSS animation
  element = document.getElementsByClassName('activated_picking')[0];
  element.className = element.className.replace(/activated_picking/g, '');
  
  alert('pewpew');
  
}
