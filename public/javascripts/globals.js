var debugMode = true;

var currentScreen;  // this variable tracks the current UI being displayed...  It's useful for the render loop to know what to render...  We'll see how that turns out when I have more code down...

var titleScreen;
var battleScreen;
var actionMenu;

var audMenuFight;
var audMenuUnitSelect;
var audTitleScreen;

var audioContext;




// this is needed to stop canvas from being lame when tapping it on smart phones
function blockCanvasDefaultAction(){
  // $('canvas').each(function(){
    // this.addEventListener("click", "event.preventDefault()", false);
  // });
  //event.preventDefault()
  
}


// enable styling of things which I disable their android orange box for...  doesn't work...
//document.addEventListener("touchstart", function(){}, true);



                                                             //+ Jonas Raoni Soares Silva
// this code is for shuffling array contents                 //@ http://jsfromhell.com/array/shuffle [v1.0]
shuffleArray = function(o) { //v1.0
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};


// input (5,2) output "05"...   (5,3) -> "005"
function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}


// this code adds a delete method to arrays
Array.prototype.remove = function(f) {
  var r=this.slice(f+1||this.length);
  this.length=f<0?this.length+f:f;
  this.push.apply(this, r);
  return this;
};

Array.prototype.isEmpty = function() {
  return this.length == 0 ? true : false;
}

Array.prototype.first = function() {
  return this[0];
}


// Your browser needs ES5 for this to work...
/*
Object.defineProperty(Array.prototype, "first", {
    get: function() {
        return this[0];
    },
});
*/


