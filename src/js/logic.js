let templateValue = new Array(4);

let isMusicOk = false;
let section_num = 1;
let unit_time = 4;
let tempo = 128;
let scale_type = '1';
let range = 1;
let celnum;
let beatTemplate = new Nexus.Sequencer('#template', {
    'size': [900, 50],
    'mode': 'toggle',
    'rows': 1,
    'columns': 4
})

beatTemplate.on('change', function (e) {
    console.log(e)
    SetTemplate(e.column, e.state);
})

function Refresh() {
    window.location.reload();
}

function InitArray() {
    for (let i = 0; i < templateValue.length; i++) {
        templateValue[i] = false;
    }
    console.log(templateValue);
}

InitArray();

function SetTemplate(index, value) {
    templateValue[index] = value;
    console.log(templateValue)
}

$("#section_num").change(function (e) {
    e.preventDefault();
    section_num = $("#section_num")[0].value;
    celnum = section_num * unit_time;
    templateValue = new Array(celnum);
    InitArray()
    $("#template").text("");
    beatTemplate = new Nexus.Sequencer('#template', {
        'size': [900, 50],
        'mode': 'toggle',
        'rows': 1,
        'columns': celnum
    })
    beatTemplate.on('change', function (e) {
        console.log(e)
        SetTemplate(e.column, e.state);

    })
    console.log(section_num);
    console.log(celnum)
});

$("#unit_time").change(function (e) {
    e.preventDefault();
    unit_time = $("#unit_time")[0].value;
    celnum = section_num * unit_time;
    console.log(celnum)
    templateValue = new Array(celnum);
    InitArray()
    $("#template").text("");
    beatTemplate = new Nexus.Sequencer('#template', {
        'size': [900, 50],
        'mode': 'toggle',
        'rows': 1,
        'columns': celnum
    });
    beatTemplate.on('change', function (e) {
        console.log(e)
        SetTemplate(e.column, e.state);
    });
    console.log(unit_time)
});

$("#tempo_num").change(function (e) {
    e.preventDefault();
    tempo = $("#tempo_num")[0].value;
    console.log(tempo)
})

$("#scale_type").change(function (e) {
    e.preventDefault();
    scale_type = $("#scale_type")[0].value;
    console.log(scale_type);
})

$("#range").change(function (e) {
    e.preventDefault();
    range = $("#range")[0].value;
    console.log(range);
})

$("#btn_reload").click(function (e) {
    e.preventDefault();
    Refresh();
})

$("#btn_generate").click(function (e) {
    e.preventDefault();
    Generator();
})

$("#btn_player").click(function (e) {
    e.preventDefault();
    if (isMusicOk == false) {
        alertify.alert('Prismriver', "还没有生成音乐");
    }
    play(resultArray, unit_time.toString() + 'n', tempo);
})

$("#btn_stop").click(function (e) {
    e.preventDefault();
    PlayerStop()
})

$("#btn_export").click(function (e) {
    e.preventDefault();
    // alertify.alert('Prismriver', "施工中，即将到来");
    if(resultArray.length<=0){
        alertify.alert('Prismriver', "请先生成旋律");
        
    }else{
        downloadMIDI()
    }
})

function CleanResult() {
    $("#result").text("");
}

function MakeUpNote(value) {
    let temp = document.createElement('a');
    temp.className = "Note";
    temp.innerText = value;
    return temp;
}

function AddNode(value) {
    $("#result")[0].appendChild(MakeUpNote(value))
}
CleanResult();
AddNode('等待生成。。。')



function downloadMIDI() {
    var file = new MIDI.BasicFile(unit_time); // 8 units is 1 quarter note

    // create a track
    var track1 = new MIDI.BasicTrack();


    for (let i = 0; i < resultArray.length; i++) {
        let note = resultArray[i];
        if (note.name != "▂") {
            track1.addNote(note.range, note.name, 0, unit_time);
        } else {
            track1.addEvent(new MIDI.ChannelEvent(0, 0x9, 0,"", 0x7f));
            track1.addEvent(new MIDI.ChannelEvent(unit_time, 0x8, 0, "", 0));
        }

    }

    // end the track and add it to our file
    track1.end();
    file.addTrack(track1);
    var encoded = file.encode();
    var uriEncoded = encodeURIComponent(String.fromCharCode.apply(null, encoded));
    var hexStr = "";
    for (var i = 0; i < encoded.length; i++) {
        var s = encoded[i].toString(16);
        if (s.length == 1) s = '0' + s;
        hexStr += '%' + s;
    }
    var uriContent = 'data:application/octet-stream,' + hexStr;
    var pom = document.createElement('a');
    pom.setAttribute('href', uriContent);
    pom.setAttribute('download', 'output.mid');
    document.body.appendChild(pom);
    pom.click();
    document.body.removeChild(pom);
}