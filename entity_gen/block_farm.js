AFRAME.registerComponent('farm',{
	init: function(){
		// Create a few cubes.
		this.sceneEl = document.querySelector('a-scene');
		
		//const gradientResolution = 16;
		// GPT's cute test of its perlin algorithm.
//		for (let y = 0; y < 32; y++) {
//			let row = '';
//			for (let x = 0; x < 32; x++) {
//				let noise = perlin(x / 8, y / 8);
//				row += noise > 0 ? '#' : ' ';
//			}
//		console.log(row);
	//}
		const bScale=2;
		const cols=12;
		const rows=12;
		const freq=64;
		const amp=1*bScale;
		for (let i=0;i<cols;i++){
			for (let j=0;j<rows;j++){
				let e = document.createElement('a-box');
				e.object3D.scale.x=bScale;
				e.object3D.scale.y=bScale;
				e.object3D.scale.z=bScale;
				e.object3D.position.x=i*bScale-cols*0.5*bScale;
				e.object3D.position.z=j*bScale-cols*0.5*bScale;
				e.object3D.position.y = 
					(perlin(i/freq,j/freq)*amp);
				e.setAttribute('material', 'color:green');
				//e.setAttribute('material', 'src:#imgJojo2');
				this.sceneEl.appendChild(e);
			}
		}
		
	}
	
});