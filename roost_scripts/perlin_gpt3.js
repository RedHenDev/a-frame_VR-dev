function perlin(x, y) {
  // Generate a pseudorandom grid of gradients
  const gradients = [];
  for (let i = 0; i < gradientResolution; i++) {
    for (let j = 0; j < gradientResolution; j++) {
      gradients.push([Math.random() * 2 - 1, Math.random() * 2 - 1]);
    }
  }

  // Determine the grid cell that the input point falls into
  const x0 = Math.floor(x);
  const x1 = x0 + 1;
  const y0 = Math.floor(y);
  const y1 = y0 + 1;

  // Determine the weights for each corner of the grid cell
  const sx = x - x0;
  const sy = y - y0;
  const n0 = dotGridGradient(gradients, x0, y0, x, y);
  const n1 = dotGridGradient(gradients, x1, y0, x, y);
  const ix0 = lerp(n0, n1, sx);
  const n2 = dotGridGradient(gradients, x0, y1, x, y);
  const n3 = dotGridGradient(gradients, x1, y1, x, y);
  const ix1 = lerp(n2, n3, sx);
  return lerp(ix0, ix1, sy);
}

function dotGridGradient(gradients, ix, iy, x, y) {
  // Determine the distance vector between the input point and the grid point
  const dx = x - ix;
  const dy = y - iy;
  // Determine the gradient at the grid point
  const gradient = gradients[iy * gradientResolution + ix];
  // Return the dot product of the gradient and the distance vector
  return (dx * gradient[0] + dy * gradient[1]);
}

function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}

//const gradientResolution = 16;
//
//for (let y = 0; y < 32; y++) {
//  let row = '';
//  for (let x = 0; x < 32; x++) {
//    const noise = perlin(x / 8, y / 8);
//    row += noise > 0 ? '#' : ' ';
//  }
//  console.log(row);
//}
