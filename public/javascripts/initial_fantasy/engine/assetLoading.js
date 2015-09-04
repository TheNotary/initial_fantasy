window.InitialFantasy.prototype.Graphics = function() {
    this.my_image = "hihi";

    this.imageHash = {};

    this.loadBaseImages = function() {
        var coreImages = [ "imgflightShadow0", "imgflightShadow1", "imgflightShadow2", "imgflightShadow3" ];
        var mobsForCurrentRegion = [ "floating_eye", "eagle", "sword_rat", "goblin" ];

        var listOfImagesThisUserHasEncountered = [ "imgCecil", "imgKain", "imgRosa", "imgKabul" ];  // rails should serve this

        this.loadImageSet('mobs', mobsForCurrentRegion);
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
};

window.InitialFantasy.prototype.Sound = function() {
    
};
