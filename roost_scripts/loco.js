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
        },
  
        tick: function () { 
          
					// Sine bob test for our shuttle.
					this.i++;
					this.shu.y+=Math.sin(this.i)*4;
					
          // First, determine direction
          // from camera.
          let theta=this.cam.rotation.y;
          // NB these two reversed.
          let pitch=-this.cam.rotation.x;
					// Test for speed control.
					let ws=this.cam.rotation.z;
          if (ws > 0.2 && ws < 0.4){
						this.vel+=0.01;
					}
					else if (ws < -0.2 && ws > -0.4){
						this.vel*=0.5;
					}
					// Corner turn.
          if (ws > 0.4){
						this.cam.rotation.y+=0.01;
					}
					else if (ws < -0.4){
						this.cam.rotation.y-=0.01;
					}
					// Speed cap.
					const maxS=0.04;
					if (this.vel > maxS){
						this.vel = maxS;
					}
					
          let speed=-this.vel;
					// Friction.
					this.vel*=0.96;
         
          // Finally, move pos of rig.
          // NB move rig, not camera.
          this.rig.position.z += 
            Math.cos(theta)*speed;
          this.rig.position.x += 
            Math.sin(theta)*speed;
          this.rig.position.y += pitch*speed;

        }
      });