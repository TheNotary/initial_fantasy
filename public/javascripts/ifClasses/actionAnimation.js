function ActionAnimation(name){
  this.currentFrame = 0;     // I need to keep track of which frame we're on
  this.lastFrame = 50;       // I need to know which frame marks the end of our animation
  this.isAnimating = false;  // Set this to true so it's faster to check if we need to draw animations
  this.slowness = 4;         // how fast does it take to tick a frame...
  this.animationTarget;      // the mob that you're animating
  
  this.name = name;            // I guess I want to address the animation by name...
  this.id;                   // No, addressing things by name is silly...  Here's an ID
  
  
}


ActionAnimation.prototype.render = function(){
  alert('hi, here is a function where we will slowly modify the X and Y values of the owning mob...')\
  // but what if there are multiple animations on the mob at the same time...
  // Maybe there's some clean way to hanle this... by using the actionAnimation in the drawImage calculation for X,Y?...
  
  // Options:
  //
  // a)  Use ActionAnimation.X(currentFrame) in the drawphase to position the mob in accordance 
  //      with the animation being conducted.
  //      
  //      * 
  //
  // b)  Use the ActionAnimation object to overwrite the X and Y values of the mob directly, which would limit
  //      the number of animations which could be applied to each character to one (NOT FEASIBLE)
  //
  // 
}

// Animations:
/*
 * MonsterAttack
 * HeroAttack
 * HeroDefend??
 * HeroGettingpunched
 * HeroGettingSlashed
 * HeroCastingSpell
 * 
 * MonsterDeathDesintigration1
 * MonsterDeathExplotionMeltdown
 * MonsterDeathFade
 * MonsterDeath_slashInHalf
 * 
 * SpellFire
 * SpellIce
 * SpellDrain
 */

