/*
 * canvasId     - String containing ID of canvas element on html
 * audioId      - String identifieing audio element
 * menuId       - null, would define an html menu... null if no menu
 * imageSrc     - path to image for title screen
 */
function TitleScreen(canvasId, audioId, menuId, imageSrc) {
    Screen.call(this, canvasId, audioId, menuId);

    this.ga = 0.0; // global alpha to the canvas context
    this.timerId = 0; // id for fade in timer
    this.imgTitleScreen = new Image();
    this.imgTitleScreen.src = imageSrc;
}

TitleScreen.prototype = new Screen();

TitleScreen.prototype.begin = function() {
    // this.audio.play();
    this.fadeIn();
};

TitleScreen.prototype.handleKeys = function(evt) {
    this.breakFromScreenOnInput(evt);
};

TitleScreen.prototype.handleMouse = function(evt) {
    this.breakFromScreenOnInput(evt);
};

TitleScreen.prototype.ExitScreen = function(scene) {


    this.audio.pause();
    clearInterval(timerId); // clears the fade in timer
    if (scene != undefined) {
        sceneDirector.switchToScene(scene);
    }
};

TitleScreen.prototype.breakFromScreenOnInput = function(evt) {
    var delayBeforePressStart = 2.0; // wait 2 seconds before they can start the game
    // TODO: refactor game.time() into a more nested pattern...
    if (game.time() < delayBeforePressStart && !game.removeTitleScreenDelay) {
        return;
    }

    if (evt.buttons >= 1) { // mouse button 1
        this.ExitScreen("intro-on_air_ship");
        return;
    }

    var key = evt.keyCode;

    if (key == 13 || key == 27) { // enter or esc???
        this.ExitScreen("intro-on_air_ship");
    }
};

// queues the timer that handles mutating the transparency levels of the canvas for the title screen
TitleScreen.prototype.fadeIn = function() {
    timerId = setInterval("game.titleScreen.iterateFadeIn()", 60);
};

// this is itereted when fadeIn is called which makes the canvas more and more visible
// until the fade in is complete
TitleScreen.prototype.iterateFadeIn = function() {
    var context = this.context;
    var fadeInMax = 1.0; // fade in over 1 second
    var fadeInIncrement = 0.01;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.globalAlpha = this.ga;

    context.drawImage(this.imgTitleScreen, 0, 0);

    this.ga = this.ga + fadeInIncrement;
    if (this.ga > fadeInMax) {
        clearInterval(timerId);
    }
};
