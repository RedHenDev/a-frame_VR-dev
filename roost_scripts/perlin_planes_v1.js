// Perlin Planes v1.
// Created with help of GPTomni.
// Sunday 2nd June 2024.
/*
 "https://cdnjs.cloudflare.com/ajax/libs/perlin-noise/1.0.0/perlin-noise.min.js"
 */

// Perlin noise implementation.
(function(global) {
  var module = { exports: {} };

  // Classic Perlin noise implementation in 2D
  var grad3 = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
  ];

  var p = [];
  for (var i = 0; i < 256; i++) {
    p[i] = Math.floor(Math.random() * 256);
  }
  var perm = [];
  for (var i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
  }

  function dot(g, x, y) {
    return g[0] * x + g[1] * y;
  }

  function mix(a, b, t) {
    return (1 - t) * a + t * b;
  }

  function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function perlin2(x, y) {
    var X = Math.floor(x) & 255;
    var Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    var u = fade(x);
    var v = fade(y);

    var n00 = dot(grad3[perm[X + perm[Y]] % 12], x, y);
    var n01 = dot(grad3[perm[X + perm[Y + 1]] % 12], x, y - 1);
    var n10 = dot(grad3[perm[X + 1 + perm[Y]] % 12], x - 1, y);
    var n11 = dot(grad3[perm[X + 1 + perm[Y + 1]] % 12], x - 1, y - 1);

    return mix(mix(n00, n10, u), mix(n01, n11, v), v);
  }

  module.exports = { perlin2 };

  global.noise = module.exports;
}(this));

AFRAME.registerComponent('perlin-plane', {
	schema: {
		width: { type: 'number', default: 10 },
		height: { type: 'number', default: 10 },
		segments: { type: 'int', default: 32 },
		noiseScale: { type: 'number', default: 1 },
		amplitude: { type: 'number', default: 1 }
	},

	init: function () {
		const data = this.data;
		const el = this.el;

		// Create a plane geometry.
		const geometry = new THREE.PlaneGeometry(data.width, data.height, data.segments, data.segments);

		// Apply Perlin noise to the vertices.
		const vertices = geometry.attributes.position.array;
		for (let i = 0; i < vertices.length; i += 3) {
			const x = vertices[i];
			const y = vertices[i + 1];
			const z = noise.perlin2(x * data.noiseScale, y * data.noiseScale) * data.amplitude;
			vertices[i + 2] = z;
		}

		geometry.attributes.position.needsUpdate = true;
		geometry.computeVertexNormals();

		// Create a mesh with the modified geometry.
		const material = new THREE.MeshStandardMaterial({ color: '#228B22', wireframe: false });
		const mesh = new THREE.Mesh(geometry, material);

		 // Ensure the mesh is an instance of THREE.Object3D.
      if (mesh instanceof THREE.Object3D) {
        // Add the mesh to the entity.
        el.setObject3D('mesh', mesh);
      } else {
        console.error('Created mesh is not an instance of THREE.Object3D');
      }
	}
});
