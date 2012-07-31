function BattleScreen(canvasId, audioId, menuId){  Screen.call(this, canvasId, audioId, menuId);  this.background;  this.mobs = [];  this.heros = [];  this.timeElapsed = 0.0;  this.battleStartedAt = 0;}BattleScreen.prototype = new Screen();BattleScreen.prototype.handleKeys = function(evt){  var key = evt.keyCode;  if (key == 13){    alert('hey, you did something on the battle screen.');  }}// This function handles hiding the UI for battle screen, // and contains a callback for loading what ever is loaded nextBattleScreen.prototype.Hide = function(callbackFunc){  $('div#battle_menu').fadeOut();  $('#battle_screen').fadeOut(function(){    callbackFunc.call();  });}BattleScreen.prototype.EnterBattle = function(background, theseMobs, heroes, music){  battleScreen.playBattleTransitionSound();  battleScreen.doBattleTransitionEffect();  //wait for transition to complete...  battleScreen.startBattleMusic(music);    this.mobs = theseMobs;  if (heroes != undefined){this.heroes = heroes;}  this.background = background;  this.battleStartedAt = gameTime;      battleScreen.paintBackground(background);      // display the UI for the battle  battleScreen.DisplayUI();    // Draw heroes running in...      //window.setTimeout(main, 200);  // initiates the main loop which will call this.renderBattleScene() frequently}BattleScreen.prototype.DisplayUI = function(){  $('#battle_background').show();  $('#battle_screen').show();  $('div#battle_menu').show();  currentScreen = "battle_screen";}//BattleScreen.mobs = function(){}// 1)  Image data// 2)  ID// 3)  Name// 4)  Combat statsvar offsetForSlideIn;BattleScreen.prototype.renderBattleScene = function(){  var offsetForSlideIn;  var delta = gameTime - this.battleStartedAt;    if (delta < 5){    //offsetForSlideIn = -400 + timeElapsed * 100 * 30;    offsetForSlideIn = -400 + delta * 700;    offsetForSlideIn = offsetForSlideIn | offsetForSlideIn;    if (offsetForSlideIn > 0) {      offsetForSlideIn=0;    }  }  else{    offsetForSlideIn = 0;  }    // only draw mobs when they're in that motion phase...  if (offsetForSlideIn != 0){    $.each(this.heroes, function(i, hero) {      hero.drawUnit(offsetForSlideIn);    });  }    // for each mob in mobs...  if (offsetForSlideIn != 0){    // clear screen for mobs (prevent them from blurring in...)    this.context.clearRect(0, 50, 470, 290);    $.each(this.mobs, function(i, mob) {         mob.drawUnit(offsetForSlideIn);    });  }      if(debugMode){ //battleScreen.context.fillText(gameTime, 10, 10);    drawGraphicsDebugInfo(this);  }  }// How many seconds should I wait before rolling another update?BattleScreen.prototype.update = function(secondsPassed){  }BattleScreen.prototype.playBattleTransitionSound = function(){}BattleScreen.prototype.doBattleTransitionEffect = function(){}BattleScreen.prototype.startBattleMusic = function (){}BattleScreen.prototype.paintBackground = function(background){  if (background == undefined){    background = this.background;  }    var width = background.width; //this.context.canvas.width;  var height = background.height; //this.context.canvas.height;    // paint the proper background...  // this.context.drawImage(background, 
    // 0, 0, 
    // width,
    // height);       var btlbg = document.getElementById('battle_background').getContext('2d');
  btlbg.drawImage(background, 
    0, 0, 
    width,
    height); }