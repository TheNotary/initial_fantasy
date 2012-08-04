function Hero(type, id, image, position, stance, row){
  Unit.call(this, type, id, image, position, stance);
  
  this.row = row;
  this.htmlElements = new HtmlElements(this.name, row);
  this.heroIsReady = false;  // waitbar drawn at 100% yet?.. this variable is read from within the draw loop, not the update loop.  Careful...
}


Hero.prototype = new Unit();






Hero.prototype.calculateX = function(offsetForSlideIn){
  return this.position[0];
}

