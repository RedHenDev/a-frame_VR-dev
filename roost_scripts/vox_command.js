// (A) INIT VOICE COMMAND
let voice = {
	// (A) ADD SPEECH SYNTHESIS OBJECT & SETTINGS
  synth: window.speechSynthesis,
  utter: null,
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
		//voice.speak('Hello world!');
    // (A2) ON SPEECH RECOGNITION - RUN CORRESPONDING COMMAND
    voice.recog.onresult = evt => {
			console.log('vox event detected');
      let said = evt.results [0] [0].transcript.toLowerCase ();
      if (said!="engine") { 
				 }
			else{this.engine = !this.engine;}
//      else if (said == "engine off") { this.engine = false; }
      console.log("Engine: " + this.engine);
      //voice.stop ();
			// (D) UPDATE UTTERANCE TEXT & SPEAK
    voice.speak("Engine: " + this.engine);
			//voice.start ();
    };

    // (A3) ON SPEECH RECOGNITION ERROR
    voice.recog.onerror = err => console.error (evt);
  },

	speak: (text) => {
    if (voice.synth.speaking) {
      console.error("SpeechSynthesis: Already speaking");
      return;
		}
		voice.utter.text = text;
    voice.synth.speak(voice.utter);
    },
	
  // (B) START SPEECH RECOGNITION
  start : () => {
    voice.recog.start ();
		// Speech init.
		// (B) ADD UTTERANCE FOR SPEECH SYNTHESIS
    voice.utter = new SpeechSynthesisUtterance();
    voice.utter.lang = "en-UK";
    voice.utter.volume = 1;
    voice.utter.rate = 1;
    voice.utter.pitch = 1;
  },

  // (C) STOP/CANCEL SPEECH RECOGNITION
  stop : () => {
    voice.recog.stop ();
  }
};

// (D) GET MIC ACCESS PERMISSION
// {audio: true}    -- default.
navigator.mediaDevices.getUserMedia ( 
	{audio: true, mic: true}
)
.then (stream => {
  // (E) READY!
  voice.init();
	// ChatGPT March 15's fix - in less that 1 second.
	voice.start ();
})
.catch (err => {
  console.error (err);
});
