AFRAME.registerComponent('entity-factory',{
	schema: {
		mixin: {type:'string',default:'null'},
		cols: {type:'integer',default:4}
					},
	init: function(){
	
		this.sceneEl = document.querySelector('a-scene');
		
		const x=0;
		const y=0;
		const z=0;
		const bScale=10;
		
		const cols=this.data.cols;
		const rows=cols;
		const freq=320;
		const amp=1*bScale;
		for (let i=0;i<cols;i++){
			for (let j=0;j<rows;j++){
				
				let e = document.createElement('a-entity');
				e.setAttribute('mixin', this.data.mixin);
//				e.object3D.scale.x=bScale;
//				e.object3D.scale.y=bScale;
//				e.object3D.scale.z=bScale;
				e.object3D.position.x=i*bScale+x;
				e.object3D.position.z=j*bScale+z;
				e.object3D.position.y = 0;
					//(perlin(i/freq,j/freq)*amp) + y;
				//e.setAttribute('position', `{i*bScale+x} -64 {j*bScale+z}`);
			

				this.sceneEl.appendChild(e);
			}
		}
		
	}
	
});