let mySphere = document.querySelector("#mySphere");
let myPig = document.querySelector("#testPig");

mySphere.addEventListener("mouseenter", e => {
  mySphere.setAttribute("color", "purple")
 	mySphere.object3D.position.y += 1;
});

myPig.addEventListener("fusing", e => {
  myPig.setAttribute("color", "yellow")
 	myPig.object3D.position.z += 1;
	
//	const gradientResolution = 16;
//
//	for (let y = 0; y < 32; y++) {
//		let row = '';
//		for (let x = 0; x < 32; x++) {
//			const noise = perlin(x / 8, y / 8);
//			row += noise > 0 ? '#' : ' ';
//		}
//	console.log(row);
}
	
});