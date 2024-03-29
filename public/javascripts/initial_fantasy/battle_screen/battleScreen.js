function BattleScreen(canvasId, sound, menuId) {
    Screen.call(this, canvasId, sound, menuId);
    this.background;
    this.mobs = [];
    this.heroes = [];
    this.timeElapsed = 0.0;
    this.battleStartedAt = 0;
    this.introFinished = false;

    this.aMobHasMoved = true;
    this.aHeroHasMoved = true;

    this.actionMenu = new ActionMenu();

    this.__defineGetter__("aHeroIsReady", function() {
        return !this.heroQueue.isEmpty();
    });

    this._heroQueue = []; // int IDs... first on last off

    this.__defineGetter__("heroQueue", function() {
        return this._heroQueue;
    });
    this.__defineSetter__("heroQueue", function(val) {
        alert('pop');
        this._heroQueue = val;
    });

    this.commandListShowing = false;
}



BattleScreen.prototype = new Screen();

BattleScreen.prototype.handleKeys = function(evt) {
    var key = evt.keyCode;

    switch (key){
        case 13:
        alert('hey, you did something on the battle screen.');
        break;
        case 27:
        this.actionMenu.cancelAction();
        break;
    }
};





// This function handles hiding the UI for battle screen,
// and contains a callback for loading what ever is loaded next
BattleScreen.prototype.Hide = function(callbackFunc) {
    $('div#battle_menu').fadeOut();
    $('#battle_screen').fadeOut(function() {
        callbackFunc.call();
    });
};




BattleScreen.prototype.EnterBattle = function(background, theseMobs, heroes, music) {
    this.playBattleTransitionSound();
    this.doBattleTransitionEffect();
    //wait for transition to complete...
    this.startBattleMusic(music);

    this.mobs = theseMobs;
    if (heroes != undefined) {
        this.heroes = heroes;
    }
    this.initializeHeroes();
    this.background = background;
    this.battleStartedAt = game.time();
    this.staggerTheirHovers();
    this.sortMobsByHeight();

    this.paintBackground(background);


    // display the UI for the battle
    this.displayUI();

    // Draw heroes running in...
    $.each(this.mobs, function(i, mob) {
        mob.setPositionOffscreen();
    });
};

BattleScreen.prototype.initializeHeroes = function() {
    var heroes = this.heroes;
    for (var i = 0; i < heroes.length; i++) {
        var hero = heroes[i];
        if (hero.id == 0) {
            hero.stats.waitBar = 90;
        }
    }
};


BattleScreen.selectNextHero = function() {
    var bs = game.battleScreen;

    if (bs.heroQueue.length != 0) {
        var hero = bs.heroes[bs.heroQueue[0]];
        hero.isSelected = true;
        hero.heroIsReady = true;
        console.debug('next hero up: ' + hero.name);
    }
};


// make it so the hover effect is staggered
BattleScreen.prototype.staggerTheirHovers = function() {
    var staggerI = 0;
    var hoverStates = shuffleArray([0, 1, 2, 3]);

    $.each(this.mobs, function(i, mob) {
        if (mob.stance == "flying") {
            mob.setY(mob.position[1] + hoverStates[i]); // (staggerI % mob.apex)
            staggerI++;
        }
    });
};


// we need a function like this to know which mob should be drawn ontop of whitch mob in the event of an overlap.
// this comes in when they're hovering especially... it was a workaround for overclearing...
BattleScreen.prototype.sortMobsByHeight = function() {

    var unsorted = true;
    while (unsorted) {

        var complete = true;
        for (var i = 0; i < this.mobs.length - 1; i++) {
            var currentMob = this.mobs[i];
            var nextMob = this.mobs[i + 1];
            var swap = false;

            if (currentMob.position[1] > nextMob.position[1]) {
                swap = true;
            }

            if (swap) {
                this.mobs[i] = nextMob
                this.mobs[i + 1] = currentMob
                complete = false
            }

            if (complete) {
                unsorted = false;
            }
        }

    }
};





BattleScreen.prototype.displayUI = function() {
    $('#battle_background').show();
    $('#battle_screen').show();
    $('div#battle_menu').show();
    game.currentScreen = "battle_screen";

    BattleScreen.setupHeroUI(this.heroes);
    BattleScreen.setupMobUI(this.mobs);
};

