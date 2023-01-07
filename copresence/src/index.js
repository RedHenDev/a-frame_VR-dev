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

function randomFromArray(_array){
	return _array[Math.floor(Math.random()*_array.length)];
}

const fnames=[
	'red',
	'green',
	'gold',
	'scarlet',
	'bronze',
	'silver',
	'orange',
	'blue',
	'cyan',
	'ruby',
	'mint'
	]
const snames=[
	'dog',
	'cat',
	'parrot',
	'budgie',
	'shark',
	'walrus',
	'panda',
	'goldfish',
	'worm',
	'dragon',
	'fox'
	]

function baptise(){
	const fn=randomFromArray(fnames);
	const sn=randomFromArray(snames);
	return `${fn} ${sn}`;
}

function manifestSubject(_who){
		// NB _who here is a single snapshot.val() object.
		
		// First, grab our rig and sceneEl. 
		// We should probably do this globally earlier?
		const rig = document.querySelector("#rig");
		const sceneEl=document.querySelector('a-scene');
		console.log('generating avatar...');
		// Create plaeholder shape for player.
		// Set attributes and finally append to scene.
		const nub=document.createElement('a-cylinder');
		nub.setAttribute('position',
			_who.position);
		nub.setAttribute('id',
			_who.name);
		sceneEl.appendChild(nub);
		
		// Change player position and HUD display name.
		const posStr=_who.position;
		gName=_who.name;
		
		// legacy /\d+/g
		const posArr = posStr.match(/[-+]?\d+/g).map(str => parseInt(str));
		rig.object3D.position.x = posArr[0];
		rig.object3D.position.y = posArr[1];
		rig.object3D.position.z = posArr[2];
}

function initGame(_who){
	// NB. _who here is playerRef.
	// New subject enters world...
	// This callback will detect change to node in db.
	// BUT only for _who -- i.e. this client, not others.

	onValue(_who, (snapshot) => {
		console.log(`${snapshot.val().name} manifested...`);
		const whatPos=snapshot.val().position;
		console.log(`connected at ${whatPos}`);
		manifestSubject(snapshot.val());
		
	});
	
	
	// So now we also need to listen for changes
	// higher up the node. I.e. at 'players'.
	// Let's try. Not yet grabbing new individual...
	// oh, doubling up -- no need to manifest self again...
//	let allSubjectsRef = ref(db,`players`);
//	onValue(allSubjectsRef, (snapshot) => {
//		let newSub=snapshot.val() ;
//		console.log(newSub);
//	});
								
} // EOF initGame().


// This allows users to log in anonymously.
signInAnonymously(auth)
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
		
// This listens for changes to logged in users.
onAuthStateChanged(auth, user => {
  // Check for user status
	//console.log(user);
	if (user != null){
		
		playerId = user.uid;
		// Create a reference to the subject's data in db.
		playerRef = ref(db,`players/${playerId}`);
		
		// Gen random name for new subject.
		const subName = baptise();
		// Write initial subject details to db.
		set(playerRef, {
			id: playerId,
			name: subName,
			position: `${Math.floor(Math.random()*20-10)} ${Math.floor(Math.random()*20-10)} ${Math.floor(Math.random()*20-10)}` 
		});
		
		// Callback for when user disconnects.
		// Remove function removes user child from db.
		onDisconnect(playerRef).remove();
		
		// Deal with DOM avatar a-frame etc.
		initGame(playerRef);
	}
	
	
});
