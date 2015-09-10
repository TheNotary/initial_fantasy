window.InitialFantasy.prototype.AnimationDefinitions = {

    HeroAttack: function(actor, target) {

        // Closures the actor and target (so they can be manipulated as needed)
        // takes in the time since the animation began and then goes through
        // the algorithm, making changes to actor and target
        var animationProcedure = function(timeSinceStart) {

            // step forward
            actor.x += -20;
            actor.unitMoved = true;
            game.battleScreen.aHeroHasMoved = true;

            console.log("animation update");


            // swing weapon

            // create new action for dealing swing damage to a mob
            // ... if the dmg has been returned from the server, then the
            // swingDamage animation for the mob will take place, followed by
            // the creation of a

            // step back

        };

        var onEnd = function() {
            console.log(actor.name + ' has finished attacking ' + target.name);
            actor.unfreezeWaitBar();
        };

        var config = {
            name:"HeroAttack",
            duration:40,
            animationProcedure:animationProcedure,
            onEnd:onEnd,
            actor: actor,
            target: target
        };

        return new ActionAnimation(config);
    },
    ReceiveDamage: function() {

    },
    MobDeath: function() {

    },

};
