var readyToPressStart = false;  // used to cause a delay in the title screen before user can pres startfunction timeout_before_press_start(delayTime){  delayTime = delayTime * 1000;  // convert to miliseconds  setTimeout( function() {    readyToPressStart = true;  }, delayTime);}function fadeInTitle(){  context = titleScreen.context;  timerId = setInterval("fadeIn(context, imgTitleScreen)",60);}var ga = 0.0;var timerId = 0;function fadeIn(context, image){  context.clearRect(0,0, context.canvas.width,context.canvas.height);  context.globalAlpha = ga;    context.drawImage(image, 0, 0);    ga = ga + 0.01;  if (ga > 1.0){    goingUp = false;    clearInterval(timerId);  }}function init(){  document.getElementById('audio1').play();  fadeInTitle();  timeout_before_press_start(2);}// Images and stuffvar imgTitleScreen;var imgBtlGrassyLake;// Load all images and stuff here I guess...function load(){  setupCanvases();    imgTitleScreen = new Image();  imgTitleScreen.src = '/images/ui/title_screen.png';  imgBtlGrassyLake = new Image();  imgBtlGrassyLake.src = '/images/battle_bgs/ff2_zone1_grass.png';  }function setupCanvases(){  canvas = document.getElementById('title_screen');  titleScreen.context = canvas.getContext('2d');    canvas = document.getElementById('battle_screen');  battleScreen.context = canvas.getContext('2d');}$(document).ready(function() {  load();  $(window).load(function () {    init();  });});