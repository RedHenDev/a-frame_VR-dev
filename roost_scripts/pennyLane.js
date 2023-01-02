/* 
Sound Manager Mon 2-Jan-23.
 
Had notion to call this 'Dylan'.
But we settled on 'Penny Lane' :)

*/

AFRAME.registerComponent('soundmanager', {
	init: function(){
		// Grab the a-scene so that we can append
		// new entity to the scene (else will not
		// init).
		this.sceneEl=document.querySelector('a-scene');
		console.log('sound manager online');
		// Create empty for ambient sound.
		// Set attributes and finally append to scene.
		this.ambSound=document.createElement('a-entity');
		this.ambSound.setAttribute('sound','src:#sAmb');
		this.ambSound.setAttribute('autoplay','true');
		this.ambSound.setAttribute('loop','true');
		this.sceneEl.appendChild(this.ambSound);
		
	}
});