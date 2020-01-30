let templateValue=new Array(4);
let section_num=1;
let unit_time=4;
let tempo=128;
let scale_type=1;
let range=1;
let celnum;
let beatTemplate = new Nexus.Sequencer('#template', {
    'size': [900,50],
    'mode': 'toggle',
    'rows': 1,
    'columns': 4
})

beatTemplate.on('change',function(e){
    console.log(e)
    SetTemplate(e.column,e.state);
})

function Refresh(){
    window.location.reload();
}

function InitArray(){
    for(let i=0;i<templateValue.length;i++){
        templateValue[i]=false;
    }
    console.log(templateValue);
}

function SetTemplate(index,value){
    templateValue[index]=value;
    console.log(templateValue)
}

$("#section_num").change(function (e) { 
    e.preventDefault();
    section_num=$("#section_num")[0].value;
    celnum=section_num*unit_time;
    templateValue=new Array(celnum);
    InitArray()
    $("#template").text("");
    beatTemplate = new Nexus.Sequencer('#template', {
        'size': [900,50],
        'mode': 'toggle',
        'rows': 1,
        'columns': celnum
    })
    beatTemplate.on('change',function(e){
        console.log(e)
        SetTemplate(e.column,e.state);
        
    })
    console.log(section_num);
    console.log(celnum)
});

$("#unit_time").change(function (e) { 
    e.preventDefault();
    unit_time=$("#unit_time")[0].value;
    celnum=section_num*unit_time;
    console.log(celnum)
    templateValue=new Array(celnum);
    InitArray()
    $("#template").text("");
    beatTemplate = new Nexus.Sequencer('#template', {
        'size': [900,50],
        'mode': 'toggle',
        'rows': 1,
        'columns': celnum
    });
    beatTemplate.on('change',function(e){
        console.log(e)
        SetTemplate(e.column,e.state);
    });
    console.log(unit_time)
});

$("#tempo_num").change(function(e){
    e.preventDefault();
    tempo=$("#tempo_num")[0].value;
    console.log(tempo)
})

$("#scale_type").change(function(e){
    e.preventDefault();
    scale_type=$("#scale_type")[0].value;
    console.log(scale_type);
})

$("#range").change(function(e){
    e.preventDefault();
    range=$("#range")[0].value;
    console.log(range);
})

$("#btn_reload").click(function(e){
    e.preventDefault();
    Refresh();
})
