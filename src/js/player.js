//let synth = new Tone.Synth().toMaster()
let seq = null;

let sampler= new Tone.Sampler({
	"A5" : "./src/sample/A.wav",
	"B5" : "./src/sample/B.wav",
	"D5" : "./src/sample/D.wav",
	"G5" : "./src/sample/G.wav",
}, function(){
})
sampler.toMaster()

function play(track, unitTime, bpm) {
    
    sampler.disconnect ( )
    sampler=null
    sampler = new Tone.Sampler({
        "A5" : "./src/sample/A.wav",
        "B5" : "./src/sample/B.wav",
        "D5" : "./src/sample/D.wav",
        "G5" : "./src/sample/G.wav",
    }, function(){
        //loaded
    })
    sampler.toMaster()
    Tone.Transport.stop(0.1);
    if (seq != null) {
        seq.stop();
        seq = null;
    }
    Tone.Transport.bpm.value = bpm;
    seq = new Tone.Sequence(function (time, note) {
        console.log(note);
        alertify.message(note.name + note.range.toString());
        if (note.isOn == true) {

            sampler.triggerAttack(note.name + note.range.toString(), time);

        } else {
            //sampler.triggerAttack(' ', time);
        }
    }, track, unitTime)

    Tone.Transport.start('+0.2');
    seq.start();
}

function PlayerStop() {
    console.log('stop')
    sampler.disconnect ( )
    Tone.Transport.stop(0.1);
    Tone.Transport.clear()
    if (seq != null) {
        //seq.removeAll();
        seq.stop(1);
        seq.dispose();
        seq = null;
    }

}