let mySphere = document.querySelector("#mySphere");

let zPos=0;
let xPos=0;
let yPos=0;

mySphere.addEventListener("mouseenter", e => {
  mySphere.setAttribute("color", "purple")
 	mySphere.object3D.position.y += 1;
 
  // document.querySelector("#subject").object3D.position.z -= 0.25;
 
});