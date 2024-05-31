// Collision detector. Gravity.
// Modified for a gravity system.
// NB attached to...rig or subject. Former
// might be optimal?
AFRAME.registerComponent('collision-gravity', {
	
  init: function () {
    let el = this.el;
		const tRig =
      		document.querySelector("#rig").object3D;
		const tSub = document.querySelector('#subject');
		
        let isIntersecting = false;
        let intervalId = null;
				let gravIntId = null;
		
		
//				gravintId = setInterval(function() {
//              //console.log('Action happening...');
//							tRig.position.y -= 0.1;
//							
//            }, 20); // Repeat action every 20ms.
						

        function startAction(evt) {
					
          if (!isIntersecting) {

            isIntersecting = true;
						gravityON = true;
						//clearInterval(gravintId);
            //console.log('Raycaster intersected');
            // Start any action you want, for example:
            //intervalId = setInterval(function() {
              //console.log('Action happening...');
							//tRig.position.y += 1;
							
            //}, 20); // Repeat action every 20ms.
		
						}
          }
        
        function stopAction() {
          if (isIntersecting) {
            isIntersecting = false;
//            console.log('Raycaster intersection cleared');
						//gravintId = setInterval(function() {
              //console.log('Action happening...');
							//tRig.position.y -= 1;
							gravityON = false;
            //}, 20); // Repeat action every 20ms.
            
						//clearInterval(intervalId);
          }
        }

        this.el.addEventListener('raycaster-intersection', startAction);
        this.el.addEventListener('raycaster-intersection-cleared', stopAction);
	
  }
});

//******* EOF collision detec