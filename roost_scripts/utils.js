// Utility functions.

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

export function baptise(){
	const fn=randomFromArray(fnames);
	const sn=randomFromArray(snames);
	return `${fn}_${sn}`;
}