function Mob(type, id, image, position, stance){
  Unit.call(this, type, id, image, position, stance);
  
  this.shadowImages = [imgflightShadow0, imgflightShadow1, imgflightShadow2, imgflightShadow3];
}

Mob.prototype = new Unit();




Mob.prototype.calculateX = function(offsetForSlideIn){
  return this.position[0] + offsetForSlideIn;
}


// This method is somewhat specific to mobs vs heroes... so I'm not refactoring it up to the super
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

Mob.prototype.calculateHoverY = function(frame){
  return 0;
}


