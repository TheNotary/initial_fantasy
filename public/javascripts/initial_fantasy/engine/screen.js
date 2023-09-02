// There are a couple different screens in this game...
// A title screen that just shows the title fading in (and later a login)
// A battleScreen which shows the party lined up against
// Eventually a worldScreen will show up I hope...
// and possibly a real-time fighting adventureScreen (Zelda link to past style)
function Screen(canvasId, sound, menuId) {
    if (canvasId === undefined) {
        return;
    }
    this.context = document.getElementById(canvasId).getContext('2d');
    this.canvasId = canvasId;
    this.menuId = menuId;
    this.bgMusic = sound.bgMusic[this.canvasId];
};

Screen.handleKeys = function(evt) {};

Screen.handleMouse = function(evt) {};


// This method is only useful for the title screen... what a waste of refactoring...
// other screen switching is handled by Screen.Hide...
Screen.prototype.ExitScreen = function(scene) {
    if (this.bgMusic) {
        this.bgMusic.pause();
    }

    if (scene != undefined) {
        sceneDirector.switchToScene(scene);
    }
};

// This method will hide any HTML Divs for this screen if they exist (they do for the battle screen only...)
// and also hide the associated canvas screen (one won't exist for the start menu though...)
Screen.prototype.Hide = function(callbackFunc) {
    if (this.menuId != undefined) {
        $('#' + this.menuId).fadeOut();
    }
    $('#' + this.canvasId).fadeOut(function() {
        callbackFunc.call();
    });
};
