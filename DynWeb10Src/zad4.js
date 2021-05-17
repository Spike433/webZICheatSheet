
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function getRandom(arr){

    let x=getRndInteger(5,10);

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

let makePromise=function (x) {
    return new Promise(function (res, rej) {
        try {
            setTimeout(function () {
                res(x);
            }, 1000)
        } catch (err) {
            //handle err
        }

    })
}

let afAll = async function(){
    let sum=0;
    let res = await Promise.all([
        makePromise(getRandom([])).then(function (r1){
            sum+=r1;
            })
        .catch(function (err){
            //handle err
        }),
        makePromise(getRandom([])).then(function (r2){
            sum+=r2;
        }).catch(function (err){
            //handle err
        }),
        makePromise(getRandom([])).then(function (r3){
            sum+=r3;
        }).catch(function (err){
            //hanlde err
        })
    ])
    console.log(`sum is ${sum}`);
}
afAll();
