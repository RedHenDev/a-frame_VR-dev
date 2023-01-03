function randomFromArray(_array){
	return [Math.floor(Math.random()*_array.length)];
}

function getKeyString(_x,_y){
	return `${_x}x${_y}`;
}

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, user => {
  // Check for user status.
	console.log(user);
		if (user){
			// Logged in!
			console.log('Hi mom!');
		} else{
			// Logged out!
		}
});


