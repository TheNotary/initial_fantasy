/*  The SceneDirector handles switching between scenes.  It displays and hides the  appropriate cavas and div elements and also loads the appropriate cavases with   relevant data.    The data loaded depends on the specific scene description...  The scene  descriptions should be done in a light and breazy script language... then   converted to... json?  Maybe they should just be written in XML?  Before I get that far, I've gotta hard code a scene in js though.  I better   get to that now.    */function sceneDirector(){}sceneDirector.switchToScene = function(sceneName){  if (sceneName == "intro-on_air_ship"){ // Realistically, this would initial a                                          // download of a procedure... and that                                          // data would be passed to an                                          // interpretter...    // hide all canvases and UI elements    // and show the proper canvases in the callback    titleScreen.Hide(function(){            var mobs = new Array(); // make an array for all the monsters to be stored in      mobs[0] = new Mob(1, goblin, BattlePositions.position1);      //mobs[1] = new Mob(2, imgEagle, BattlePositions.position2);      mobs[1] = new Mob(1, goblin, BattlePositions.position2);      battleScreen.EnterBattle(imgBtlGrassyLake, mobs);          });                    // paint the sprites    // begin any background animations for this "locale/view" (eg clouds moving)    // play bgmusic    // begin any scripted animations for this scene (eg ppl moving)    //   }}