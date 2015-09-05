window.InitialFantasy.prototype.AnimationDefinitions = {

    HeroAttack: function(actor, target) {
        
        var animation = function() {
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
    }
};
