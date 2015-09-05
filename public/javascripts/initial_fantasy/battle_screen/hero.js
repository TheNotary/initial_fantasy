function Hero(type, id, image, position, stance, row) {
    Unit.call(this, type, id, image, position, stance);

    this.row = row;
    this.htmlElements = new HtmlElements(this.name, row);
    this.heroIsReady = false; // waitbar drawn at 100% yet?.. this variable is read from within the draw loop, not the update loop.  Careful...
    this.isSelected = false; // owner of the action bar items in the combat menu
    // when we remove something from the heroQueue... we need to set this variable on the next hero... so the refactoring will be elsewhere...
}


Hero.prototype = new Unit();





Hero.prototype.calculateX = function(offsetForSlideIn) {
    return this.position[0];
};


Hero.prototype.resetWaitBar = function() {
    var hero = this;
    hero.stats.waitBar = 0;
    hero.htmlElements.readyBarHasBeenDrawn = false;
    hero.htmlElements.waitBar.clearRect(0, 0, 100, 10); // manually clear the yellow progress bar
};

// freezes the hero's waitbar until they finish their strike animation, or
// what ever spell induced their waitBar to freeze runs out
Hero.prototype.freezeWaitBar = function() {
    this.stats.waitBarFrozen = true;
};

Hero.prototype.unfreezeWaitBar = function() {
    this.stats.waitBarFrozen = false;
};


Hero.prototype.drawWaitBar = function() {
    var hero = this;

    if (hero.stats.waitBar < 100) {
        var waitBarContext = hero.htmlElements.waitBar;
        waitBarContext.fillStyle = "white";
        waitBarContext.fillRect(hero.stats.waitBar - 10, 0, 10, 10);
    }
    else {
        if (!hero.htmlElements.readyBarHasBeenDrawn) {
            var waitBarContext = hero.htmlElements.waitBar;
            waitBarContext.fillStyle = "yellow";
            waitBarContext.fillRect(0, 0, 100, 10);
            hero.htmlElements.readyBarHasBeenDrawn = true;
        } // do nothing if we've already painted the progress bar yellow once
    }
};
