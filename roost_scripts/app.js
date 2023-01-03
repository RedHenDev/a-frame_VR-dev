function randomFromArray(_array){
	return [Math.floor(Math.random()*_array.length)];
}

function getKeyString(_x,_y){
	return `${_x}x${_y}`;
}

(function () {

	firebase.auth().onAuthStateChanged((user)=>{
		console.log(user);
		if (user){
			// Logged in!
			console.log('Hi mom!');
		} else{
			// Logged out!
		}
		})
	
	
	firebase.auth().signInAnonymously();
	
})();