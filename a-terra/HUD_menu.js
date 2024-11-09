
// Component to make an entity follow the camera.
AFRAME.registerComponent('follow-camera', {
  tick: function () {
    const camera = document.querySelector('#player');
    if (!camera) return;
    
    // Get camera world position.
    const worldPos = new THREE.Vector3();
    camera.object3D.getWorldPosition(worldPos);
    
    // Position HUD in front of camera.
    const distance = -0.5; // Distance from camera
    const cameraDirection = new THREE.Vector3();
    camera.object3D.getWorldDirection(cameraDirection);
    
    this.el.object3D.position.copy(worldPos).add(cameraDirection.multiplyScalar(distance));
    
    // Make HUD face camera.
    this.el.object3D.lookAt(worldPos);
  }
});

// Component to handle button states
AFRAME.registerComponent('toggle-button', {
  schema: {
    label: {type: 'string', default: 'Button'},
    initialState: {type: 'boolean', default: false}
  },
  
  init: function () {
    this.state = this.data.initialState;
    this.el.setAttribute('class', 'clickable');

    // For checking whether active (visible or not).
    this.hud=document.querySelector("#hud").object3D;
    
    // Set initial colors
    this.updateVisuals();
    
    // Add click handler
    this.el.addEventListener('click', () => {
      // Disable if not active (i.e. not visible).
      if (!this.hud.visible) return;
      this.state = !this.state;
      this.updateVisuals();
      // Emit event with new state
      this.el.emit('statechanged', { state: this.state });
    });
  },
  
  updateVisuals: function () {
    const activeColor = '#4CAF50';
    const inactiveColor = '#f44336';
    this.el.setAttribute('material', 'color', this.state ? activeColor : inactiveColor);
  }
});

// Run when scene is loaded.
document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    if (scene) {
        console.log('HUD ready and waiting...');
        document.querySelector('#b1').addEventListener('statechanged', (event) => {
            //console.log('Button state:', event.detail.state);
            const playerEl = document.querySelector('#player');
            const tmc = playerEl.components['terrain-movement'];
            tmc.running=event.detail.state;
        });
        document.querySelector('#b2').addEventListener('statechanged', (event) => {
            //console.log('Button state:', event.detail.state);
            const playerEl = document.querySelector('#player');
            const tmc = playerEl.components['terrain-movement'];
            tmc.flying=event.detail.state;
        });
        document.querySelector('#b3').addEventListener('statechanged', (event) => {
          //console.log('Button state:', event.detail.state);
          const playerEl = document.querySelector('#player');
          const tmc = playerEl.components['terrain-movement'];
          tmc.lunaBounce=event.detail.state;
      });
    }
});

