let mySphere = document.querySelector("#mySphere");

// Legacy - used in loco!
let zPos=0;
let xPos=0;
let yPos=0;

mySphere.addEventListener("mouseenter", e => {
  mySphere.setAttribute("color", "purple")
 	mySphere.object3D.position.y += 1;
});