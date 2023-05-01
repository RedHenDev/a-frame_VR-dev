AFRAME.registerComponent('entity-factory',{
	schema: {
		mixin: {type:'string',default:'null'},
		cols: {type:'int',default:4}
					},
	init: function(){
	
		this.sceneEl = document.querySelector('a-scene');
		
		const x=0;
		const y=0;
		const z=0;
		const bScale=128;
		const bxScale=90;
		
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
				
				let f = document.createElement('a-box');
				f.setAttribute('color','rgb(0,0,1)');
				f.object3D.scale.x=bxScale;
				f.object3D.scale.y=bxScale*90;
				f.object3D.scale.z=bxScale;
				f.object3D.position.x=i*bxScale*10;
				f.object3D.position.z=j*bxScale*10;
				f.object3D.position.y=0;
				f.object3D.rotation.y=Math.random()*360;
				
				this.sceneEl.appendChild(f);

			}
		}
		
	}
	
	
	
});