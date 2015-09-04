window.InitialFantasy.prototype.Graphics = function() {
    this.imageHash = {};

    this.loadBaseImages = function() {
        // var coreImages = [ "imgflightShadow0", "imgflightShadow1", "imgflightShadow2", "imgflightShadow3" ];
        var heroesInArea = [ "cecil", "kain", "rosa", "kabul" ];  // rails should serve this
        var mobsForCurrentRegion = [ "floating_eye", "eagle", "sword_rat", "goblin" ];
        var backgroundsForCurrentRegion = [ "grass_normal" ];
        var shadowImages = [ "flightShadow0", "flightShadow1", "flightShadow2", "flightShadow3" ];

        this.loadImageSet('heroes', heroesInArea);
        this.loadImageSet('mobs', mobsForCurrentRegion);
        this.loadImageSet('battle_bgs', backgroundsForCurrentRegion);
        this.loadImageSet('effects', shadowImages);
    };

    // Load all the images (performs download)
    // setClass: folder within /images where files are stored
    // setOfNames:  the file names which should be downloaded from the setClass folder
    // eg loadImageSet('mobs', ['sword_rat']);
    this.loadImageSet = function(setClass, setOfNames) {
        for (var i = 0; i < setOfNames.length; i++) {
            var imgString = setOfNames[i];

            var img  = new Image();
            img.src = '/images/' + setClass + '/' + imgString + '.png';

            this.imageHash[setClass] = this.imageHash[setClass] || {};
            this.imageHash[setClass][imgString] = img;
        }
    };

    // made this special function... hmm
    this.getShadowImages = function() {
        var h = this.imageHash.effects;
        return [ h.flightShadow0, h.flightShadow0, h.flightShadow0, h.flightShadow0 ];
    };



};

window.InitialFantasy.prototype.Sound = function() {

};
