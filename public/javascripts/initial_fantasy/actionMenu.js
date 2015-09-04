function ActionMenu() {
    this.pickingTarget = false;
    this.actionSelected = ""; // "fight", "magic"

    this.audMenuMove = new Howl({
        urls: ["/audio/misc/menu_move.ogg"],
        volume: 0.05
    });
}


battleAction = {
    fight: 1,
    magic: 2,
    defend: 3,
    row: 4
};


ActionMenu.prototype.fight = function(ele) {
    this.audMenuMove.play();

    // let other methods know that the next click on a mob is FOR REALZORZ!
    this.pickingTarget = true;
    this.actionSelected = battleAction.fight;

    // initiate CSS animation
    element = document.getElementsByClassName(ele)[0];
    element.className += " activated_picking";
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
    var bs = game.battleScreen;
    var heroActor = bs.heroes[bs.heroQueue[0]];

    this.pickingTarget = false;
    heroActor.isSelected = false;
    heroActor.heroIsReady = false;
    heroActor.unitMoved = true;

    heroActor.resetWaitBar();

    bs.heroQueue.remove(0);

    BattleScreen.selectNextHero();


    // dissable CSS animation
    element = document.getElementsByClassName('activated_picking')[0];
    element.className = element.className.replace(/activated_picking/g, '');

    // hide the fight button...
    $('div#fight_button').slideUp();
    bs.commandListShowing = false;
};
