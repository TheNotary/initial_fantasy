function TitleScreen(canvasId, audioId, menuId){
  /*  Note:  After a careful refactoring, this code is no longer needed since it's been put into screen.js
  this.context = document.getElementById(canvasId).getContext('2d');
  this.audio = document.getElementById(audioId);
  this.canvasId = canvasId;
  this.menuId = menuId;
  */
  Screen.call(this, canvasId, audioId, menuId);
}

TitleScreen.prototype = new Screen();

TitleScreen.prototype.handleKeys = function(evt){
  this.breakFromScreenOnInput(evt);
}

TitleScreen.prototype.handleMouse = function(evt){
  this.breakFromScreenOnInput(evt);
}

TitleScreen.prototype.ExitScreen = function(scene){
  this.audio.pause();
  clearInterval(timerId);  // clears the fade in timer
  if (scene != undefined){
    sceneDirector.switchToScene(scene);
  }
}

TitleScreen.prototype.breakFromScreenOnInput = function(evt){
  if (readyToPressStart == false){  // wait a few seconds before user bypasses screen
    return;
  }

  if (evt.buttons >= 1){
    this.ExitScreen("intro-on_air_ship");
    return;
  }

  var key = evt.keyCode;

  if (key == 13 || key == 27){
    this.ExitScreen("intro-on_air_ship");
  }
}
