// Custom component to make the ray visible.
// Made May 29th 2024.
AFRAME.registerComponent('ray-visible', {
	init: function () {
		const raycasterEl = this.el;
		const sceneEl = raycasterEl.sceneEl;
		let rayLine;

		raycasterEl.addEventListener('loaded', () => {
			// Create a line element
			rayLine = document.createElement('a-entity');
			// Begin line to right and behind.
			rayLine.setAttribute('line', {
				start: '0.1, -0.1, 1',
				end: '0, 0, -3',
				color: '#FFFFFF'
			});
			raycasterEl.appendChild(rayLine);
		});

		raycasterEl.addEventListener('raycaster-intersection', function (evt) {
			const intersection = evt.detail.intersections[0];
			rayLine.setAttribute('line','color','lime');
			const distance = intersection.distance;
			// Update the end point of the line to match the intersection distance
			rayLine.setAttribute('line', 'end', `0 0 -${distance}`);
		});

		raycasterEl.addEventListener('raycaster-intersection-cleared', function () {
			// Reset the line if no intersection
			rayLine.setAttribute('line', 'end', '0 0 -3');
			rayLine.setAttribute('line','color','white');
		});
	}
});