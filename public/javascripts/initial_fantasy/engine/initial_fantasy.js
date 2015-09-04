// This file houses the main class... but there's interesting bits in the
// initialize_game.js file too, such as it's mixin content loading

// Setup/ define game loop (mixin invoked from initialize_game.js)
// Initialize the big game objects (eg battleScreen)
window.InitialFantasy = function(debugMode) {
    this.debugMode = debugMode;

    // this variable tracks the current UI being displayed...
    // It's useful for the render loop to know what to render...
    // We'll see how that turns out when I have more code down...
    this.currentScreen = "title_screen";

    this.titleScreen = new TitleScreen('title_screen', 'audTitleScreen',
        null, '/images/ui/title_screen.png');

    this.battleScreen = new BattleScreen('battle_screen', 'audBattle', 'battle_menu');

    this.graphics = new this.Graphics();
    this.sound = new this.Sound();


    // Calling this method will initiate the game
    this.start = function() {
        addEventHandlersToDom();
        // queue up the game loop to itereate whenever the browser can
        window.onEachFrame(game.main);
        // Put the game into motion by begining the titleScreen sequence
        this.titleScreen.begin();

        if (this.debugMode) debuggingFunctions();
    };

};
