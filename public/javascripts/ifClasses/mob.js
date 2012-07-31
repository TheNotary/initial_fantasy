function Mob(type, id, image, position, stance){
  Unit.call(this, type, id, image, position, stance);
  
  
  this.shadowImages = [imgflightShadow0, imgflightShadow1, imgflightShadow2, imgflightShadow3];
  
}

Mob.prototype = new Unit();








// TODO:  add acceleration and add a delay between each mob so they come one at a time almost.  
Mob.prototype.drawGroundUnit = function(offsetForSlideIn){
  var calculatedX = this.position[0] + offsetForSlideIn;
    // Draw the mobs up...
    battleScreen.context.drawImage(this.image,
      calculatedX, this.position[1] - this.image.height,
      this.image.width, this.image.height);
}

Mob.prototype.drawFlyingUnit = function(offsetForSlideIn){
  var calculatedX = this.position[0] + offsetForSlideIn;
  
  battleScreen.context.drawImage(this.image,
      calculatedX, this.position[1] - this.image.height-50,
      this.image.width, this.image.height);
      
  // draw shadow now too...
  battleScreen.context.drawImage(this.shadowImages[0],
    calculatedX-12, this.position[1] + 20,
    this.shadowImages[0].width, this.shadowImages[0].height);
}




