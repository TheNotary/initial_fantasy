


function useArrowKeysToMoveCanvasSprite(){
  myProc = document.onkeydown;
  document.onkeydown = function(evt) {
    myProc.call(this, evt);  // do the thing that onkeydown is meant to do in production mode too...
    
    
    if(currentScreen == "battle_screen"){
      switch(evt.keyCode){
      case 39:  // right arrow
        alert(battleScreen.mobs[0].position);
        break;
      case 37: // left arrow
        
        break;
      }
      
    }
  }
}





// place within the onclick event of a canvas to see it work
function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;
    
    //alert(canvasX + ', ' + canvasY);
    console.debug("x: " + canvasX + "  y: " + canvasY);
    return {x:canvasX, y:canvasY}
}