BattleScreen.setupHeroUI = function(heroes) {
    $.each(heroes, function(i, hero) {
        var name = hero.name;
        var row = i;
        var currentHp = hero.stats.hp;
        var maxHp = hero.stats.maxHp;
        var currentMp = hero.stats.mp;
        var maxMp = hero.stats.maxMp;
        var waitBar = hero.stats.waitBar;

        var nameEle = $('#charRow_' + i + ' .name'); // hero.htmlElements.name;   // I can't use this, yet... Have to figure out changing formation
        nameEle.html(name);
        var currentHpEle = $('#charRow_' + i + ' .current_hp');
        currentHpEle.html(currentHp);
        var maxHpEle = $('#charRow_' + i + ' .max_hp');
        maxHpEle.html(maxHp);
        var currentMpEle = $('#charRow_' + i + ' .current_mp');
        currentMpEle.html(currentMp);
        //var waitBarContext = $('#charRow_'+ i +' .time .wait_bar')[0].getContext("2d");
        var waitBarContext = hero.htmlElements.waitBar;
        waitBarContext.fillStyle = "white";
        waitBarContext.fillRect(0, 0, waitBar, 10);
    });
};


BattleScreen.setupMobUI = function(mobs) {
    $('#mob_list').html(''); // clear the mob list

    $.each(mobs, function(i, mob) {
        var name = mob.name;
        var hp = mob.stats.hp;

        $('#mob_list').append('<li>' + name + '</li>');

        var nameEle = $('#charRow_' + i + ' .name');
    });
};


//BattleScreen.mobs = function(){}
// 1)  Image data
// 2)  ID
// 3)  Name
// 4)  Combat stats
var offsetForSlideIn;

BattleScreen.prototype.render = function() {

    if (this.aHeroHasMoved) {
        this.clearMovedHeroes();
        $.each(this.heroes, function(i, hero) {
            hero.drawUnit();
        });
        this.aHeroHasMoved = false;
    }


    // for each mob in mobs...
    if (this.aMobHasMoved) {
        this.clearMovedMobs();
        $.each(this.mobs, function(i, mob) {
            if (!mob.dead) {
                mob.drawUnit();
            }
        });
        this.aMobHasMoved = false;
    }

    this.drawWaitBars();

    // Active Animations
    this.renderAnimations();

    if (game.debugMode) drawGraphicsDebugInfo(this); // draws black debug box
};

// I'm using .render() when the function is performing math to figure out what to
// draw, and .draw() when simply drawing to the screen
// That is to say, render involves steps that might be considered an 'update' but
// didn't go there because that would create insanity.
BattleScreen.prototype.renderAnimations = function() {



    // iterate over all mobs and all heros and call the #render method
    // on each of their animations

    this.heroes.forEach(function(unit) {
        unit.renderAnimations();


    });

};




BattleScreen.inversionEffect_invertColorsOfHero = function(heroes, context) {
    var tickCount = game.tickCount;
    if (tickCount % 16 == 0) {
        for (var j = 0; j < heroes.length; j++) {
            //if (j > 0) continue;
            if (lastRunsTick === tickCount) {
                break;
            } // for somereason it can run the loop twice on the same tickCount...
            // I think 'tickCount' is incremented on the update loop, but we're calling this in the draw loop... sometimes before update has a chance to incriment again
            hero = heroes[j];
            if (hero.isSelected) {
                //alert(j);

                var imgd = context.getImageData(hero.x, hero.y - hero.height, hero.width, hero.height);
                var pix = imgd.data;

                // Loop over each pixel and invert the color.
                for (var i = 0, n = pix.length; i < n; i += 4) {
                    pix[i] = 255 - pix[i]; // red
                    pix[i + 1] = 255 - pix[i + 1]; // green
                    pix[i + 2] = 255 - pix[i + 2]; // blue
                    // i+3 is alpha (the fourth element)
                }

                // Draw the ImageData at the given (x,y) coordinates.
                context.putImageData(imgd, hero.x, hero.y - hero.height);
                lastRunsTick = tickCount;
            }
        }
    }
};



BattleScreen.prototype.drawWaitBars = function() {
    var tickCount = game.tickCount;
    if (tickCount % 8 != 1)
        return;

    var heroes = this.heroes;
    var l = heroes.length;
    for (var i = 0; i < l; i++) {
        var hero = heroes[i];
        hero.drawWaitBar();
    }
};

BattleScreen.prototype.clearMovedHeroes = function() {
    $.each(this.heroes, function(i, mob) {
        if (mob.unitMoved) {
            mob.clearFromScreen();
        }
    });
};

BattleScreen.prototype.clearMovedMobs = function() {
    if (this.aMobHasMoved) {
        $.each(this.mobs, function(i, mob) {
            if (mob.unitMoved) {
                mob.clearFromScreen();
            }
        });
    }
};


