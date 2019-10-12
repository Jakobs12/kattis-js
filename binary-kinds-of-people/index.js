const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 

let counter = 0;
let mapIndexCounter = 0;
let mapRows = 0, mapCols = 0;
let map = Array();
rl.on('line', (line) => {
    if(counter == 0) {
        let strArr = line.split(" ");
        mapRows = parseInt(strArr[0])
        mapCols = parseInt(strArr[1])
    } else if(counter == 1) {
        let localCounter = 0;
        for(let i = 0; i < mapCols; i++) {
            map.push([mapIndexCounter, line[i]])
            mapIndexCounter++;
        }
 

        counter = 1
}
    
    
    
    counter++;
 });

 rl.on("close", () => {
    console.log(mapCols);

});


// create a graph class 
class Graph { 
    // defining vertex array and 
    // adjacent list 
    constructor(noOfVertices) 
    { 
        this.noOfVertices = noOfVertices; 
        this.AdjList = new Map(); 
    } 
  
    // functions to be implemented 
  
    addVertex(v) 
    { 
        // initialize the adjacent list with a 
        // null array 
        this.AdjList.set(v, []); 
    } 
    // add edge to the graph 
    addEdge(v, w) 
    { 
        // get the list for vertex v and put the 
        // vertex w denoting edge between v and w 
        this.AdjList.get(v).push(w); 
    
        // Since graph is undirected, 
        // add an edge from w to v also 
        this.AdjList.get(w).push(v); 
    } 
    // printGraph() 
  
    // function to performs BFS 
    bfs(startingNode) 
    { 
    
        // create a visited array 
        var visited = []; 
        for (var i = 0; i < this.noOfVertices; i++) 
            visited[i] = false; 
    
        // Create an object for queue 
        var q = new Queue(); 
    
        // add the starting node to the queue 
        visited[startingNode] = true; 
        q.enqueue(startingNode); 
    
        // loop until queue is element 
        while (!q.isEmpty()) { 
            // get the element from the queue 
            var getQueueElement = q.dequeue(); 
    
            // passing the current vertex to callback funtion 
            console.log(getQueueElement); 
    
            // get the adjacent list for current vertex 
            var get_List = this.AdjList.get(getQueueElement); 
    
            // loop through the list and add the element to the 
            // queue if it is not processed yet 
            for (var i in get_List) { 
                var neigh = get_List[i]; 
    
                if (!visited[neigh]) { 
                    visited[neigh] = true; 
                    q.enqueue(neigh); 
                } 
            } 
        } 
    } 
    // dfs(v) 
}