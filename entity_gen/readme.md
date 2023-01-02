##VR web dev - generating entities in js

###Key learning points:

0 defer

0 fusing

0 not to defer hud thingy (see main.js)

0 crossorigin

0 360 sky child of rig (not camera)

0 rig wrapper for VR (custom) locomotion

0 timeout for loading assets

0 ../ for path reference in HTML

0 .object3D +performant than .setAttribute

0 material to transparent:true and depthTest:false 
		to always draw on top (useful for UI)
		NB - doesn't work on the text!
		opacity to 0.5 - transparency works!

0 Using obj
	<a-entity obj-model="obj:#modShuttle"
								id="shuttle"
								position="22 14 22"
								rotation="0 33 0"
								scale="0.5 0.5 0.5"
								material="shader:standard;
													color:silver;
													metalness:0.8">
									
