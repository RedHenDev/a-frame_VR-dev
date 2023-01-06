import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js';
import { getAuth, onAuthStateChanged, signInAnonymously  } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getDatabase, onValue, ref, onDisconnect, set } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';


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
let playerId;
let playerRef;


function manifestSubject(_whatPos){
	
		const sceneEl=document.querySelector('a-scene');
		console.log('generating avatar...');
		// Create plaeholder shape for player.
		// Set attributes and finally append to scene.
		const nub=document.createElement('a-box');
		nub.setAttribute('position',
			_whatPos);
		sceneEl.appendChild(nub);
	
		// Change player position.
//		const rig = document.querySelector("#rig").object3D;
//		rig.position.x = _whatPos.x;
	
}


function initGame(_who){

	const allSubjectsRef = ref(db,'players');

	// New subject has entered world...
	onValue(_who, (snapshot) => {
		console.log(`${snapshot.val()} manifested...`);
		const whatPos=snapshot.val().position;
		console.log(`connected at ${whatPos}`);
		manifestSubject(whatPos);
	});
								
} // EOF initGame().


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
		
		playerId = user.uid;
		// Create a reference to the player's data in the database using the `ref` function.
		playerRef = ref(db,`players/${playerId}`);
		
		console.log('hi mom!');
		
		set(playerRef, {
			id: playerId,
			name: 'Mom',
			position: `${Math.floor(Math.random()*10)} ${2} ${Math.floor(Math.random()*10)}` 
		});
		
		// Solution here:
		// https://firebase.google.com/docs/database/web/offline-capabilities#section-sample
		onDisconnect(playerRef).remove();
		
		initGame(playerRef);
	}
	
	
});
