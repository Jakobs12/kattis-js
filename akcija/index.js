const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let i = 0;
let arr = [];


rl.on('line', (line) => {
    arr.push(line);
});



rl.on("close", () => {
    for(let i = 0; i < arr.length; i++) {
        let strArr = arr[i].split(" ");
        let first = strArr[3].split(":");
        let firstHour = first[0];
        let firstMin = first[1];
        let snd = strArr[4].split(":");
        let sndHour = snd[0];
        let sndMin = snd[1];

        let calcHour = (sndHour-firstHour);
        let calcMin = (sndMin-firstMin);
        if(calcMin < 0 ) {
            calcMin = 60 - (firstMin-sndMin);
            calcHour--;
        }

        console.log(strArr[0] + " " + strArr[1] + " " + strArr[2] + " " + calcHour + " hours " + calcMin + " minutes")
        
    }
 })