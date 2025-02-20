import Synth from "./synth.js";
    
    let context;
    
        
    let onNotes = [];
    let waveShape = "sine";
    let synth = new Synth();
    

    if (navigator.requestMIDIAccess) {
        console.log('This browser supports WebMIDI!');
    } else {
        console.log('WebMIDI is not supported in this browser.');
    }
    
    navigator.requestMIDIAccess()
        .then(onMIDISuccess, onMIDIFailure);
    
    function onMIDISuccess(midiAccess) {
        for (var input of midiAccess.inputs.values()){
            input.onmidimessage = getMIDIMessage;
        }
    }
    
    function onMIDIFailure() {
        console.log('Could not access your MIDI devices.');
    }
    
    function getMIDIMessage(message) {
        context = new (window.AudioContext)();
        var command = message.data[0] >> 4;
        var note = message.data[1];
        var velocity = message.data[2]
    
        if (command === 8 || (command === 9 && velocity === 0)) { // note off
            noteOff(note);
        } else if (command === 9) { // note on
            noteOn(note, velocity);
        } else if (command === 14) {
                setPitchBend(((velocity * 128.0 + note)-8192)/8192.0);
        } else {
            // console.log('midi message not supported');
        }

        console.log(onNotes)
        //converts note to freq
        //playNotes(note, 440 * Math.pow(2,(message.data[1]-69)/12));
    }

    function noteOn(n, v){
        onNotes[n]?.stop();
        delete onNotes[n];
        const osc = context.createOscillator();
        let gainNode = context.createGain();
        gainNode.connect(context.destination);

        osc.connect(gainNode);

        osc.frequency.value = 440 * Math.pow(2,(n-69)/12);
            
      

        osc.type = waveShape;

        
        onNotes[n] = osc;
       
        onNotes[n].start();
    }

    function noteOff(n){
        
        const position = onNotes.indexOf(n);
        if (position !== -1){
            
            onNotes.splice(onNotes.indexOf(n), 1)
        }

        if (onNotes.length === 0){
            onNotes[n]?.stop();
            delete onNotes[n];
        }
        else{
            onNotes[n]?.stop();
            delete onNotes[n];
        }
    }



 