function Hero(type, id, image, position, stance){
  Unit.call(this, type, id, image, position, stance);
}


Hero.prototype = new Unit();






Hero.prototype.calculateX = function(offsetForSlideIn){
  return this.position[0];
}

