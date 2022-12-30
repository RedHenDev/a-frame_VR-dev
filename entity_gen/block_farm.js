AFRAME.registerComponent('farm',{
	init: function(){
		// Create a few cubes.
		let sceneEl = document.querySelector('a-scene');
		
		for (let i=0;i<1000;i++){
			let e = document.createElement('a-box');
			e.object3D.position.x=Math.random()*100-50;
			e.object3D.position.y=Math.random()*100-50;
			e.object3D.position.z=Math.random()*100-50;
			e.object3D.scale.y=Math.random()*3;
			// Our newborn entity won't init until
			// being appended to scene.
			sceneEl.appendChild(e);
		}
	}
	
});