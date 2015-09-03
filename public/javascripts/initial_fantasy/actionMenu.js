function ActionMenu() {
    this.pickingTarget = false;
    this.actionSelected = ""; // "fight", "magic"
}


battleAction = {
    fight: 1,
    magic: 2,
    defend: 3,
    row: 4
}


ActionMenu.prototype.fight = function(ele) {
    audMenuMove.play();

    // let other methods know that the next click on a mob is FOR REALZORZ!
    this.pickingTarget = true;
    this.actionSelected = battleAction.fight;

    // initiate CSS animation
    element = document.getElementsByClassName(ele)[0];
    element.className += " activated_picking";
}

ActionMenu.prototype.targetSelected = function(target) {
    //console.debug("PEWPEWPEW");

    // begin cast time on "fight" Command...
    switch (this.actionSelected) {
        case battleAction.fight:
            ActionMenu.performFight(target);
            this.finishedSelecting(target);
            break;
    }

}

ActionMenu.performFight = function(unit) {
    var bs = game.battleScreen;
    audMenuMove.play();

    // Initiate the fight delay timer???

    // Kill the mob / combat calculations
    unit.stats.hp -= 10;
    if (unit.stats.hp < 1) {
        unit.dead = true;
    }



    // Initiate the attack animation
    bs.heroes[0].currentAnimation = new ActionAnimation("fight");
    bs.heroes[0].unitMoved = true;
    bs.aHeroHasMoved = true;

    // Initiate the mob's defend animation
    //bs.mobs[0].currentAnimation = new ActionAnimation("recieveFight");



    // Initiate mob death animation
    unit.unitMoved = true;

}


var glob;
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
}


BattleScreen.selectNextHero = function() {
    var bs = game.battleScreen;

    if (bs.heroQueue.length != 0) {
        var hero = bs.heroes[bs.heroQueue[0]];
        hero.isSelected = true;
        hero.heroIsReady = true;
        console.debug('next hero up: ' + hero.name);
    }

}
