function ActionAnimation(){
  this.currentFrame = 0;     // I need to keep track of which frame we're on
  this.lastFrame = 50;       // I need to know which frame marks the end of our animation
  this.isAnimating = false;  // Set this to true so it's faster to check if we need to draw animations
  this.slowness = 4;         // how fast does it take to tick a frame...
  this.animationTarget;      // the mob that you're animating
  
  this.name = "";            // I guess I want to address the animation by name...
  this.id;                   // No, addressing things by name is silly...  Here's an ID
  
  
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

