/* Custom A-Frame component
Fires a specified event on this entity on a regular timed interval */

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

          let dataString = "new boost:\n";
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

