/* Custom A-Frame component
Fires a specified event on this entity on a regular timed interval */
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
					
					this.shu=document.
						querySelector("#shuttle").object3D;
					this.i=0;
					
					// Timing for toggling engine.
					this.timeStamp=0;
					this.engineOn=false;
        },
  
        tick: function (timeDelta) { 
          
					// Sine bob test for our shuttle.
					// Not yet working...
					// OK working, forgot to add position to shu!
					this.i++;
					//console.log(this.i);
					this.shu.position.y=Math.sin(this.i*0.01)*2+4;
					this.shu.rotation.y=Math.sin(this.i*0.01)*6;
          // First, determine direction
          // from camera.
          let theta=this.cam.rotation.y;
          // NB these two reversed.
          let pitch=-this.cam.rotation.x;
					// Test for speed control.
					let ws=Math.abs(this.cam.rotation.z);
					const minZ=2.7; // Default 0.2.
					const maxZ=2.9; // Default 0.4.
					const acc=0.002;
					// Let's try a toggle.
          if (ws > minZ && ws < maxZ){
						//this.vel+=acc;
						
						// Log time stame. This will be for
						// toggling via head z rotations.
						let cTime = +new Date();
						if (cTime-this.timeStamp < 1000)
							break;
						this.engineOn=!this.engineOn;
						this.timeStamp= +new Date();
					}
					if (this.engineOn) this.vel=0.01;
//					else if (ws < minZ || ws > maxZ){
//						this.vel*=0.5;
//					}
					// Speed cap.
					const maxS=0.05;
					if (this.vel > maxS){
						this.vel = maxS;
					}
          let speed=-this.vel;
					// Friction.
					this.vel*=0.94;
         	this.timeStamp= +new Date();
          // Finally, move pos of rig.
          // NB move rig, not camera.
          this.rig.position.z += 
            Math.cos(theta)*speed;
          this.rig.position.x += 
            Math.sin(theta)*speed;
          this.rig.position.y += pitch*speed;

        }
      });