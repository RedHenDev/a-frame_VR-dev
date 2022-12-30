/* Custom A-Frame component
Fires a specified event on this entity on a regular timed interval */

AFRAME.registerComponent('locomotion', {
        init: function () {
          console.log(this.data);
        },
  
        tick: function () {
          
          let theta=document.querySelector("#rig").object3D.rotation.y;
          
          let pitch=-document.querySelector("#rig").object3D.rotation.x;
          
          //console.log('brrr');
          let speed=-0.01; 
          
          // Eureka! 
          // NB removed += to prevent 
          // acceleration here.
          
          yPos = pitch*speed;  
          zPos = Math.cos(theta)*speed;
          xPos = Math.sin(theta)*speed;
          var els = document.querySelectorAll('.clickable');
for (var i = 0; i < els.length; i++) {
  let cpx = els[i].object3D.position.x;
  let cpy = els[i].object3D.position.y;
  let cpz = els[i].object3D.position.z;
  els[i].setAttribute("position", {
      x: cpx - xPos,
      y: cpy - yPos,
      z: cpz - zPos
    });
}

        }
      });

