function Screen(canvasContext, audioElement){
  this.canvasId = "";
  this.divId = "";
  this.context = canvasContext;
  this.audio = audioElement;
  
}


Screen.HandleKeys = function(evt){}



Screen.prototype.ExitScreen = function(scene){
  this.audio.pause();
  if (scene != undefined){
    sceneDirector.switchToScene(scene);
  }
}


Screen.Hide = function(callbackFunc){
  $('#title_screen').fadeOut(function(){
    callbackFunc.call();
  });
}


