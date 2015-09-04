// NameSpace for globals
//
// Setup audio
// Setup/ define game loop
// Load sprites (mobs/ heroes/ bg images)
//
// Split into
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
    this.actionMenu = new ActionMenu();



    this.start = function() {
        addEventHandlersToDom();
        window.onEachFrame(game.main); // queue up the game loop
        this.titleScreen.begin();

        if (this.debugMode) debuggingFunctions();
    };





    //  *************** MAIN LOOP STUFF *******************

    var lastMainEndedAt = 0;

    var gameTime = 0.0;
    var gameFps = 0.0;
    var then = Date.now();

    var lastTick = 0; // the last time the game logic ticked was at...

    this.time = function() {
        return gameTime;
    };

    this.fps = function() {
        return gameFps;
    }

    this.main = function() {
        if (this.gameTime === undefined)
            this.gameTime = 0.0;

        // TODO:  make this a var explicitly, prolly won't hurt anything...
        timeBetweenCallingMain = Date.now() - lastMainEndedAt;

        var now = Date.now();
        var delta = now - then;

        // This is so wierd!  We need to refer to game time as it's global space...
        // so it's global name is game... thus game.gameTime... wow...
        // this is because main is a callback from requestAnimationFrame...
        gameTime = gameTime + delta / 1000;

        var skipTicks = 1000 / 30; // 30 fps
        var loops = 0;
        var maxFrameSkip = 3; // skip the draw phase up to 3 times in a row if CPU is lagging
        var nextGameTick = (new Date).getTime() + 1000;

        var tickInterval = 30; // 50ms

        while (itsTimeToDoAnotherTick(lastTick, tickInterval) && // UPDATE DATA ONLY WHEN IT'S APPROPRIATE
            weHaventBeenNeglectingTheDrawFunctionTooLong(loops, maxFrameSkip)
        ) {
            lastTick = Date.now();

            update(delta / 1000); // passes in a decimal representing the number of seconds since last hit method...

            loops++;
            if (loops > 1) {
                console.debug('CPU SLACK!    update() calls are taking too long to complete');
            }
        }

        draw(); // DRAW AS OFTEN AS YOU CAN

        gameFps = 1000 / delta;
        then = now;

        if (bankScore == "none yet" && game.time() > 10) {
            bankScore = avgFps;
            goldenScore = thisSpotWasRun;
        }
        lastMainEndedAt = Date.now();
    };

    // This function determines how frequently we perform the update() method in
    // the game loop.
    function itsTimeToDoAnotherTick(lastTick, tickInterval) {
        delta = Date.now() - lastTick;
        if (delta >= tickInterval * 4) {
            console.debug("we're an entire tick behind!  We probably aren't finishing drawing fast enough  " + delta + " / " + tickInterval + '   last draw t: ' + lastDrawTime);
            thisSpotWasRun++;
        }
        return delta >= tickInterval;
    }

    function weHaventBeenNeglectingTheDrawFunctionTooLong(loops, maxFrameSkip) {
        return loops < maxFrameSkip;
    }

    //
    // $(function() {
    //     window.onEachFrame(main);
    // });



    function draw() {
        switch (game.currentScreen) {
            case "title_screen": // never use render loop for title screen... unless I make it more interesting...
                break;
            case "battle_screen":
                game.battleScreen.renderBattleScene();
                break;
            case "town_screen":
                break;
            case "world_screen":
                break;
        }
    }

    function update(secondsPassed) {
        switch (game.currentScreen) {
            case "title_screen": // never use render loop for title screen... unless I make it more interesting...
                break;
            case "battle_screen":
                game.battleScreen.update(secondsPassed);
                break;
            case "town_screen":
                break;
            case "world_screen":
                break;
        }
    }


    var setupGameTimer = function() {
        var onEachFrame;
        if (window.requestAnimationFrame) {
            onEachFrame = function(cb) {
                var _cb = function() {
                    cb();
                    requestAnimationFrame(_cb);
                }
                _cb();
            };
        } else {
            onEachFrame = function(cb) {
                setInterval(cb, 1000 / 60);
            }
        }

        window.onEachFrame = onEachFrame; // this global can now be called and it will do the appropriate thing across browser
    };

    setupGameTimer();




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
