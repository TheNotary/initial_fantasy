var currentScreen = "title_screen";


//Events when keyboard keys are pressed
document.onkeydown = function(evt) {
  evt = evt || window.event;

  switch(currentScreen){
    case "title_screen":
      titleScreen.handleKeys(evt);
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



