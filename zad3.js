

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

let makePromise=function (x){
    return new Promise(function (res,rej){
        try{
            setTimeout(function (){
                res(x);
            },1000)
        }catch (err){
            //handle err
        }

    })
}

let sum=0;

makePromise(getRandom([]))
.then(function (r1){
    sum+=parseInt(r1);
    return makePromise(getRandom([]));
}).then(function (r2){
    sum+=parseInt(r2);
    return makePromise(getRandom([]))
}).then(function (r3){
    sum+=parseInt(r3);
    console.log(`sum is ${sum}`);
}).catch(function (err){
    //handle err
})

let asyF = async function () {

    let r1 = await makePromise(getRandom([]));
    let r2 = await makePromise(getRandom([]));
    let r3 = await makePromise(getRandom([]));

    console.log("${r1}+${r2}+${r3}=${r1+r2+r2}");
}

