function Mob(type, id, image, position, stance) {
    Unit.call(this, type, id, image, position, stance);

    this.shadowImages = game.graphics.getShadowImages();
}

Mob.prototype = new Unit();




// This method is somewhat specific to mobs vs heroes... so I'm not refactoring it up to the super
Mob.prototype.drawFlyingUnit = function() {
    if (this.unitMoved) {

        //battleScreen.context.clearRect(this.lastX, this.lastY-this.height-50, this.width, this.height);
        game.battleScreen.context.drawImage(this.image,
            this.x, this.y - this.height - 50,
            this.width, this.height);

        // draw shadow now too...
        //game.battleScreen.context.clearRect(this.lastX-12, this.position[1]+20, this.shadowImages[0].width, this.shadowImages[0].height);

        properShadowImage = this.shadowImages[2];
        var currentDistFromOrigin = this.y - this.position[1];
        var range = (this.apex - this.nadir);
        var transposed = Math.round(currentDistFromOrigin / range * 3); // convert distance from origin to frame index...
        properShadowImage = this.shadowImages[transposed];

        game.battleScreen.context.drawImage(properShadowImage,
            this.x - 12, this.position[1] + 20,
            properShadowImage.width, properShadowImage.height);

        this.lastX = this.x;
        this.lastY = this.y;
        this.lastWidth = this.width;
        this.lastHeight = this.height;

    }
};


Mob.prototype.setPositionOffscreen = function() {
    this.x = this.x - 400;
};
