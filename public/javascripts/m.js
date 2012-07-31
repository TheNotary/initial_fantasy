var readyToPressStart = false;  // used to cause a delay in the title screen before user can pres startvar mobs;function timeout_before_press_start(delayTime){  delayTime = delayTime * 1000;  // convert to miliseconds  setTimeout( function() {    readyToPressStart = true;  }, delayTime);}function fadeInTitle(){  context = titleScreen.context;  timerId = setInterval("fadeIn(context, imgTitleScreen)",60);}var ga = 0.0;var timerId = 0;function fadeIn(context, image){  context.clearRect(0,0, context.canvas.width,context.canvas.height);  context.globalAlpha = ga;    context.drawImage(image, 0, 0);    ga = ga + 0.01;  if (ga > 1.0){    goingUp = false;    clearInterval(timerId);  }}var then = Date.now();function main(){  var now = Date.now();  var delta = now - then;    update(delta / 1000);  draw();    then = now;  window.setTimeout(main, 1);}function draw(){  switch(currentScreen){  case "title_screen":  // never use render loop for title screen... unless I make it more interesting...    break;  case "battle_screen":    battleScreen.paintBackground();    battleScreen.renderBattleScene();    break;  case "town_screen":    break;  case "worl_screen":    break;  }}function update(fracOfSecond){  }var delayBeforeStartGame = 2;function init(){  document.getElementById('audio1').play();  fadeInTitle();  timeout_before_press_start(delayBeforeStartGame);}// Images and stuffvar imgTitleScreen;// battle backgroundsvar imgBtlGrassyLake;// mob imagesvar goblin;// Load all images and stuff here I guess...function load(){  setupCanvases();    imgTitleScreen = new Image();  imgTitleScreen.src = '/images/ui/title_screen.png';  loadBattleBackgrounds();    loadMobs();  loadHeroes();}// Sets up canvases and Screen objectsfunction setupCanvases(){  canvasId = 'title_screen';  audioId = 'audio1';    // pass in the ID of the canvas element to be used for this screen.  Also pass in the audioId  titleScreen = new TitleScreen(canvasId, audioId);    // You need to pass in a third argument for the BattleScreen which is the html div encapsulating the  // fight commands and player health points, etc.    battleScreen = new BattleScreen('battle_screen', 'audBattle', 'battle_menu');    }function loadBattleBackgrounds(){  imgBtlGrassyLake = new Image();  imgBtlGrassyLake.src = '/images/battle_bgs/ff2_zone1_grass.png';}function loadMobs(){  window.goblin = new Image();  // this creates a global variable from within a function... not sure if I should do it this way...  goblin.src = '/images/mobs/ff2_goblin.png';    window.imgEagle = new Image();  imgEagle.src = '/images/mobs/ff2_eagle.png';    window.imgflightShadow0 = new Image();  imgflightShadow0.src = '/images/mobs/ff2_flightShadow0.png';  window.imgflightShadow1 = new Image();  imgflightShadow1.src = '/images/mobs/ff2_flightShadow1.png';  window.imgflightShadow2 = new Image();  imgflightShadow2.src = '/images/mobs/ff2_flightShadow2.png';  window.imgflightShadow3 = new Image();  imgflightShadow3.src = '/images/mobs/ff2_flightShadow3.png';}function loadHeroes(){  imgCecil = new Image();  imgCecil.src = '/images/heroes/ff2_cecil.png';}$(document).ready(function() {  load();  $(window).load(function () {   // this waits for everything that happened in load() to ... load.    init();  });    debuggingFunctions();  // comment out for production tests});function debuggingFunctions(){    // make it so whenever we click a canvas element, we get the X Y values in console...  $('canvas').each(function(){    this.addEventListener("mousedown", relMouseCoords, false);  });    // make it so there is no sound on title screen  titleScreen.audio.volume = 0;    // make it so there is no delay on titlescreen  delayBeforeStartGame = 0;    // auto skip title screen  titleScreen.ExitScreen("intro-on_air_ship");    useArrowKeysToMoveCanvasSprite();}