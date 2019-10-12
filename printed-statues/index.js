const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let statues = 0;
rl.on('line', (line) => {
    statues = parseInt(line);

 });

 rl.on("close", () => {
    
    let amountOfDays = 1;
    let copiers = 1;
    while(statues > copiers) {
        copiers *= 2;
        amountOfDays++;
    }
    console.log(amountOfDays)

  });

  class Graph { 
    // defining vertex array and 
    // adjacent list 
    constructor(noOfVertices) 
    { 
        this.noOfVertices = noOfVertices; 
        this.AdjList = new Map(); 
    } 
  
    // functions to be implemented 
  
    // addVertex(v) 
    addVertex(v) 
    { 
        // initialize the adjacent list with a 
        // null array 
        this.AdjList.set(v, []); 
    } 
    // addEdge(v, w) 
    // printGraph() 
  
    // bfs(v) 
    // dfs(v) 
} 