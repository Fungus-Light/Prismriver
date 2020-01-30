let resultArray=[]

function CheckTemptale(){
    for(let i=0;i<templateValue.length;i++){
        if(templateValue[i]==true){
            return true;
        }
    }
    return false;
}

function Generator(){
    console.log('start generate')
    resultArray=[]
    if(CheckTemptale()==false){
        alertify.alert('Prismriver',"请指定节奏模板");
    }else{
        console.log('1.确定音阶');
        switch(scale_type){
            case 1:
                console.log('五声音阶');
                let scale=['C','D','E','G','A']
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                console.error('unknown scale type')
                alertify.error('程序发生错误，详情查看控制台'); 
                break;
        }
    }
}