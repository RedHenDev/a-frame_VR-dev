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
/*
// *** yAnked for user interaction.
The user stores the name of an other
player's id.
When this changes, and the other user
detects that their id is stored by
an other user's yanked variable, then
the user's own code can 'yank' them.
The point of this is that we cannot
directly affect the movement of an
other user from afar. The 3D avatars that
correspond to their position etc. are not
the other users themselves.
*/
let yAnked = '';
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
			myPiglet.object3D.rotation.y += 0.2;
			}
			
			// Experiment. Websling. Worked first time!?
			if (evt.detail.intersection.distance < 2000 &&
				 evt.target.id!='bigCap'){
			const myMe = document.querySelector('#subject');
			
				const myTar = document.
			querySelector('#'+evt.target.id);
				console.log(myTar.id + ' yanked');
				// Changing yAnked like this will
				// get written to db.
				yAnked=myTar.id;
				let f = document.createElement('a-sphere');
				f.setAttribute('visible','');
				f.setAttribute('material','shader','flat');
				f.setAttribute('material','color','lime');
				f.setAttribute('material','transparent',true);
				f.setAttribute('material','opacity',0.6);
				f.object3D.scale.x=0.4;
				f.object3D.scale.y=0.4;
				f.object3D.scale.z=0.4;
				f.object3D.position.x=
					evt.detail.intersection.point.x;
				f.object3D.position.z=
					evt.detail.intersection.point.z;
				f.object3D.position.y=
					evt.detail.intersection.point.y;
				//f.object3D.rotation.y=Math.random()*360;
				this.sceneEl.appendChild(f);
				// This affects subject, not target, for
				// some reason?
				//myTar.setAttribute('locomotion','vel',-3);
				// This is temporary, not synced.
				//myTar.object3D.position.y += 10;
				//myMe.setAttribute('locomotion','vel',3);
			}
    });
  }
});