/*  The SceneDirector handles switching between scenes.  It displays and hides the  appropriate cavas and div elements and also loads the appropriate cavases with   relevant data.    The data loaded depends on the specific scene description...  The scene  descriptions should be done in a light and breazy script language... then   converted to... json?  Maybe they should just be written in XML?  Before I get that far, I've gotta hard code a scene in js though.  I better   get to that now.    */function sceneDirector(){}sceneDirector.switchToScene = function(sceneName){  if (sceneName == "intro-on_air_ship"){ // Realistically, this would initial a                                          // download of a procedure... and that                                          // data would be passed to an                                          // interpretter...    // hide all canvases and UI elements    // and show the proper canvases in the callback    titleScreen.Hide(function(){            var mobs = new Array(); // make an array for all the monsters to be stored in      //mobs[0] = new Mob(1, goblin, enemyPositions.position1);      airMobs = [new Mob(unitType.mob, 2, imgEagle, enemyPositions.position1, "flying"),              new Mob(unitType.mob, 2, imgEagle, enemyPositions.position2, "flying"),              new Mob(unitType.mob, 2, imgEagle, enemyPositions.position3, "flying")];            groundMobs = [new Mob(unitType.mob, 1, goblin, enemyPositions.position1),                    new Mob(unitType.mob, 1, goblin, enemyPositions.position2),                    new Mob(unitType.mob, 1, goblin, enemyPositions.position3)]      mobs = airMobs;      mobs = groundMobs;            var heroes = new Array();      heroes = [new Hero(unitType.hero, 1, imgCecil, partyPositions.row1Front),      new Hero(unitType.hero, 1, imgCecil, partyPositions.row2Front),      new Hero(unitType.hero, 1, imgCecil, partyPositions.row3Front),                new Hero(unitType.hero, 1, imgCecil, partyPositions.row4Front)];            battleScreen.EnterBattle(imgBtlGrassyLake, mobs, heroes);          });    // paint the sprites    // begin any background animations for this "locale/view" (eg clouds moving)    // play bgmusic    // begin any scripted animations for this scene (eg ppl moving)  }}