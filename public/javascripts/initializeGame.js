// See /javascripts/initial_fantasy.js for the good stuff

// Give InitialFantasy a game loop pipeline via this mixin pattern
asGameLoop.call(InitialFantasy.prototype);


$(window).load(function() { // this waits for everything that happened in load() to ... load.
    debugMode = true;
    // NOTE: the game object *MUST* be named game thanks to onEachFrame
    // callbacks and lack of encapsulation at the moment...
    window.game = new InitialFantasy(debugMode);

    // downloads .png files needed to play
    game.graphics.loadBaseImages();

    game.start();
});
