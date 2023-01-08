import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js';
import { getAuth, onAuthStateChanged, signInAnonymously  } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getDatabase, onChildAdded, ref, onDisconnect, set, onChildRemoved, onChildChanged } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

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
let subName;

function randomFromArray(_array){
	return _array[Math.floor(Math.random()*_array.length)];
}

const fnames=[
	'red',
	'green',
	'golden',
	'scarlet',
	'bronze',
	'silver',
	'orange',
	'blue',
	'cyan',
	'ruby',
	'mint',
	'frosty',
	'marron',
	'sage',
	'lime',
	'silky',
	'ginger',
	'saffron'
	];
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
	'fox',
	'rabbit',
	'wolf',
	'dingo',
	'rat',
	'bat',
	'baboon'
	];

function baptise(){
	const fn=randomFromArray(fnames);
	const sn=randomFromArray(snames);
	return `${fn}_${sn}`;
}

function manifestSubject(_who,_me){
		// NB _who here is a single snapshot.val() object.
		
		// First, grab our sceneEl. 
		// We should probably do this globally earlier?
		const sceneEl=document.querySelector('a-scene');
		console.log(`generating avatar...${_who.name}`);
		// Create plaeholder shape for player.
		// Set attributes and finally append to scene.
		const nub=document.createElement('a-cylinder');
		//nub.setAttribute('position',_who.position);
		nub.setAttribute('id',_who.name);
		nub.setAttribute('scale','2 2 2');
		nub.setAttribute('color','green');
		sceneEl.appendChild(nub);
	
		// Change subject position and HUD display name.
		// That is, so long as _me is true.
		if (_me){
		gName=_who.name;
		 
		const rig=document.querySelector('#rig');
		rig.object3D.position.x = _who.x;
		rig.object3D.position.y = _who.y;
		rig.object3D.position.z = _who.z;
		}
}

// Simple protection to ensure we don't
// try to sync (non-existent) rigs before 5 seconds.
setTimeout(function(){
	setInterval(function() {
  write_move();
}, 16);
},5000);

// Convert three numerical positions to string
// and set this to string position of subject.
function write_move(){
	//console.log('write moving...');
	const posStr = String(xSub + ' ' + ySub + ' ' + zSub);
	set(playerRef, {
			id: playerId,
			name: subName,
			position: posStr,
			x: xSub,
			y: ySub,
			z: zSub
	});
}

function initGame(_who){
	// NB. _who here is playerRef.
	// New subject enters world...
	
	// So now we also need to listen for changes
	// higher up the node. I.e. at 'players'.
	const allSubjectsRef=ref(db,`players`);
	//const newb=push(allSubjectsRef);
	onChildAdded(allSubjectsRef, (data) => {
		const newSub=data.val();
		// False because not me, another subject.
		const isItMe = `NEMO` == gName;
  	manifestSubject(newSub,isItMe);
	});
	
	// And to remove avatar when other subject disconnects...
	onChildRemoved(allSubjectsRef, (data) => {
		const whoLeft = data.val();
  	console.log(`Removing ${whoLeft.name}`);
		const bod=document.querySelector(`#${whoLeft.name}`);
		bod.remove();
	});
	
	// Updating player positions etc.
	// Third attempt:
	onChildChanged(allSubjectsRef, (snapshot) => {
  const whoMoved = snapshot.val();
  //console.log(whoMoved.name, 'moved');
	// Refactor -- global array.
	const bod=document.querySelector(`#${whoMoved.name}`);
	const x = whoMoved.x;
	const y = whoMoved.y;
	const z = whoMoved.z;
	bod.object3D.position.x = x;
	bod.object3D.position.y = y+4;
	bod.object3D.position.z = z;
//	const posStr=whoMoved.position;
		// /[-+]?\d*\.?\d+/g
		// /[-+]?\d+/g
//	const posArr = posStr.match(/[-+]?\d*\.?\d+/g).map(str => parseInt(str));
//		bod.object3D.position.x = posArr[0];
//		bod.object3D.position.y = posArr[1];
//		bod.object3D.position.z = posArr[2];
});
								
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
		subName = baptise();
		// Write initial subject details to db.
		// Refactor -- so that I can call write_move here.
		set(playerRef, {
			id: playerId,
			name: subName,
			position: `${Math.floor(Math.random()*20-10)} ${Math.floor(Math.random()*20-10)} ${Math.floor(Math.random()*20-10)}`,
			x: xSub,
			y: ySub,
			z: zSub
		});
		
		// Callback for when user disconnects.
		// Remove function removes user child from db.
		onDisconnect(playerRef).remove();
		
		// Deal with DOM avatar a-frame etc.
		initGame(playerRef);
	}
	else{
		// User is null, signed out.
	}
});
