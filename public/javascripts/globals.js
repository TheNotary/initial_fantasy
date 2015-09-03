// This file just has misc re-usable functions and junk
// It's a good place to drop functions, objects as you develop them

var tickCount = 0;

// This seems to be a hack to prevent certain draw/ update methods from being called
// twice on the same tick...  very hackish and ugly...
var lastRunsTick = 0;


var user = {
    email: "a@b",
    display_name: "Notary",

    game_data: {
        game_slot:  1,
        play_time: 60, // 1 minute
        completion: 0.10,

        heros: [
            { id: 1, name: "Cecil", sprite_sheet:  '/images/heroes/ff2_cecil.png' },
            { id: 2, name: "Kain", sprite_sheet:  '/images/heroes/ff2_kain.png' },
            { id: 3, name: "Rosa", sprite_sheet:  '/images/heroes/ff2_rosa.png' },
            { id: 4, name: "Kabul", sprite_sheet:  '/images/heroes/ff2_kabul.png' }
        ],

        party_data: {
            location: {
                dungeon_name: "overworld",
                map_id: 0,
                x: 0,
                y: 0
            },
            combat_setup: {
                hero_slots: [
                    { hero_id: 1, row: 0, col: "front" },
                    { hero_id: 2, row: 1, col: "front" },
                    { hero_id: 3, row: 2, col: "front" },
                    { hero_id: 4, row: 3, col: "front" }
                ]
            }


        },
    }
}






// this is needed to stop canvas from being lame when tapping it on smart phones
function blockCanvasDefaultAction() {
    // $('canvas').each(function(){
    // this.addEventListener("click", "event.preventDefault()", false);
    // });
    //event.preventDefault()

}


// enable styling of things which I disable their android orange box for...  doesn't work...
//document.addEventListener("touchstart", function(){}, true);



//+ Jonas Raoni Soares Silva
// this code is for shuffling array contents                 //@ http://jsfromhell.com/array/shuffle [v1.0]
shuffleArray = function(o) { //v1.0
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


// input (5,2) output "05"...   (5,3) -> "005"
function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}




// Browser shimming below...

// this code adds a delete method to arrays
Array.prototype.remove = function(f) {
    var r = this.slice(f + 1 || this.length);
    this.length = f < 0 ? this.length + f : f;
    this.push.apply(this, r);
    return this;
};

Array.prototype.isEmpty = function() {
    return this.length == 0 ? true : false;
}

Array.prototype.first = function() {
    return this[0];
}
