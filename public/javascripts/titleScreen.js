function TitleScreen(canvasContext, audioElement){  this.context = canvasContext;  this.audio = "";}TitleScreen.prototype.handleKeys = function(evt){  if (readyToPressStart == false){  // wait a few seconds before user bypasses screen    return;  }  var key = evt.keyCode;  if (key == 13){    this.ExitScreen();  }}TitleScreen.prototype.ExitScreen = function(){  document.getElementById('audio1').pause();  sceneDirector.switchToScene("intro-on_air_ship");}TitleScreen.prototype.Hide = function(callbackFunc){  $('#title_screen').fadeOut(function(){    callbackFunc.call();  });}