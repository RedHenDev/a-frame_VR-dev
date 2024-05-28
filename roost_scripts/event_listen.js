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
    let lastIndex = -1;
    const COLORS = ['red', 'green', 'blue'];
    this.el.addEventListener('click', function (evt) {
      lastIndex = (lastIndex + 1) % COLORS.length;
      this.setAttribute('material', 'color', COLORS[lastIndex]);
			console.log(`${evt.target.id} was clicked at: `, evt.detail.intersection.point);
			
			// Testing for j-realm.
			const myPiglet = document.querySelector('#bigCap');
			if (myPiglet != null && 
					evt.target.id == myPiglet.id){
			myPiglet.object3D.position.y -= 10;
			}
			
			// Experiment. Websling. Worked first time!?
			if (evt.detail.intersection.distance < 500 &&
				 evt.target.id!='bigCap'){
			const myMe = document.querySelector('#subject');
			myMe.setAttribute('locomotion','vel',3);
			}
    });
  }
});