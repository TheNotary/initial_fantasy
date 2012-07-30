function BattleScreen(canvasId, audioId, menuId){  Screen.call(this, canvasId, audioId, menuId);  this.background;  this.mobs = [];  this.timeElapsed = 0.0;}BattleScreen.prototype = new Screen();BattleScreen.prototype.handleKeys = function(evt){  var key = evt.keyCode;  if (key == 13){    alert('hey, you did something on the battle screen.');  }}// This function handles hiding the UI for battle screen, // and contains a callback for loading what ever is loaded nextBattleScreen.prototype.Hide = function(callbackFunc){  $('div#battle_menu').fadeOut();  $('#battle_screen').fadeOut(function(){    callbackFunc.call();  });}BattleScreen.prototype.EnterBattle = function(background, theseMobs, music){  battleScreen.playBattleTransitionSound();  battleScreen.doBattleTransitionEffect();  //wait for transition to complete...  battleScreen.startBattleMusic(music);    this.mobs = theseMobs;  this.background = background;    battleScreen.paintBackground(background);      // display the UI for the battle  battleScreen.DisplayUI();    window.setTimeout(main, 200);  // initiates the main loop which will call this.renderBattleScene() frequently}BattleScreen.prototype.DisplayUI = function(){  $('#battle_screen').show();  $('div#battle_menu').show();  currentScreen = "battle_screen";}//BattleScreen.mobs = function(){}// 1)  Image data// 2)  ID// 3)  Name// 4)  Combat statsvar offsetForSlideIn;BattleScreen.prototype.renderBattleScene = function(){  var timeElapsed = this.timeElapsed;  var offsetForSlideIn;    if (timeElapsed < 5){    offsetForSlideIn = -400 + timeElapsed * 100 * 30;    offsetForSlideIn = offsetForSlideIn | offsetForSlideIn;    if (offsetForSlideIn > 0) offsetForSlideIn=0;  }  else{    offsetForSlideIn = 0;  }          // for each mob in mobs...  $.each(this.mobs, function(i, mob) {     // battleScreen.context.drawImage(img, x, y, width, height);         // var calculatedX = mob.position[0] + offsetForSlideIn;
    // // Draw the mobs up...
    // battleScreen.context.drawImage(mob.image,
      // calculatedX, mob.position[1],
      // mob.image.width, mob.image.height);            mob.drawUnit(offsetForSlideIn);  });    this.timeElapsed = this.timeElapsed + .01;}BattleScreen.prototype.playBattleTransitionSound = function(){}BattleScreen.prototype.doBattleTransitionEffect = function(){}BattleScreen.prototype.startBattleMusic = function (){}BattleScreen.prototype.paintBackground = function(background){  if (background == undefined){    background = this.background;  }    var width = this.context.canvas.width;  var height = this.context.canvas.height;  // paint the proper background...  this.context.drawImage(background,     0, 0,     width,    height); }