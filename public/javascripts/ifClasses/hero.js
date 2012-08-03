function Hero(type, id, image, position, stance, row){
  Unit.call(this, type, id, image, position, stance);
  
  this.row = row;
}


Hero.prototype = new Unit();






Hero.prototype.calculateX = function(offsetForSlideIn){
  return this.position[0];
}

