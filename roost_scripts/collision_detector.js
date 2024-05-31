// Collision detection testing...
AFRAME.registerComponent('collision-detector', {
	
  init: function () {
    let el = this.el;
		const tRig =
      		document.querySelector("#rig").object3D;
		const tSub = document.querySelector('#subject');
		/*
		Idea -- we could check only every 1 second with
		a tock. And have a member variable set to true
		when intersection...?
		*/
		
		// ****
        let isIntersecting = false;
        let intervalId = null;

        function startAction(evt) {
					
          if (!isIntersecting) {
//				let dist=Math.abs(evt.detail.intersections[0].distance);
			
      //if (dist <=100) {
        //console.log('Collided at ' + dist);
		
            isIntersecting = true;
            //console.log('Raycaster intersected');
            // Start any action you want, for example:
            intervalId = setInterval(function() {
              //console.log('Action happening...');
							//tRig.position.y += 1;
							
						tSub.setAttribute('locomotion','vel',-0.2);
							
            }, 2); // Repeat action every 1/4 sec.
			//}// eof dist query.
						}
          }
        

        function stopAction() {
          if (isIntersecting) {
            isIntersecting = false;
//            console.log('Raycaster intersection cleared');
            clearInterval(intervalId);
          }
        }

        this.el.addEventListener('raycaster-intersection', startAction);
        this.el.addEventListener('raycaster-intersection-cleared', stopAction);
		// ****
		
		/*
    el.addEventListener('raycaster-intersection', function(evt)  {
      // Check if the ray has intersected with a collidable entity
			const dist=Math.abs(evt.detail.intersections[0].distance);
			
      if (dist <=100) {
        //console.log('Collided at ' + dist);
				// tSub set loco vel works.
				tSub.setAttribute('locomotion','vel',0);
				tRig.position.y += 1;
				// Let's move rig in reverse dir as
				// the incidental ray...
				// via theta and pitch.
//				let theta=evt.detail.intersections[0].direction.x;
//				let pitch=evt.detail.intersections[0].direction.y
//				this.rig.position.z += 
//            Math.cos(theta)*5;
//        this.rig.position.x += 
//            Math.sin(theta)*5;
//        this.rig.position.y += 
//						pitch*5;
      }
    });
		*/ 
  }
});

//******* EOF collision detec