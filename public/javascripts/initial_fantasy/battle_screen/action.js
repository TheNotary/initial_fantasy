// Actions are created when a unit chooses to 'fight' or when a mob casts a
// spell on a target.
// They have associated animations.
// What do actions belong to?
// Units I guess...
// so that means unit.animations is removed in favor of unit.getAnimations()
// which looks up unit.actions...
// hmmm... is that correct?



/*
 *
 * Action
 *

*/

// Actions can be started on the client and told to the server, but
// the server can also send actions down, like when mobs attack...
// I'm going to need to look into websockets pretty soon...
window.InitialFantasy.prototype.Action = function(options) {
    this.id = options.id
    this.beginsOn = options.beginsOn;  // when the action starts
    this.animation = options.animation;
    this.actor = options.actor;
    this.target = options.target;
    this._delete = false;

    this.delete = function() {
        this._delete = true;
    }



};
