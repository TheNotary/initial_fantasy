
// NameSpace for globals
function InitialFantasy(){
}

var game = new InitialFantasy();


game.debugMode = true;




var setupGameTimer = function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); requestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }

  window.onEachFrame = onEachFrame;    // this global can now be called and it will do the appropriate thing across browser
};

setupGameTimer();









var lastMainEndedAt = 0;

var gameTime = 0.0;
var gameFps = 0.0;
var then = Date.now();

var lastTick = 0;  // the last time the game logic ticked was at...

function main(){
  timeBetweenCallingMain = Date.now() - lastMainEndedAt;
  
  var now = Date.now();
  var delta = now - then;
  gameTime = gameTime + delta/1000;
  
  var skipTicks = 1000 / 30;   // 30 fps
  var loops = 0;
  var maxFrameSkip = 3;  // skip the draw phase up to 3 times in a row if CPU is lagging
  var nextGameTick = (new Date).getTime() + 1000;
  
  var tickInterval = 30;// 50ms
  
  while ( itsTimeToDoAnotherTick(lastTick, tickInterval)  &&                         // UPDATE DATA ONLY WHEN IT'S APPROPRIATE
          weHaventBeenNeglectingTheDrawFunctionTooLong(loops, maxFrameSkip) 
         ){
    lastTick = Date.now();
    
    update(delta / 1000);   // passes in a decimal representing the number of seconds since last hit method...
    
    loops++; 
    if (loops > 1) {console.debug('CPU SLACK!    update() calls are taking too long to complete');}
  }
  
  draw();        // DRAW AS OFTEN AS YOU CAN
  
  gameFps = 1000 /delta;
  then = now;

  if (bankScore == "none yet" && gameTime > 10){
    bankScore = avgFps;
    goldenScore = thisSpotWasRun;
  }
  lastMainEndedAt = Date.now();
}


function itsTimeToDoAnotherTick(lastTick, tickInterval){
  delta = Date.now()-lastTick;
  if (delta >= tickInterval*4){
    console.debug("we're an entire tick behind!  We probably aren't finishing drawing fast enough  " + delta + " / "+tickInterval + '   last draw t: '+lastDrawTime);
    thisSpotWasRun++;
  }
  return delta >= tickInterval;
}

function weHaventBeenNeglectingTheDrawFunctionTooLong(loops, maxFrameSkip){
  return loops < maxFrameSkip;
}


$(function(){
  window.onEachFrame(main);
});



function draw(){
  switch(currentScreen){
  case "title_screen":  // never use render loop for title screen... unless I make it more interesting...
    break;
  case "battle_screen":
    //battleScreen.paintBackground();
    battleScreen.renderBattleScene();
    break;
  case "town_screen":
    break;
  case "worl_screen":
    break;
  }
}

function update(secondsPassed){
  switch(currentScreen){
  case "title_screen":  // never use render loop for title screen... unless I make it more interesting...
    break;
  case "battle_screen":
    battleScreen.update(secondsPassed);
    break;
  case "town_screen":
    break;
  case "worl_screen":
    break;
  }
}

function init(){
  titleScreen.begin();

  addEventHandlersToDom();
}



// battle backgrounds
var imgBtlGrassyLake;

// mob images
var goblin;


// Load all images and stuff here I guess...
function load(){
  setupClassObjects();
  
  loadBattleBackgrounds();
  
  loadMobs();
  loadHeroes();
  
  setupAudio();
}

function setupAudio(){
  var audMenuMove = new Howl({
    urls: ["/audio/misc/menu_move.ogg"]
  })
  
  audMenuUnitSelect = document.createElement('audio');
  audMenuUnitSelect.setAttribute('src', '/audio/misc/menu_move.ogg');
  
  // audTitleScreen = document.getElementById('audio1'); // html5

}

// Sets up canvases and Screen objects
function setupClassObjects(){
  titleScreen = new TitleScreen('title_screen', 
    ["/audio/opener/Final_Fantasy_4_Lacrima_OC_ReMix.mp3", "/audio/opener/Final_Fantasy_4_Lacrima_OC_ReMix.ogg"], 
    null, '/images/ui/title_screen.png');
  
  battleScreen = new BattleScreen('battle_screen', 'audBattle', 'battle_menu');
  
  actionMenu = new ActionMenu();
}




function loadBattleBackgrounds(){
  imgBtlGrassyLake = new Image();
  imgBtlGrassyLake.src = '/images/battle_bgs/ff2_zone1_grass.png';
}


function loadMobs(){
  window.goblin = new Image();  // this creates a global variable from within a function... not sure if I should do it this way...
  goblin.src = '/images/mobs/ff2_goblin.png';
  
  window.imgEagle = new Image();
  imgEagle.src = '/images/mobs/ff2_eagle.png';
  
  window.imgFloatingEye = new Image();
  imgFloatingEye.src = '/images/mobs/ff2_floating_eye.png';
  window.imgSwordRat = new Image();
  imgSwordRat.src = '/images/mobs/ff2_sword_rat.png';
  
  window.imgflightShadow0 = new Image();
  imgflightShadow0.src = '/images/mobs/ff2_flightShadow0.png';
  window.imgflightShadow1 = new Image();
  imgflightShadow1.src = '/images/mobs/ff2_flightShadow1.png';
  window.imgflightShadow2 = new Image();
  imgflightShadow2.src = '/images/mobs/ff2_flightShadow2.png';
  window.imgflightShadow3 = new Image();
  imgflightShadow3.src = '/images/mobs/ff2_flightShadow3.png';
}

function loadHeroes(){
  imgCecil = new Image();
  imgCecil.src = '/images/heroes/ff2_cecil.png';
  
  imgKain = new Image();
  imgKain.src = '/images/heroes/ff2_kain.png';
  
  imgRosa = new Image();
  imgRosa.src = '/images/heroes/ff2_rosa.png';
  
  imgKabul = new Image();
  imgKabul.src = '/images/heroes/ff2_kabul.png';
}


function addEventHandlersToDom(){
  $('canvas').each(function(){
    this.addEventListener("mousedown", relMouseCoords, false);
  });
}


$(document).ready(function() {
  load();
  $(window).load(function () {   // this waits for everything that happened in load() to ... load.
    init();
    if(game.debugMode)debuggingFunctions();
  });
});











