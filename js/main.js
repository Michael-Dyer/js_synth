
    
        function playRandomSound() {
          
        audioContext = new AudioContext();
          
            /*
          let oscillatorNode = context.createOscillator();
          let gainNode = context.createGain();
    
          //oscillatorNode.type = "sine";
    
          
          oscillatorNode.frequency.value = 440;
    
          
    
          oscillatorNode.connect(gainNode);
          gainNode.connect(context.destination);

          oscillatorNode.start(0);
          */

        const oscillator = audioContext.createOscillator();
        oscillator.connect(audioContext.destination);
        oscillator.start();
        }

        function playNote(note, freq){
            context = new AudioContext();
          let oscillatorNode = context.createOscillator();
          let gainNode = context.createGain();
    
          //oscillatorNode.type = "sine";
    
          
          oscillatorNode.frequency.value = freq;
    
          
    
          oscillatorNode.connect(gainNode);
          gainNode.connect(context.destination);

          oscillatorNode.start(0);
          oscillatorNode.stop(1);
        }