BattleScreen.prototype.update = function(secondsPassed) {
    this.timeElapsed = game.time() - this.battleStartedAt;

    this.updateAnimations();

    this.updateWaitBars();

    if (this.aHeroIsReady && !this.commandListShowing)
        ActionMenu.displayCommandList(this.heroes);

};

BattleScreen.prototype.updateAnimations = function() {
    if (this.aHeroIsReady)
        Unit.herosTurnEffect_flashingOutline(this.heroes, this.context);

    this.RushInEffect_allAtOnce();
    this.HoverEffect_simpleBird();

    this.updateUnitAnimations();
};

BattleScreen.prototype.updateUnitAnimations = function() {

    // update unit animations

    this.heroes.forEach(function(unit) {
        var animations = unit.animations;
        var l = animations.length;
        for (var i = 0; i < l; i++) {
            var a = animations[i];
            a.update();
            // Remove the animation if it's set for deletion, adjust i
            if (a._delete){
                animations.splice(i, 1);
                l = animations.length;
                if ( (l-1) > i ) i--;
            }
        }
    });

};


// an effect that occurs in the first few seconds of the battle
// where the mobs rush into the battle field all at once...
BattleScreen.prototype.RushInEffect_allAtOnce = function() {
    var speed = 45;

    if (this.mobs[0].x < this.mobs[0].position[0]) {
        if (this.mobs[0].x + speed > this.mobs[0].position[0]) {
            $.each(this.mobs, function(i, mob) {
                mob.setX(mob.position[0]);
            });
        } else {
            $.each(this.mobs, function(i, mob) {
                mob.setX(mob.x + speed);
            });
        }
    } else if (!this.introFinished) {
        $.each(this.mobs, function(i, mob) {
            mob.setX(mob.position[0]);
        });
        this.introFinished = true;
    }
};


// hovering effect for birds and stuff...
// Changes the unit's X, Y value
BattleScreen.prototype.HoverEffect_simpleBird = function() {
    var tickCount = game.tickCount;
    var step = 1;
    var slowness = 4;

    if (this.introFinished) {
        if (tickCount % slowness == 1) { // don't run this every time, just everyonce in a while

            $.each(this.mobs, function(i, mob) {
                if (mob.stance == "flying") {

                    var isGoingUp = mob.speedY >= 0; // check if the mob is going up or going down.  We use this condition later
                    var isGoingDown = mob.speedY < 0;

                    if (isGoingUp) { // if the mob is headed upwards...
                        mob.setY(mob.y + step); // move the mob up one step
                        if (mob.y >= mob.apex + mob.position[1]) { // if the mob has reached it's max height, flip the mob to be going down
                            mob.speedY = -1;
                        }
                    } else if (isGoingDown) { // if the mob is on it's way down...
                        mob.setY(mob.y - step);
                        if (mob.y <= mob.nadir + mob.position[1]) { // if the mob has reached it's min height, flip the mob to be going up
                            mob.speedY = 1;
                        }
                    }

                }
            });


        }
    }
};



BattleScreen.prototype.updateWaitBars = function() {
    var tickCount = game.tickCount;
    var heroes = this.heroes;
    var unitSpeed = 2;

    if (tickCount % 4 == 1) {
        for (var i = 0; i < heroes.length; i++) {
            hero = heroes[i];
            if (hero.stats.waitBarFrozen)
                continue;

            if (hero.stats.waitBar < 100) {
                hero.stats.waitBar = hero.stats.waitBar + unitSpeed;
            }
            else {
                if (game.battleScreen.heroQueue.isEmpty()) { // if this is the first hero becoming ready...  ()!battleScreen.aHeroIsReady && !hero.heroIsReady)
                    hero.heroIsReady = true;
                    hero.isSelected = true;
                    game.battleScreen.heroQueue.push(i);
                }
                else if (!hero.heroIsReady) {
                    //battleScreen.aHeroIsReady = true;  // make sure we set this variable in the update loop too
                    hero.heroIsReady = true;
                    game.battleScreen.heroQueue.push(i);
                }
            }

        }
    }
};








BattleScreen.prototype.playBattleTransitionSound = function() {};
BattleScreen.prototype.doBattleTransitionEffect = function() {};

BattleScreen.prototype.startBattleMusic = function() {
    this.bgMusic.play();
};


BattleScreen.prototype.paintBackground = function(background) {
    if (background == undefined) {
        background = this.background;
    }

    var width = background.width; //this.context.canvas.width;
    var height = background.height; //this.context.canvas.height;

    var btlbg = document.getElementById('battle_background').getContext('2d');
    btlbg.drawImage(background,
        0, 0,
        width,
        height);
};
