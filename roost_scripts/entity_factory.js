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
		const bScale=256;
		
		const cols=this.data.cols;
		const rows=cols;
		const freq=64;
		const amp=10*bScale;
		for (let i=0;i<cols;i++){
			for (let j=0;j<rows;j++){
				
				let e = document.createElement('a-gltf-model');
				//let e = document.createElement('a-entity');
				//e.setAttribute('mixin', this.data.mixin);
				e.setAttribute('src',"#mIsland");
				e.object3D.scale.x=bScale;
				e.object3D.scale.y=bScale;
				e.object3D.scale.z=bScale;
				e.object3D.position.x=i*bScale*3+x;
				e.object3D.position.z=j*bScale*3+z;
				e.object3D.position.y = (perlin(i/freq,j/freq)*amp)-42;
			
				this.sceneEl.appendChild(e);
			}
		}
		
	}
	
});