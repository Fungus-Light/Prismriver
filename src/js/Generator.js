let resultArray = []

function CheckTemptale() {
    for (let i = 0; i < templateValue.length; i++) {
        if (templateValue[i] == true) {
            return true;
        }
    }
    return false;
}

function GetRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Generator() {
    isMusicOk = false;
    console.log('start generate')
    resultArray = []
    if (CheckTemptale() == false) {
        alertify.alert('Prismriver', "请指定节奏模板");
    } else {
        console.log('1.确定音阶');
        console.log('scale_type is ' + scale_type);
        let scale = [];
        switch (scale_type) {
            case '1':
                console.log('五声音阶');
                scale = ['C', 'D', 'E', 'G', 'A'];
                break;
            case '2':
                console.log('自然大调');
                scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
                break;
            case '3':
                console.log('自然小调');
                //C D D# F G G# A#
                scale = ['C', 'D', 'D#', 'F', 'G', 'G#', 'A#'];
                break;
            default:
                console.error('unknown scale type')
                alertify.error('程序发生错误，详情查看控制台');
                return;
        }

        console.log(scale);

        for (let i = 0; i < templateValue.length; i++) {
            if (templateValue[i] == false) {
                resultArray.push({
                    name: "▂",
                    range: "",
                    isOn: false
                });
            } else {
                let name = scale[GetRandom(0, scale.length - 1)];
                let range_result = GetRandom(0, parseInt(range) - 1);
                resultArray.push({
                    name: name,
                    range: range_result + 4,
                    isOn: true
                })
            }
        }
        // resultArray.push({
        //     name: "end",
        //     range: "",
        //     isOn: true
        // })
        CleanResult()
        console.log(resultArray);

        for (let i = 0; i < resultArray.length; i++) {
            let t = resultArray[i];
            if (t.name != "end") {
                AddNode(t.name + t.range.toString())
            }

        }

        isMusicOk = true;
    }
}