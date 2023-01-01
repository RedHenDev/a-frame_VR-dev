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
        },
  
        tick: function () { 
          
          // First, determine direction
          // from camera.
          let theta=this.cam.rotation.y;
          // NB these two reversed.
          let pitch=-this.cam.rotation.x;
					// Test for speed control.
          if (this.cam.rotation.z > 0 &&
						  this.cam.rotation.z < 2.90)
						this.vel+=0.01;
					else if (	this.cam.rotation.z < 0 &&
						  			this.cam.rotation.z < -2.90)
						this.vel-=0.01;
          let speed=-this.vel; 
         
          // Finally, move pos of rig.
          // NB move rig, not camera.
          this.rig.position.z += 
            Math.cos(theta)*speed;
          this.rig.position.x += 
            Math.sin(theta)*speed;
          this.rig.position.y += pitch*speed;

        }
      });