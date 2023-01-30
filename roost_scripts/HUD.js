/* Custom A-Frame component
Fires a specified event on this entity on a regular timed interval */

//AFRAME.registerComponent('hud-flip', {
//	
//				init: function(){
//					this.cam=
//					document.querySelector("#subject").object3D;
//					//console.log(this.cam.rotation.z);
//					// First -- check orientation and
//					// flip HUD by 180 accordingly.
//					// We run the check after 20 seconds --
//					// giving people time to put on viewer.	
//				}
//});

let flipped=false;
function checkFlip(){
	
	let cam=
					document.querySelector("#subject").object3D;
	let hudd=
					document.querySelector("#hud");
	if (cam.rotation.z < 2.9 &&
								cam.rotation.z > -2.9 &&
							  cam.rotation.z != 0){
							hudd.setAttribute('rotation', '0 0 -180');
							hudd.setAttribute('position' , '-0.4 0 -0.9');
							console.log('hud flipped');
		flipped=true;
						}
}


AFRAME.registerComponent('log-position-data', {
	
				init: function(){
				
				// Time stamp for flip check.
				this.saTime = Date.now();
					//console.log('Hi dad');
				this.rig=
				document.querySelector("#rig").object3D;
				},
	
        schema: {
          output: {type: 'selector'}
        },
				
        tick: function () {

//					if (!flipped && Date.now()-this.saTime < 10000)
//						checkFlip();
					
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

