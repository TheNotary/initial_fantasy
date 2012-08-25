currentScreen = "title_screen";


//Events when keyboard keys are pressed
document.onkeydown = function(evt) {
  evt = evt || window.event;

  switch(currentScreen){
    case "title_screen":
      titleScreen.handleKeys(evt);
      break;
    case "battle_screen":
      battleScreen.handleKeys(evt);
      break;
  }

  return;
  
  if (evt.keyCode === 46) {remove_object ();}
    else if (evt.keyCode === 37) {
      var activeObject = canvas.getActiveObject();
      var activeGroup = canvas.getActiveGroup();
      if (activeObject) {
        var new_left = activeObject.get('left') - 1;
        activeObject.set('left', new_left);
        activeObject.setCoords();
        canvas.renderAll();
        updateControls()
      }
    else if (activeGroup) {
      var new_left = activeGroup.get('left') - 1;
      activeGroup.set('left', new_left);
      activeGroup.setCoords();
      canvas.renderAll();
      updateControls()
    };
  }
}



// place within the onclick event of a canvas to see it work
function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;
    
    
    unit = reportWhatUnitWasClicked(canvasX, canvasY);
    
    if (actionMenu.pickingTarget && unit != false){
      actionMenu.targetSelected(unit);
    }
    
    if (debugMode == true) {
      console.debug("x: " + canvasX + "  y: " + canvasY);
      console.debug('Unit Name: ' + unit.name);
    }
    
    return {x:canvasX, y:canvasY}
}



function reportWhatUnitWasClicked(clickX, clickY){
  var unit;
  // check if it was a mob that was clicked
  unit = whatUnitWasClicked(clickX, clickY, battleScreen.mobs);
  if (unit != false){return unit;}
  // check if it was a hero
  unit = whatUnitWasClicked(clickX, clickY, battleScreen.heroes);
  return unit;
}

function whatUnitWasClicked(clickX, clickY, mobs){
  //var mobs = battleScreen.mobs;
  // check if it was a mob
  for (var i = 0; i < mobs.length; i++){
    var mob = mobs[i];
    
    var x1 = mob.x;
    var x2 = mob.x + mob.width;
    var y1 = mob.y - mob.height;
    var y2 = mob.y;
    if(mob.stance == "flying" && mob.type == unitType.mob){
      y1 = mob.y - mob.height-50;
      y2 = mob.y-50;
    }
    
    if (clickX >= x1 && clickX <= x2 &&
        clickY >= y1 && clickY <= y2){
          return mob;
        }
  }
  return false;
}



