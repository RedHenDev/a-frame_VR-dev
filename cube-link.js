function setup(){
	createCanvas(400,400,WEBGL);
	angleMode(DEGREES);
}

function draw(){
	background(74,0);
	rotateX(-15);
	rotateY(frameCount*0.33);
	box(100);
}