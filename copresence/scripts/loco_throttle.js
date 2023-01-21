/* Custom A-Frame component
Jan 2023 - red_hen_dev

Locomotion component 'copresence' version
for use with firebase realtime db

*/

// Global variables used to communicate with firebase. 
let xSub=0.0;
let ySub=0.0;
let zSub=0.0;
let fSub; // Forward Direction.
let toggleAttempt=false;
// Rotations of camera.
let rxSub=0.0;
let rySub=0.0;
let rzSub=0.0;

AFRAME.registerComponent('locomotion', {
        init: function () {
          console.log(this.data);
					
          // Create refs here, which is
          // more performant than each
          // tick at runtime.
          this.rig =
          document.querySelector("#rig").object3D;
          this.cam =
      		document.querySelector("#subject").object3D;
          // Current speed.
					this.vel=0.01;
					this.currentVel=0.01;
					
					// Sync global positions.
					xSub = this.rig.position.x;
					ySub = this.rig.position.y;
					zSub = this.rig.position.z;
					
					rxSub = this.cam.rotation.x;
					rySub = this.cam.rotation.y;
					rzSub = this.cam.rotation.z;
					
					// Timing for toggling engine.
					this.timeStamp=Date.now();
					this.engineOn=false;
					// For sound of toggling.
					this.hark=document.querySelector("#hark");
					
					// Speed cap.
					this.maxS_orig=0.01;
					this.maxS=this.maxS_orig;
					
					// New toggling with keys...
					document.addEventListener('keydown', event => {
						if (event.key === 'ArrowUp' ||
						  event.key === 'w') {
						toggleAttempt=true;
						}
					});
					document.addEventListener('keypress', event => {
						if (event.key === 'ArrowLeft' ||
						  event.key === 'a') {
						this.maxS+=0.01;
						}
					});
					
        },
  
        tick: function (timeDelta) { 
					
					// Update cam orientation.
//					rxSub = this.cam.rotation.x;
//					rySub = this.cam.rotation.y;
//					rzSub = this.cam.rotation.z;
					
					// First, determine direction
          // from camera.
          let theta=this.cam.rotation.y;
          // NB these two reversed.
          let pitch=-this.cam.rotation.x;
					// Test for speed control.
					let ws=Math.abs(this.cam.rotation.z);
					const minZ=2.5;  // Default 0.2.
					const maxZ=2.75; // Default 0.4.
					const minZ2=0.2; // Default 0.2.
					const maxZ2=0.45;// Default 0.4.
					const acc=0.002; // Default 0.002.
					
					// Let's try a toggle.
          if ((ws > minZ && ws < maxZ) ||
							(ws > minZ2 && ws < maxZ2) ||
							toggleAttempt){
						// Log time stamp. This will be for
						// toggling via head z rotations.
						let cTime = Date.now();
						if (cTime-this.timeStamp > 1000){
							toggleAttempt=false;
							
							this.hark.components.sound.playSound();
							this.engineOn=!this.engineOn;
							this.timeStamp=Date.now();
							if (!this.engineOn){
								document.querySelector('#reticle').
								setAttribute('material','color:red');
								// Reset max speed.
								this.maxS=this.maxS_orig;
							}
							else {
								document.querySelector('#reticle').
								setAttribute('material','color:lime');
							}
						}
					}
					
					if (this.vel > this.maxS){
						this.vel = this.maxS;
					}
					// Engine.
					let speed=-this.vel;
					if (!this.engineOn) {
							// Apply friction.
							this.vel*=0.98;
//							if (this.vel < 0.001)
//								this.vel=0;
					}
					else{
						this.vel+=acc;
					}
					
          // Finally, move pos of rig.
          // NB move rig, not camera.
					// Note here we also update global values.
          zSub = this.rig.position.z += 
            Math.cos(theta)*speed;
          xSub = this.rig.position.x += 
            Math.sin(theta)*speed;
          ySub = this.rig.position.y += pitch*speed;
        }
      });