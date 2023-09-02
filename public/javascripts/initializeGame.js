// See /javascripts/initial_fantasy.js for the good stuff

// Give InitialFantasy a game loop pipeline via this mixin pattern
asGameLoop.call(InitialFantasy.prototype);

let initialized = false;
function initializer() {
    if (initialized) return;
    initialized = true;
    
    document.getElementById('autoplay-notice').style.display = 'none';
    
    debugMode = false;
    // NOTE: the game object *MUST* be named game thanks to onEachFrame
    // callbacks and lack of encapsulation at the moment...
    window.game = new InitialFantasy(debugMode);

    // downloads .png files needed to play
    game.graphics.loadBaseImages();
    
    game.start();
}

$(document.body).on('click', initializer);
