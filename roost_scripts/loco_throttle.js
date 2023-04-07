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
// Need to refactor this global solution.
let gName = 'NEMO';
let VRclone= false;
console.log('Throttle script init.')

// Collision detection testing...
AFRAME.registerComponent('collision-detector', {
  init: function () {
    let el = this.el;
		
    el.addEventListener('raycaster-intersection', function(evt)  {
      // Check if the ray has intersected with a collidable entity
			let dist=Math.abs(evt.detail.intersections[0].distance);
			
//      if (dist <=10) {
        console.log('Collided at ' + dist);
				document.querySelector('#rig').object3D.
				position.y += 50;
//      }
    });
  }
});

//******* EOF collision detec
  
AFRAME.registerComponent('locomotion', {
				schema: {
					maxSpeed: {type: 'number', default:0.1},
					acceleration: {type: 'number', default:0.01},
					engine:{type: 'boolean',default:false}
				},
	
        init: function () {
          //console.log(this.data);
					
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
					//***
					rxSub = this.cam.rotation.x;
					rySub = this.cam.rotation.y;
					rzSub = this.cam.rotation.z;
					
					// Timing for toggling engine.
					this.timeStamp=Date.now();
					//this.engineOn=false;
					// For sound of toggling.
					this.hark=document.querySelector("#hark");
					
					// Grab reticle.
					this.reticle=
						document.querySelector('#reticle')
					
					// Speed cap.
					//this.maxS_orig=0.01;
					this.maxS_orig=this.data.maxSpeed;
					this.maxS=this.maxS_orig;
					//this.acc=this.maxS*0.2;
					this.acc=this.data.acceleration;
					
					// New driving with keys...
					document.addEventListener('keydown', event => {
						
						if (event.key === 'ArrowUp' ||
						  event.key === 'w') {
							//this.engineOn=true;
							this.data.engine=true;
							this.maxS+=this.acc;
							this.update();
//							this.reticle.
//							setAttribute('material','color:lime');
						}
						else if (event.key === 'ArrowDown' ||
						  event.key === 's') {
							//this.engineOn=false;
							this.data.engine=false;
							// Reset max speed.
							this.maxS=this.maxS_orig;
							this.update();
//							this.reticle.
//							setAttribute('material','color:red');
						}
					});
					document.addEventListener('keyup', event => {
						if (event.key === 'ArrowUp' ||
						  event.key === 'w') {
							//toggleAttempt=true;
							//this.engineOn=false;
							this.data.engine=false;
							//this.update();
							this.reticle.
							setAttribute('material','color:red');
						}
					});
					
        },
  
	
				update: function(){
					if (this.data.engine){
						this.reticle.
							setAttribute('material','color:lime');
					}
					else{
						this.reticle.
							setAttribute('material','color:red');
						// And reset max speed.
						//this.maxS=this.maxS_orig;
					}
				},
	
        tick: function (timeDelta) { 
					// Do not interfere with cloned positioning.
					if (VRclone) return;
					
					//***
					// Update cam orientation.
					// NB these communicate with index.js firebase.
					rxSub = this.cam.rotation.x;
					rySub = this.cam.rotation.y;
					rzSub = this.cam.rotation.z;
					
					// First, determine direction
          // from camera.
          let theta=this.cam.rotation.y;
          // NB these two reversed.
          let pitch=-this.cam.rotation.x;
					// Test for speed control.
					let ws=(this.cam.rotation.z);
					//let ws=Math.abs(this.cam.rotation.z);
					const minZ=2.5;  // Default 0.2.
					const maxZ=2.75; // Default 0.4.
					const minZ2=0.2; // Default 0.2.
					const maxZ2=0.45;// Default 0.4.
					const acc=this.acc; // Default 0.002.
					//const acc=this.data.acceleration;
					
					// Throttle test. Negative.
					if ((ws < -minZ && ws > -maxZ) ||
							(ws < -minZ2 && ws > -maxZ2))
					{
							// Low number, since no
							// delay on how often this can happen.
							this.maxS+=0.004;
					}
					
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
							//this.engineOn=!this.engineOn;
							this.data.engine=!this.data.engine;
							// Update to sort reticle colour.
							this.update();
							this.timeStamp=Date.now();
							
						}
					}
					
					// Delimit max speed. 
					if (this.vel > this.maxS){
						this.vel = this.maxS;
					}
					// Engine.
					let speedNow=-this.vel;
					// default this.engineOn;
					if (!this.data.engine) {
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
            Math.cos(theta)*speedNow;
          xSub = this.rig.position.x += 
            Math.sin(theta)*speedNow;
          ySub = this.rig.position.y += 
						pitch*speedNow;
        }
      });