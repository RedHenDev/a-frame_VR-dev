/*
let mySphere = document.querySelector("#mySphere");
let myPig = document.querySelector("#testPig");

mySphere.addEventListener("mouseenter", e => {
  mySphere.setAttribute("color", "purple")
 	mySphere.object3D.position.y += 1;
});

myPig.addEventListener("mouseleave", e => {
  myPig.setAttribute("color", "yellow")
 	myPig.object3D.position.z += 1;
});
*/

// Component to change to a sequential color on fuse
// (click).
AFRAME.registerComponent('fuse-listener', {
  init: function () {
    var lastIndex = -1;
    var COLORS = ['red', 'green', 'blue'];
    this.el.addEventListener('click', function (evt) {
      lastIndex = (lastIndex + 1) % COLORS.length;
      this.setAttribute('material', 'color', COLORS[lastIndex]);
      console.log('I was clicked at: ', evt.detail.intersection.point);
    });
  }
});