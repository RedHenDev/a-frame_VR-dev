/* Custom A-Frame component
Fires a specified event on this entity on a regular timed interval */

AFRAME.registerComponent('log-position-data', {
        schema: {
          output: {type: 'selector'}
        },
        tick: function () {

          let dataString = "Cam Pos Data:\n"
          dataString += "Position: \n"
          dataString += `x: ${this.el.object3D.position.x.toFixed(2)}\n`
          dataString += `y: ${this.el.object3D.position.y.toFixed(2)}\n`
          dataString += `z: ${this.el.object3D.position.z.toFixed(2)}\n`

          dataString += "Orientation: \n"
          dataString += `x: ${this.el.object3D.rotation.x.toFixed(2)}\n`
          dataString += `y: ${this.el.object3D.rotation.y.toFixed(2)}\n`
          dataString += `z: ${this.el.object3D.rotation.z.toFixed(2)}\n`

          this.data.output.setAttribute("text", {value: dataString});
        }
      });

