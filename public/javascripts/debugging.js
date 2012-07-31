


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



var avgFps = 0;
var framesGoneBy = 0;
var mozPaintOld = 0;
var mozPaintNew = 0;
var mozFps = 0;
var bankScore = "none yet";

function drawGraphicsDebugInfo(screen){
  screen.context.fillStyle = "white";
  screen.context.clearRect(0, 0, 200, 50);
  
  screen.context.fillText("gameTime: " + gameTime, 10, 10);    // Game Time
  screen.context.fillText("fps: " + gameFps, 10, 20);    // fps
  
  framesGoneBy = framesGoneBy + 1;
  avgFps = framesGoneBy / gameTime;
  
  screen.context.fillText("framesGoneBy: " + framesGoneBy, 10, 30);    // 
  //screen.context.fillText("avgFps: " + avgFps, 10, 40);    // 
  
  //screen.context.fillText("bankScore: " + bankScore, 10, 50);  // a sort of short benchmark, just so I can eyeball the effects of code changes
  
  screen.context.fillText("updatesRun: " + updatesRun, 10, 40);
  screen.context.fillText("DrawsRun: " + drawsRun, 10, 50);
  
  //screen.context.fillText("avg moz-fps: " + mozPaintCount/gameTime, 10, 50);    // fps
  
}


