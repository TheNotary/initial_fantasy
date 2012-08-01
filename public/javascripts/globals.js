var debugMode = false;

var currentScreen;  // this variable tracks the current UI being displayed...  It's useful for the render loop to know what to render...  We'll see how that turns out when I have more code down...

var titleScreen;
var battleScreen;



function heroes(){}

heroes.cecil = function(){}






var onEachFrame;
if (window.webkitRequestAnimationFrame) {
  onEachFrame = function(cb) {
    var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
    _cb();
  };
} else if (window.mozRequestAnimationFrame) {
  onEachFrame = function(cb) {
    var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
    _cb();
  };
} else {
  onEachFrame = function(cb) {
    setInterval(cb, 1000 / 60);
  }
}

window.onEachFrame = onEachFrame;    // this global can now be called and it will de the appropriate thing across browser


// this is needed to stop canvas from being lame when tapping it on smart phones
function blockCanvasDefaultAction(){
  // $('canvas').each(function(){
    // this.addEventListener("click", "event.preventDefault()", false);
  // });
  //event.preventDefault()
  
}


// enable styling of things which I disable their android orange box for...  doesn't work...
//document.addEventListener("touchstart", function(){}, true);


