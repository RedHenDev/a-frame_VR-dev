// (A) GET ACCESS TO USER'S MICROPHONE
navigator.mediaDevices.getUserMedia({audio: true})
.then(function(stream) {
  // (B) INITIALIZE AUDIO CONTEXT AND ANALYZER NODE
  const audioCtx = new AudioContext();
  const analyzerNode = audioCtx.createAnalyser();
  const microphone = audioCtx.createMediaStreamSource(stream);
  microphone.connect(analyzerNode);
  analyzerNode.fftSize = 2048;

  // (C) INITIALIZE VARIABLES
  const bufferLength = analyzerNode.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  let clapDetected = false;
  let engineOn = false;
  console.log('vox system awake...');
  // (D) MAIN LOOP
  setInterval(function() {
    // (D1) READ MIC LEVELS
    analyzerNode.getByteTimeDomainData(dataArray);
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += Math.abs(dataArray[i] - 128);
    }
    const micLevel = sum / bufferLength;
//		if (micLevel > 0){
//			console.log(micLevel);
//		}

    // (D2) DETECT CLAP
    if (micLevel > 1.25 && !clapDetected) {
      clapDetected = true;
			console.log(micLevel);
      setTimeout(function() {
        clapDetected = false;
      }, 3000); // Wait 3s before detecting next clap

      // (D3) TOGGLE ENGINE STATE
      engineOn = !engineOn;
      console.log("Engine: " + engineOn);

      // (D4) UPDATE UTTERANCE TEXT & SPEAK
      const voice = window.speechSynthesis;
      if (voice.speaking) {
        console.error("SpeechSynthesis: Already speaking");
        return;
      }
      const utter = new SpeechSynthesisUtterance();
      utter.text = "Engine: " + engineOn;
      utter.lang = "en-UK";
      utter.volume = 3;
      utter.rate = 1;
      utter.pitch = 1;
      voice.speak(utter);
			const entity =
						document.querySelector('#subject');
				entity.setAttribute('locomotion', 
														{ engine: engineOn });

    }
  }, 200); // Loop every 200ms
})
.catch(function(err) {
  console.error(err);
});
