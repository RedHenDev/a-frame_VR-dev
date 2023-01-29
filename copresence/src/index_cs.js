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
let subjects={};

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
	'maroon',
	'sage',
	'lime',
	'silky',
	'ginger',
	'saffron',
	'speckled',
	'diamond',
	'greasy',
	'frozen',
	'platinum',
	'yellow',
	'pink'
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
	'baboon',
	'hen',
	'frog',
	'bear',
	'wombat',
	'kangaroo',
	'warthog',
	'wallaby'
	];

function baptise(){
	const fn=randomFromArray(fnames);
	const sn=randomFromArray(snames);
	return `${fn}_${sn}`;
}

// Testing...
//***
let VRclone=false;
//***
// To turn on clone mode.
document.addEventListener('keypress', event => {
	if (event.key === 'c') {
		if (!VRclone){
		VRclone=true;
		const c=document.querySelector('#subject');
		c.setAttribute('look-controls','enabled',false);
		return;
		}
		if (VRclone){
		VRclone=false;
		const c=document.querySelector('#subject');
		c.setAttribute('look-controls','enabled',true);
		}
	}
});

function manifestSubject(_who,_me){
		// NB _who here is a single snapshot.val() object.
		
		// First, grab our sceneEl. 
		// We should probably do this globally earlier?
		const sceneEl=document.querySelector('a-scene');
		console.log(`generating avatar...${_who.name}`);
	
		// Change subject position and HUD display name.
		// That is, so long as _me is true.
		if (_me){
		// globalName.
		gName=_who.name;
		
		const rig=document.querySelector('#rig');
		//rig.object3D.position.x = +_who.x.toFixed(6);
		xSub=rig.object3D.position.x = _who.x;
		ySub=rig.object3D.position.y = _who.y;
		zSub=rig.object3D.position.z = _who.z;
		}
	else{
		
		// Create placeholder shape for other subject.
		// Set attributes and finally append to scene.
		const nub=document.createElement('a-cylinder');
		//nub.setAttribute('position',_who.position);
		nub.setAttribute('id',_who.name);
		nub.setAttribute('scale','2 2 2');
		nub.setAttribute('color','green');
		
		// Direction...
		//const dub=document.createElement('a-box');
		//dub.setAttribute('position','0 0 -4');
		//dub.setAttribute('scale','0.1 0.1 8');
		//dub.setAttribute('color','white');
		//dub.setAttribute('parent',`#${_who.name}`);
		
		sceneEl.appendChild(nub);
		//sceneEl.appendChild(dub);
	}
}

// Simple protection to ensure we don't
// try to sync (non-existent) rigs before 6 seconds.
setTimeout(function(){
	setInterval(function() {
  write_move();
}, 128);
},1000);

// Convert three numerical positions to string
// and set this to string position of subject.
function write_move(){
	//console.log('write moving...');
//	const posStr = String(xSub + ' ' + ySub + ' ' + zSub);
	set(playerRef, {
			id: playerId,
			name: subName,
			x: xSub,
			y: ySub,
			z: zSub,
			rx: rxSub,
			ry: rySub,
			rz: rzSub
	});
}

function initGame(_who){
	// Grab subject's camera here...once.
	const sub = document.
								querySelector("#subject").object3D;
	const rig = document.querySelector("#rig").object3D;
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
	// Refactor -- use array or dictionary.
	const bod=document.querySelector(`#${whoMoved.name}`);
	
		//***
		// Clone mode is when we assue the pos and rot
		// of the other VR subject -- i.e. to display
		// this on a computer screen.
		// This involves toggling off look-controls from
		// camera (#subject) a-frame entity.
		if (VRclone && whoMoved.name!=gName){
			// NB changing rotation of camera/subject
			// only works if look controls disabled.
			// I.e. look controls are the VR response
			// to person's head movements that override.
		// ***
			// Testing...
			sub.rotation.x = whoMoved.rx;
			sub.rotation.y = whoMoved.ry;
			sub.rotation.z = whoMoved.rz;
			
			rig.position.x = whoMoved.x;
			rig.position.y = whoMoved.y;
			rig.position.z = whoMoved.z;
		}
	if (bod!=null){
		// I don't think we need the unary + here...
	const x = whoMoved.x;
	const y = whoMoved.y;
	const z = whoMoved.z;
	bod.object3D.position.x = x;
	bod.object3D.position.y = y;
	bod.object3D.position.z = z;
	bod.object3D.rotation.x = whoMoved.rx;
	bod.object3D.rotation.y = whoMoved.ry;
	bod.object3D.rotation.z = whoMoved.rz;
		
	}
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
		//console.log('this has happened once.');
		// Gen random name for new subject.
		subName = baptise();
		// Write initial subject details to db.
		// Refactor -- so that I can call write_move here.
//		position: `${Math.floor(Math.random()*20-10)} ${Math.floor(Math.random()*20-10)} ${Math.floor(Math.random()*20-10)}`,
		set(playerRef, {
			id: playerId,
			name: subName,
			x: xSub,
			y: ySub,
			z: zSub,
			rx: rxSub,
			ry: rySub,
			rz: rzSub
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
