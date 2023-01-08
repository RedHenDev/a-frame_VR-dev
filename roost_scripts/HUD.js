/* Custom A-Frame component
Fires a specified event on this entity on a regular timed interval */

AFRAME.registerComponent('hud-flip', {
	
				init: function(){
					this.cam=
					document.querySelector("#subject").object3D;
					console.log(this.cam.rotation.z);
					// First -- check orientation and
					// flip HUD by 180 accordingly.
					// We run the check after 20 seconds --
					// giving people time to put on viewer.
					
						if (this.cam.rotation.z < 2.9 &&
								this.cam.rotation.z > -2.9 &&
							  this.cam.rotation.z != 0){
							this.el.object3D.rotation.z = 3.14;
							this.el.object3D.position.x = -0.4;
							console.log('hud flipped');
						}
					
				}
});

// Need to refactor this global monstrosity!
let gName = 'NEMO';
AFRAME.registerComponent('log-position-data', {
	
				init: function(){
					//console.log('Hi dad');
				this.rig=
				document.querySelector("#rig").object3D;
				},
	
        schema: {
          output: {type: 'selector'}
        },
				
        tick: function () {

          let dataString = `${gName}\n`;
          dataString += "Position: \n";
          dataString += `x: ${this.rig.position.x.toFixed(2)}\n`
          dataString += `y: ${this.rig.position.y.toFixed(2)}\n`
          dataString += `z: ${this.rig.position.z.toFixed(2)}\n`

          dataString += "Orientation: \n"
          dataString += `x: ${this.el.object3D.rotation.x.toFixed(2)}\n`
          dataString += `y: ${this.el.object3D.rotation.y.toFixed(2)}\n`
          dataString += `z: ${this.el.object3D.rotation.z.toFixed(2)}\n`

          this.data.output.setAttribute("text", {value: dataString});
        }
      });

