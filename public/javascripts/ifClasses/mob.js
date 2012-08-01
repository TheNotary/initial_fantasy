function Mob(type, id, image, position, stance){
  Unit.call(this, type, id, image, position, stance);
  
  this.shadowImages = [imgflightShadow0, imgflightShadow1, imgflightShadow2, imgflightShadow3];
}

Mob.prototype = new Unit();




// This method is somewhat specific to mobs vs heroes... so I'm not refactoring it up to the super
Mob.prototype.drawFlyingUnit = function(){
  if (this.unitMoved){
    
    battleScreen.context.clearRect(this.lastX, this.lastY-this.height-50, this.width, this.height);
    battleScreen.context.drawImage(this.image,
        this.x, this.y - this.height-50,
        this.width, this.height);
        
    // draw shadow now too...
    battleScreen.context.clearRect(this.lastX-12, this.lastY+20, this.shadowImages[0].width, this.shadowImages[0].height);
    battleScreen.context.drawImage(this.shadowImages[0],
      this.x-12, this.y + 20,
      this.shadowImages[0].width, this.shadowImages[0].height);
    
    this.lastX = this.x;
    this.lastY = this.y;
    this.lastWidth = this.width;
    this.lastHeight = this.height;
    
  }
}


Mob.prototype.setPositionOffscreen = function(){
  this.x = this.x - 400;
}


