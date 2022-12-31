AFRAME.registerComponent('farm',{
	init: function(){
		// Create a few cubes.
		this.sceneEl = document.querySelector('a-scene');
		
		const gradientResolution = 16;

		for (let y = 0; y < 32; y++) {
			let row = '';
			for (let x = 0; x < 32; x++) {
				const noise = perlin(x / 8, y / 8);
				row += noise > 0 ? '#' : ' ';
			}
		console.log(row);
	}
		
		for (let i=0;i<1000;i++){
			let e = document.createElement('a-box');
			
			e.object3D.position.x=Math.random()*100-50;
			//e.object3D.position.y=Math.random()*100-50;
			e.object3D.position.z=Math.random()*100-50;
			e.object3D.scale.y=Math.random()*3;
			e.setAttribute('material', 'src:#imgJojo2');
			// Our newborn entity won't init until
			// being appended to scene.
			this.sceneEl.appendChild(e);
		}
	}
	
});