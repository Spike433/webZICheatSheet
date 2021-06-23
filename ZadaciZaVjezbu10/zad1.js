
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
console.log(getRandom([5,9]));
