


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
        battleScreen.mobs[0].setY(battleScreen.mobs[0].y+1);
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
    unit = reportWhatUnitWasClicked(canvasX, canvasY);
    console.debug('Unit Name: ' + unit.name);
    
    return {x:canvasX, y:canvasY}
}


function reportWhatUnitWasClicked(clickX, clickY){
  var unit;
  // check if it was a mob that was clicked
  unit = whatUnitWasClicked(clickX, clickY, battleScreen.mobs);
  if (unit != false){return unit;}
  // check if it was a hero
  unit = whatUnitWasClicked(clickX, clickY, battleScreen.heroes);
  return unit;
}

function whatUnitWasClicked(clickX, clickY, mobs){
  //var mobs = battleScreen.mobs;
  // check if it was a mob
  for (var i = 0; i < mobs.length; i++){
    var mob = mobs[i];
    
    var x1 = mob.x;
    var x2 = mob.x + mob.width;
    var y1 = mob.y - mob.height;
    var y2 = mob.y;
    if(mob.stance == "flying" && mob.type == unitType.mob){
      y1 = mob.y - mob.height-50;
      y2 = mob.y-50;
    }
    
    //console.debug('x1: '+x1+'  x2: '+x2+'  y1: '+y1+'  y2: '+y2);
    
    if (clickX >= x1 && clickX <= x2 &&
        clickY >= y1 && clickY <= y2){
          //console.debug('TRUE');
          return mob;
        }
  }
  return false;
}




function printBoundingBox(mob){
  var x
}



var avgFps = 0;
var framesGoneBy = 0;
var mozPaintOld = 0;
var mozPaintNew = 0;
var mozFps = 0;
var bankScore = "none yet";
var updatesRun = 0;
var drawsRun = 0;


function drawGraphicsDebugInfo(screen){
  screen.context.fillStyle = "black";
  screen.context.fillRect(0, 0, 200, 50);
  screen.context.fillStyle = "white";
  
  
  //processTimeDebugInfo(screen);
  //return;
  
  screen.context.fillText("gameTime: " + gameTime, 10, 10);    // Game Time
  screen.context.fillText("fps: " + gameFps, 10, 20);    // fps
  
  framesGoneBy = framesGoneBy + 1;
  avgFps = framesGoneBy / gameTime;
  
  screen.context.fillText("framesGoneBy: " + framesGoneBy, 10, 30);    // 
  
  screen.context.fillText("avgFps: " + avgFps, 10, 40);    // 
  screen.context.fillText("bankScore: " + bankScore, 10, 50);  // a sort of short benchmark, just so I can eyeball the effects of code changes
  
  //screen.context.fillText("updatesRun: " + updatesRun, 10, 40);
  //screen.context.fillText("DrawsRun: " + drawsRun, 10, 50);
  
  //screen.context.fillText("avg moz-fps: " + mozPaintCount/gameTime, 10, 50);    // fps
  
}


var thisSpotWasRun = 0;
var totTimeSpent = 0;
var timeSpentThisRun = 0;
var longestRun = 0;
var avgTimeSpent = 0;
var goldenScore = "";
var lastDrawTime = 0;
var timeBetweenCallingMain = 0;
function processTimeDebugInfo(screen){
  if(timeSpentThisRun > longestRun){
    longestRun = timeSpentThisRun;
  }
  
  screen.context.fillText("Function Hits: " + thisSpotWasRun, 10, 10);
  screen.context.fillText("Total Time Spent: " + totTimeSpent, 10, 20); 
  screen.context.fillText("Time Spent This Hit: " + timeSpentThisRun, 10, 30); 
  //screen.context.fillText("Longest Run: " + longestRun, 10, 40);
  screen.context.fillText("Time Spent OutSide Main: " + timeBetweenCallingMain, 10, 40);
  //screen.context.fillText("Average Time Spent: " + avgTimeSpent, 10, 50);
  screen.context.fillText("Golden Score: " + goldenScore, 10, 50);
}


