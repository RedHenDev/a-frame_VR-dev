let mySphere = document.querySelector("#mySphere");
let myPig = document.querySelector("#testPig");

function cyberInput(key){
	console.log(key);
}

mySphere.addEventListener("mouseenter", e => {
  mySphere.setAttribute("color", "purple")
 	mySphere.object3D.position.y += 1;
});

myPig.addEventListener("mouseleave", e => {
  myPig.setAttribute("color", "yellow")
 	myPig.object3D.position.z += 1;
});