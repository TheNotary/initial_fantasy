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

window.onEachFrame = onEachFrame;


$(function(){
  window.onEachFrame(main);
});




