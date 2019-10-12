const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let s = "";
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
rl.on('line', (line) => {
    s = line;

 });

 rl.on("close", () => {
    let first = s.substring(0, s.length/2);
    let snd = s.substring(s.length/2, s.length);

    // Get sum
    let firstSum = 0;
    for(let i = 0; i < first.length; i++) {
        firstSum += alphabet.indexOf(first[i]);
    }
    let sndSum = 0;
    for(let i = 0; i < snd.length; i++) {
        sndSum += alphabet.indexOf(snd[i]);
    }

    // rotate them
    let firstR = "";
    for(let i = 0; i < first.length; i++) {
        firstR += alphabet[(firstSum+ alphabet.indexOf(first[i])) % 26];
    }
    let sndR = "";
    for(let i = 0; i < snd.length; i++) {
        sndR += alphabet[(sndSum+ alphabet.indexOf(snd[i])) % 26];
    }
    
    let res = "";
    for(let i = 0; i < first.length; i++) {
        let firstIndex = alphabet.indexOf(firstR[i]);
        let sndIndex = alphabet.indexOf(sndR[i]);
        res += alphabet[(firstIndex+sndIndex) % 26]
    }
    console.log(res);
 })