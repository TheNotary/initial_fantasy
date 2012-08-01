function BattleScreen(canvasId, audioId, menuId){  Screen.call(this, canvasId, audioId, menuId);  this.background;  this.mobs = [];  this.heros = [];  this.timeElapsed = 0.0;  this.battleStartedAt = 0;  this.introFinished = false;}BattleScreen.prototype = new Screen();BattleScreen.prototype.handleKeys = function(evt){  var key = evt.keyCode;  if (key == 13){    alert('hey, you did something on the battle screen.');  }}// This function handles hiding the UI for battle screen, // and contains a callback for loading what ever is loaded nextBattleScreen.prototype.Hide = function(callbackFunc){  $('div#battle_menu').fadeOut();  $('#battle_screen').fadeOut(function(){    callbackFunc.call();  });}BattleScreen.prototype.EnterBattle = function(background, theseMobs, heroes, music){  battleScreen.playBattleTransitionSound();  battleScreen.doBattleTransitionEffect();  //wait for transition to complete...  battleScreen.startBattleMusic(music);    this.mobs = theseMobs;  if (heroes != undefined){this.heroes = heroes;}  this.background = background;  this.battleStartedAt = gameTime;      battleScreen.paintBackground(background);      // display the UI for the battle  battleScreen.DisplayUI();    // Draw heroes running in...  $.each(this.mobs, function(i, mob) {     mob.setPositionOffscreen();  });    //window.setTimeout(main, 200);  // initiates the main loop which will call this.renderBattleScene() frequently}BattleScreen.prototype.DisplayUI = function(){  $('#battle_background').show();  $('#battle_screen').show();  $('div#battle_menu').show();  currentScreen = "battle_screen";}//BattleScreen.mobs = function(){}// 1)  Image data// 2)  ID// 3)  Name// 4)  Combat statsvar offsetForSlideIn;BattleScreen.prototype.renderBattleScene = function(){  var offsetForSlideIn;    var isIntroStage = (this.timeElapsed < 5);    if (isIntroStage){    //offsetForSlideIn = -400 + timeElapsed * 100 * 30;    offsetForSlideIn = -400 + this.timeElapsed * 700;    offsetForSlideIn = offsetForSlideIn | offsetForSlideIn;    if (offsetForSlideIn > 0) {      offsetForSlideIn=0;    }  }  else{    offsetForSlideIn = 0;  }    // only draw mobs when they're in that intor motion phase...  if (isIntroStage){    $.each(this.heroes, function(i, hero) {      hero.drawUnit(offsetForSlideIn);    });  }    // for each mob in mobs...  if (isIntroStage){    $.each(this.mobs, function(i, mob) {       mob.drawUnit(offsetForSlideIn);    });  }      if(debugMode){ //battleScreen.context.fillText(gameTime, 10, 10);    drawGraphicsDebugInfo(this);  }  }// How many seconds should I wait before rolling another update?BattleScreen.prototype.update = function(secondsPassed){  this.timeElapsed = gameTime - this.battleStartedAt;    this.RushInEffect_allAtOnce();}// an effect that occurs in the first few seconds of the battle// where the mobs rush into the battle field all at once...BattleScreen.prototype.RushInEffect_allAtOnce = function(){  var speed = 45;    if (this.mobs[0].x < this.mobs[0].position[0]){    if (this.mobs[0].x + speed > this.mobs[0].position[0]){      $.each(this.mobs, function(i, mob){        mob.setX(mob.position[0]);      });    }    else{      $.each(this.mobs, function(i, mob){        mob.setX(mob.x + speed);      });    }  }  else if(!this.introFinished){    $.each(this.mobs, function(i, mob){      mob.setX(mob.position[0]);    });    this.introFinished = true;  }}BattleScreen.prototype.playBattleTransitionSound = function(){}BattleScreen.prototype.doBattleTransitionEffect = function(){}BattleScreen.prototype.startBattleMusic = function (){}BattleScreen.prototype.paintBackground = function(background){  if (background == undefined){    background = this.background;  }    var width = background.width; //this.context.canvas.width;  var height = background.height; //this.context.canvas.height;    // paint the proper background...  // this.context.drawImage(background, 
    // 0, 0, 
    // width,
    // height);       var btlbg = document.getElementById('battle_background').getContext('2d');
  btlbg.drawImage(background, 
    0, 0, 
    width,
    height); }