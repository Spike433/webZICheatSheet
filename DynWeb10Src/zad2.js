function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getRandom(arr){

    let x=getRndInteger(5,10);
    x=9;
    while(true){

        let  t=false;

        for(i of arr){
            if(x==i){
                t=!t;
                break
            }
        }
        if(!t){
            return x;
        }
        x=getRndInteger(5,10);
    }
}
//console.log(getRandom([5,9]));

let get=function (callback){
    try{
        setTimeout(function (){
            callback(undefined,getRandom([5,9]));
        },1000);
    }catch (err){
        callback(err);
    }
}

get(function (err,r1){
    if(!err){
        get(function (err2,r2){
            if(!err2){
                get(function (err3,r3){
                    if(!err3) {
                        console.log(`sum of ${r1}+${r2}+${r3}=${r1 + r2 + r3}`);
                    }else{
                        console.log("err3");
                    }
                })
            }else{
                console.log("err2");
            }
        })
    }else{
        console.log("err1");
    }
});
