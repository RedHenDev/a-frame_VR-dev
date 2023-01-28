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
		const x=0;
		const y=0;
		const z=0;
		const bScale=8;
		const cols=12;
		const rows=12;
		const freq=320;
		const amp=10*bScale;
		for (let i=0;i<cols;i++){
			for (let j=0;j<rows;j++){
				
				// Interior sphere.
//				let s = document.createElement('a-sphere');
//				s.object3D.position.x=i*bScale;
//				s.object3D.position.z=j*bScale;
//				s.object3D.position.y = 
//					(perlin(i/freq,j/freq)*amp);
//				s.object3D.scale.x=bScale;
//				s.object3D.scale.y=bScale;
//				s.object3D.scale.z=bScale;
//				s.setAttribute('material', 'shader:flat;color:rgb(0,0,0);depthTest:true;transparent:false; opacity:1');
				//				this.sceneEl.appendChild(s);
				// Use mixins?
				let e = document.createElement('a-box');
				e.object3D.scale.x=bScale;
				e.object3D.scale.y=bScale;
				e.object3D.scale.z=bScale;
				e.object3D.position.x=i*bScale+x;
				e.object3D.position.z=j*bScale+z;
				e.object3D.position.y = 
					(perlin(i/freq,j/freq)*amp) + y;
				//e.setAttribute('src', '#imgBloop1');
//				e.setAttribute('material', 'src:"imgBloop1";depthTest:false;transparent:false; opacity:1; color:rgba(0,200,0)');
				//e.setAttribute('material', 'src:#imgJojo2');

				this.sceneEl.appendChild(e);
			}
		}
		
	}
	
});