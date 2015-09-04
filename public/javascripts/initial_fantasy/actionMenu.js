// this is the "FIGHT" button, and it's housing
function ActionMenu() {
    this.pickingTarget = false;
    this.actionSelected = ""; // "fight", "magic"

    this.audMenuMove = new Howl({
        urls: ["/audio/misc/menu_move.ogg"],
        volume: 0.05
    });
}


ActionMenu.displayCommandList = function(heroes) {
    var bs = game.battleScreen;
    if (!bs.commandListShowing) { // get out now if we're already showing a command menu
        $.each(heroes, function(i, hero) {
            if (hero.stats.waitBar >= 100) {
                $('div#fight_button').slideDown();
                bs.commandListShowing = true;
            }
        });
    }
};


var battleAction = {
    fight: 1,
    magic: 2,
    defend: 3,
    row: 4
};

// This is fired when the user clicks the 'fight' button
// this method sets up the game state so you can now select a thing to fight.
// the word 'fight' will also pulsate...
ActionMenu.prototype.chooseAction = function(action) {
    this.audMenuMove.play();

    // let other methods know that the next click on a mob is FOR REALZORZ!
    this.pickingTarget = true;
    this.actionSelected = battleAction.fight;

    // initiate CSS animation
    element = document.getElementsByClassName(action)[0];
    element.className += " activated_picking";
};

ActionMenu.prototype.cancelAction = function(action) {
    this.pickingTarget = false;
    // dissable CSS animation
    elements = document.getElementsByClassName('activated_picking');
    for (var i = 0; i < elements.length; i++) {
        var ele = elements[i];
        ele.className = ele.className.replace(/activated_picking/g, '');
    }
};


ActionMenu.prototype.targetSelected = function(target) {
    // the unit that is performing the action on target
    var bs = game.battleScreen;
    var actor = bs.heroes[bs.heroQueue.first()];

    // begin cast time on "fight" Command...
    switch (this.actionSelected) {
        case battleAction.fight:
            this.performFight(actor, target);
            this.finishedSelecting(target);
            break;
    }

};

ActionMenu.prototype.performFight = function(actor, unit) {
    var bs = game.battleScreen;
    this.audMenuMove.play();

    // Initiate the fight delay timer???

    // Kill the mob / combat calculations
    unit.stats.hp -= 10;
    if (unit.stats.hp < 1) {
        unit.dead = true;
    }

    // Initiate the attack animation
    actor.animations.push(new ActionAnimation("fight"));
    actor.unitMoved = true;
    bs.aHeroHasMoved = true;

    // Initiate the mob's defend animation
    //target.annimations.push(new ActionAnimation("recieveFight"));

    // Initiate mob death animation
    unit.unitMoved = true;
};


ActionMenu.prototype.finishedSelecting = function(target) {
    this.cancelAction();
    this.commitAction();

    // hide the fight button...
    $('div#fight_button').slideUp();
    game.battleScreen.commandListShowing = false;
};

ActionMenu.prototype.commitAction = function(target) {
    var bs = game.battleScreen;
    var heroActor = bs.heroes[bs.heroQueue[0]];

    heroActor.resetWaitBar();
    // freeze Hero's waitBar
    heroActor.freezeWaitBar();
    // add animation to heros animation list

    bs.heroQueue.remove(0);
    heroActor.isSelected = false;
    heroActor.heroIsReady = false;
    heroActor.unitMoved = true;

    BattleScreen.selectNextHero();
};
