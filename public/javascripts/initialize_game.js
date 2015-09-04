// NameSpace for globals
//
// Setup/ define game loop
// Load sprites (mobs/ heroes/ bg images)
//
function InitialFantasy(debugMode) {
    this.debugMode = debugMode;

    // this variable tracks the current UI being displayed...
    // It's useful for the render loop to know what to render...
    // We'll see how that turns out when I have more code down...
    this.currentScreen = "title_screen";

    this.titleScreen = new TitleScreen('title_screen', 'audTitleScreen',
        null, '/images/ui/title_screen.png');

    this.battleScreen = new BattleScreen('battle_screen', 'audBattle', 'battle_menu');



    this.start = function() {
        addEventHandlersToDom();
        window.onEachFrame(game.main); // queue up the game loop
        this.titleScreen.begin();

        if (this.debugMode) debuggingFunctions();
    };








    // ************ LOAD GRAPHICS *************************

    // loadBattleBackgrounds();
    this.imgBtlGrassyLake = new Image();
    this.imgBtlGrassyLake.src = '/images/battle_bgs/ff2_zone1_grass.png';

    function loadMobs() {
        window.goblin = new Image(); // this creates a global variable from within a function... not sure if I should do it this way...
        goblin.src = '/images/mobs/ff2_goblin.png';

        window.imgEagle = new Image();
        imgEagle.src = '/images/mobs/ff2_eagle.png';

        window.imgFloatingEye = new Image();
        imgFloatingEye.src = '/images/mobs/ff2_floating_eye.png';
        window.imgSwordRat = new Image();
        imgSwordRat.src = '/images/mobs/ff2_sword_rat.png';

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
}

asGameLoop.call(InitialFantasy.prototype);


function Graphics() {
    this.my_image = "hihi";
}

InitialFantasy.prototype.Graphics = new Graphics();






$(window).load(function() { // this waits for everything that happened in load() to ... load.
    debugMode = true;
    // NOTE: the game object *MUST* be named game thanks to onEachFrame
    // callbacks and lack of encapsulation at the moment...
    window.game = new InitialFantasy(debugMode);

    // this should say hi
    // alert(game.Graphics.my_image);

    game.start();
});
