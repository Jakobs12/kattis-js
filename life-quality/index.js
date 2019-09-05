const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lineNr = 0;
let arr = Array();
rl.on('line', (line) => {
    let nums = line.split(' ');
    if(lineNr != 0) {
        arr.push([parseFloat(nums[0]),parseFloat(nums[1])]);
    }
    
    lineNr++;
});

rl.on("close", () => {
    //console.log(arr);

    var sum = 0.0;
    for(let i = 0; i < arr.length; i++) {
        let curArr = arr[i];
        sum += curArr[0] * curArr[1];
    }

    console.log(sum.toFixed(3));
 });