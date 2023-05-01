AFRAME.registerComponent('entity-factory',{
	schema: {
		mixin: {type:'string',default:'null'},
		cols: {type:'int',default:4}
					},
	init: function(){
	
		this.sceneEl = document.querySelector('a-scene');
		
		const x=-7000;
		const y=0;
		const z=-7000;
		const bScale=128;
		const bxScale=1; //90
		
		const cols=this.data.cols;
		const rows=cols;
		const freq=2000; // Default 64.
		const amp=20*bScale;
		for (let i=0;i<cols;i++){
			for (let j=0;j<rows;j++){
				
				/*
				let e = document.createElement('a-gltf-model');
				e.setAttribute('src',"#mIsland");
				e.object3D.scale.x=bScale;
				e.object3D.scale.y=bScale;
				e.object3D.scale.z=bScale;
				e.object3D.position.x=i*bScale*5+x+
					Math.random()*bScale;
				e.object3D.position.z=j*bScale*5+z
					+Math.random()*bScale;
				e.object3D.position.y = (perlin(i/freq,j/freq)*amp)-40;
				e.object3D.rotation.y=Math.random()*360;
				this.sceneEl.appendChild(e);
				*/
				
				//let f = document.createElement('a-box');
				let f = document.createElement('a-obj-model');
				f.setAttribute('src',"../roost_assets/models/mech_walker/mech_walker.obj");
				f.setAttribute('material',"src:#tex_mech");
				f.setAttribute('visible','');
				
				f.object3D.scale.x=bxScale;
				f.object3D.scale.y=bxScale;
				f.object3D.scale.z=bxScale;
				f.object3D.position.x=i*bxScale*10;
				f.object3D.position.z=j*bxScale*10;
				f.object3D.position.y=-12;
				f.object3D.rotation.y=Math.random()*360;
				
				this.sceneEl.appendChild(f);

			}
		}
		
	}
	
	
	
});