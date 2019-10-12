const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let arr = []
let counter = 0;
let groupCount = 0;


rl.on('line', (line) => {
    let nums = line.split(' ');
    if(counter == 0)
        groupCount = nums[0];
    else {
        arr.push([nums.slice(1, nums.length)])
    }
    counter++;
});



rl.on("close", () => {
    let res = [];

    for(let i = 0; i < groupCount; i++) {


        let curArr = arr[i][0];
        for(let j = 0; j < curArr.length; j++) {
            let cur = parseInt(curArr[j])
            let next = parseInt(curArr[j+1]);
            if((next-cur) > 1 || (cur-next) >= 0) {
                res.push(j+2)
                break;
            }
        }
    }

    for (let i = 0; i < res.length; i++) {
        console.log(res[i])
    }
 })