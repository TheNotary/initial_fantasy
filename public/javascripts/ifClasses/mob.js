function Mob(type, id, image, position, stance){
  Unit.call(this, type, id, image, position, stance);
  
  this.shadowImages = [imgflightShadow0, imgflightShadow1, imgflightShadow2, imgflightShadow3];
}

Mob.prototype = new Unit();




// This method is somewhat specific to mobs vs heroes... so I'm not refactoring it up to the super
Mob.prototype.drawFlyingUnit = function(offsetForSlideIn){
  battleScreen.context.drawImage(this.image,
      this.x, this.y - this.image.height-50,
      this.image.width, this.image.height);
      
  // draw shadow now too...
  battleScreen.context.drawImage(this.shadowImages[0],
    this.x-12, this.y + 20,
    this.shadowImages[0].width, this.shadowImages[0].height);
}

Mob.prototype.calculateHoverY = function(frame){
  return 0;
}


Mob.prototype.setPositionOffscreen = function(){
  this.x = this.x - 400;
}
