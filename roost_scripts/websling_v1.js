/*
websling 0.2
thurs 13/6/24
*/

AFRAME.registerComponent('web-sling', {
  init: function () {
    
    this.el.addEventListener('click', function (evt) {
      
			console.log(`${evt.target.id} was clicked at: `, evt.detail.intersection.point);
			
			// Experiment. Websling. Worked first time!?
			if (evt.detail.intersection.distance < 1000 &&
				 evt.target.id!='bigCap'){
			const myMe = document.querySelector('#subject');
			
			// Let's goooooo!
			myMe.setAttribute('locomotion','vel',12);
				
				const myTar = document.
			querySelector('#'+evt.target.id);
			
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
				
				this.sceneEl.appendChild(f);
				
				
			}
    });
  }
});