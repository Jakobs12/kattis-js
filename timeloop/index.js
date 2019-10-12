const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let n = 0;
rl.on('line', (line) => {
    if(line != "")
        n = parseInt(line);

    
});

rl.on("close", () => {
    for(let i = 1; i <= n; i++) {
        console.log(i + " Abracadabra")
    }
 })