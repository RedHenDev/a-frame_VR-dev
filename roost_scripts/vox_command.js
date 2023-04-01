// (A) INIT VOICE COMMAND
let voice = {
  // (A1) SPEECH RECOGNITION OBJECT & SETTINGS
  recog : null,
  init : () => {
		
		this.engine=false;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    voice.recog = new SpeechRecognition ();
    voice.recog.lang = "en-UK";
    voice.recog.continuous = false;
    voice.recog.interimResults = false;
		console.log('vox system awake...');
    // (A2) ON SPEECH RECOGNITION - RUN CORRESPONDING COMMAND
    voice.recog.onresult = evt => {
			console.log('vox event detected');
      let said = evt.results [0] [0].transcript.toLowerCase ();
      if (said!="engine") { 
				 }
			else{this.engine = !this.engine;}
//      else if (said == "engine off") { this.engine = false; }
      console.log("Engine: " + this.engine);
      voice.stop ();
			voice.start ();
    };

    // (A3) ON SPEECH RECOGNITION ERROR
    voice.recog.onerror = err => console.error (evt);
  },

  // (B) START SPEECH RECOGNITION
  start : () => {
    voice.recog.start ();
  },

  // (C) STOP/CANCEL SPEECH RECOGNITION
  stop : () => {
    voice.recog.stop ();
  }
};

// (D) GET MIC ACCESS PERMISSION
navigator.mediaDevices.getUserMedia ( { audio: true })
.then (stream => {
  // (E) READY!
  voice.init();
	// ChatGPT March 15's fix - in less that 1 second.
	voice.start ();
})
.catch (err => {
  console.error (err);
});
