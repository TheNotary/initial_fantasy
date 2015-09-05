window.InitialFantasy.prototype.AnimationDefinitions = {

    HeroAttack: function(actor, target) {

        var animation = function() {

            // step forward

            // swing weapon

            // create new action for dealing swing damage to a mob
            // ... if the dmg has been returned from the server, then the
            // swingDamage animation for the mob will take place, followed by
            // the creation of a

            // step back

            actor.stepForward(function(actor) {
                var dmgDealt = actor.swingWeapon(target, function(actor) {
                    actor.stepBack(function() {
                        // kill mob if needed after stepback complete
                    });
                });
            });
        };

        var onEnd = function() {
            console.log(actor.name + ' has finished attacking ' + target.name);
            actor.unfreezeWaitBar();
        };

        return new ActionAnimation("HeroAttack", 40, onEnd);
    },
    ReceiveDamage: function() {

    },
    MobDeath: function() {

    },

};
