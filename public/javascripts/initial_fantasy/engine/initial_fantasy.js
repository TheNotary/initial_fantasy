// This file houses the main class... but there's interesting bits in the
// initialize_game.js file too, such as it's mixin content loading

// Setup/ define game loop
// Initialize the big game objects (eg battleScreen)
// Load sprites (mobs/ heroes/ bg images)
//

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







    // ************ LOAD GRAPHICS *************************

    // loadBattleBackgrounds();
    this.imgBtlGrassyLake = new Image();
    this.imgBtlGrassyLake.src = '/images/battle_bgs/ff2_zone1_grass.png';

    function loadMobs() {
        window.imgflightShadow0 = new Image();
        imgflightShadow0.src = '/images/mobs/ff2_flightShadow0.png';
        window.imgflightShadow1 = new Image();
        imgflightShadow1.src = '/images/mobs/ff2_flightShadow1.png';
        window.imgflightShadow2 = new Image();
        imgflightShadow2.src = '/images/mobs/ff2_flightShadow2.png';
        window.imgflightShadow3 = new Image();
        imgflightShadow3.src = '/images/mobs/ff2_flightShadow3.png';
    }

    function loadHeroes() {
        imgCecil = new Image();
        imgCecil.src = '/images/heroes/ff2_cecil.png';

        imgKain = new Image();
        imgKain.src = '/images/heroes/ff2_kain.png';

        imgRosa = new Image();
        imgRosa.src = '/images/heroes/ff2_rosa.png';

        imgKabul = new Image();
        imgKabul.src = '/images/heroes/ff2_kabul.png';
    }

    loadMobs();
    loadHeroes();
};
