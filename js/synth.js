




export default class Synth{
    constructor(){
        this.onNotes = [];

    
    }
   
  /**
     * Starts all the voices and connects them to the output node.
     *
     * @return {Promise}
     */
    async startMIDI(){
        let promises = []
        await Promise.all(promises);
        navigator.requestMIDIAccess()
    .then(this.onMIDISuccess, this.onMIDIFailure);
    }
    

    onMIDISuccess(midiAccess) {
        var inputs = midiAccess.inputs;
        var output = midiAccess.outputs;
        console.log("in minid access")
        for (var input of midiAccess.inputs.values()){
        input.onmidimessage = this.getMIDIMessage;
        }
    }

    onMIDIFailure() {
        console.log('Could not access your MIDI devices.');
    }

    getMIDIMessage(message) {
        var command = message.data[0];
        var note = message.data[1];
        var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

        switch (command) {
            case 144: // noteOn
                if (velocity > 0) {
                    this.noteOn(note, velocity);
                } else {
                    this.noteOff(note);
                }
                break;
            case 128: // noteOff
                this.noteOff(note);
                break;
            }


        console.log(message.data[1])

        //equation to convert note to freq
        
    }


    noteOn(n, v){
        this.onNotes.push(n)
    }

    noteOff(n){
        this.onNotes.splice(onNotes.indexOf(n), 1)
    }


}