currentScreen = "title_screen"; // hmmm... I need a namespace...





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
    if (currentScreen == "title_screen"){
        titleScreen.handleMouse(event);
        return;
    }

    // else handleMouse for battleScreen... TODO: Refactor into battleScreen.handleMouse if possible

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
      //console.debug("x: " + canvasX + "  y: " + canvasY);
      //console.debug('Unit Name: ' + unit.name);
    }
    
    return {x:canvasX, y:canvasY}
}



function reportWhatUnitWasClicked(clickX, clickY){
  var unit;
  // check if it was a mob that was clicked
  unit = whatUnitWasClicked(clickX, clickY, battleScreen.mobs);
  if (unit != false){return unit;}
  // check if it was a hero
  unit = whatUnitWasClicked(clickX, clickY, battleScreen.heros);
  return unit;
}

function whatUnitWasClicked(clickX, clickY, units){
  //var mobs = battleScreen.mobs;
  // check if it was a mob
  for (var i = 0; i < units.length; i++){
    var unit = units[i];
    
    var x1 = unit.x;
    var x2 = unit.x + unit.width;
    var y1 = unit.y - unit.height;
    var y2 = unit.y;
    if(unit.stance == "flying" && unit.type == unitType.unit){
      y1 = unit.y - unit.height-50;
      y2 = unit.y-50;
    }
    
    if (clickX >= x1 && clickX <= x2 &&
        clickY >= y1 && clickY <= y2){
          if (!unit.dead || unit.type == unitType.hero)
            return unit;
        }
  }
  return false;
}
