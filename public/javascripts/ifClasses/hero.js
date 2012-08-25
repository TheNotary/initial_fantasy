function Hero(type, id, image, position, stance, row){
  Unit.call(this, type, id, image, position, stance);
  
  this.row = row;
  this.htmlElements = new HtmlElements(this.name, row);
  this.heroIsReady = false;  // waitbar drawn at 100% yet?.. this variable is read from within the draw loop, not the update loop.  Careful...
  this.isSelected = false;  // owner of the action bar items in the combat menu
                            // when we remove something from the heroQueue... we need to set this variable on the next hero... so the refactoring will be elsewhere...
}


Hero.prototype = new Unit();






Hero.prototype.calculateX = function(offsetForSlideIn){
  return this.position[0];
}


Hero.prototype.resetWaitBar = function(){
  var hero = this;
  hero.stats.waitBar = 0;
  hero.htmlElements.readyBarHasBeenDrawn = false;
  hero.htmlElements.waitBar.clearRect(0,0,100,10);  // manually clear the yellow progress bar
}
