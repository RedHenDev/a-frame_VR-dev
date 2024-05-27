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
// *** testing.
let subjects={};
let subs=[];

import { baptise } from "../../roost_scripts/utils.js";

// Testing...
//***
//let VRclone=false;
//import { VRclone } from "../../roost_scripts/loco_throttle.js";

// Testing -- are we on a mobile device?
function isMobile() {
  return /Mobi/.test(navigator.userAgent);
}

//***
// To turn on clone mode.
document.addEventListener('keypress', event => {
	
	
	
	if (event.key === 'c') {
		if (!VRclone){
		VRclone=true;
		const c=document.querySelector('#subject');
		c.setAttribute('look-controls','enabled',false);
		console.log('Cloned.')
			
		}
		else if (VRclone){
		VRclone=false;
		const c=document.querySelector('#subject');
		c.setAttribute('look-controls','enabled',true);
		console.log('Uncloned.')
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
		console.log(`my name is ${_who.name}`);
			
//			if (voice!=null){
//		voice.speak('Here we go, ' + gName);
//			}
			
		const rig=document.querySelector('#rig');
		//rig.object3D.position.x = +_who.x.toFixed(6);
		xSub=rig.object3D.position.x = _who.x;
		ySub=rig.object3D.position.y = _who.y;
		zSub=rig.object3D.position.z = _who.z;
		
		}
	else{
		
		// Create placeholder shape for other subject.
		// Set attributes and finally append to scene.
//		<a-gltf-model id="subMod" src="#joan" position="2 0 -85" rotation="0 0 0" scale="5 5 5" visible=""></a-gltf-model>
		//const nub=document.createElement('a-obj-model');
		const nub=document.createElement(avatarType);
		nub.setAttribute('id',_who.name);
		// Cap is backwards on Y.
		nub.setAttribute('rotation',avatarRotation);
		nub.setAttribute('position',avatarPosition);
		nub.setAttribute('scale',avatarScale);
		nub.setAttribute('src','#avatar');
		// No Nokia material for Cap. No matter - 
		// no avatarTex will be found or applied.
		nub.setAttribute('material',
										 'src:#avatarTex');
		
		// Direction...
		//const dub=document.createElement('a-box');
		//dub.setAttribute('position','0 0 -4');
		//dub.setAttribute('scale','0.1 0.1 8');
		//dub.setAttribute('color','white');
		//dub.setAttribute('parent',`#${_who.name}`);
		
		sceneEl.appendChild(nub);
		
		// *** add to dic here.
		subjects[_who.name]=nub;
		// Could just add via nub here?
		//sceneEl.appendChild(dub);
	}
}

// Simple protection to ensure we don't
// try to sync (non-existent) rigs before 6 seconds.
setTimeout(function(){
	setInterval(function() {
  write_move();
},63);
},6000);

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
		//***
		const bod=subjects[whoLeft.name];
					//document.querySelector(`#${whoLeft.name}`);
		bod.remove();
		//***
		delete subjects[whoLeft.name];
	});
	
	// Updating player positions etc.
	// Third attempt:
	onChildChanged(allSubjectsRef, (snapshot) => {
  const whoMoved = snapshot.val();
  //console.log(whoMoved.name, 'moved');
	// Refactor -- use array or dictionary.
	const bod=subjects[whoMoved.name];
				//document.querySelector(`#${whoMoved.name}`);
	
		//***
		// Clone mode is when we assume the pos and rot
		// of the other VR subject -- i.e. to display
		// this on a computer screen.
		// This involves toggling off look-controls from
		// camera (#subject) a-frame entity.
		if (VRclone && whoMoved.name!=gName &&
			 isMobile){
			// NB changing rotation of camera/subject
			// only works if look controls disabled.
			// I.e. look controls are the VR response
			// to person's head movements that override.
		// ***
//			let c= document.getElementById(whoMoved.name);
//			c.setAttribute('src','visible',false);
			// Testing...
			// NB x is negated. But not here!
			sub.rotation.x = whoMoved.rx;
			sub.rotation.y = whoMoved.ry;
			sub.rotation.z = whoMoved.rz;
			
			rig.position.x = whoMoved.x;
			rig.position.y = whoMoved.y;
			rig.position.z = whoMoved.z;
		
		}
	else if (bod!=null){
	const x = whoMoved.x;
	const y = whoMoved.y;
	const z = whoMoved.z;
	bod.object3D.position.x = x;
	bod.object3D.position.y = y;
	bod.object3D.position.z = z;
	bod.object3D.rotation.x = whoMoved.rx; // Nor here!
		let aRo=0;
		if (avatarRotation=='0 180 0') aRo=180;
	bod.object3D.rotation.y = 
		whoMoved.ry + aRo;
	bod.object3D.rotation.z = whoMoved.rz;
		
	}
		
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
