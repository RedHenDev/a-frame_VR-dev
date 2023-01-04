import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js';
import { getAuth, onAuthStateChanged, signInAnonymously  } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getDatabase, ref, onDisconnect, set } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';


const firebaseConfig = {
  apiKey: "AIzaSyCXia4i3h3dFretIVmyBAVkJ_RCBlhK3pQ",
  authDomain: "multiplayer-base-ea50c.firebaseapp.com",
  databaseURL: "https://multiplayer-base-ea50c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "multiplayer-base-ea50c",
  storageBucket: "multiplayer-base-ea50c.appspot.com",
  messagingSenderId: "285500551349",
  appId: "1:285500551349:web:22f8c400161df176400efc",
  measurementId: "G-NZE8NB60MC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase();
//let playerId;
//let playerRef;


signInAnonymously(auth)
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });

onAuthStateChanged(auth, user => {
  // Check for user status
	console.log(user);
	if (user != null){
		
		const playerId = user.uid;
		// Create a reference to the player's data in the database using the `ref` function.
		const playerRef = ref(db,`players/${playerId}`);
		
		console.log('hi mom!');
		
		set(playerRef, {
			id: playerId,
			name: 'Mom',
			position: `${Math.floor(Math.random()*10)} ${2} ${Math.floor(Math.random()*10)}` 
		});
		
		// This causes problems.
		
		//playerRef.onDisconnect().remove();
	 
	}
	else{
		// Nope -- but thanks for trying, GPT3.
		// This block will be executed when the user signs out.
//		if (playerRef) {
//			playerRef.remove();
//		}
	}
});
