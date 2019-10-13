const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let lineNr = 0;
let arr = Array();
let honey, rows, cols;
rl.on('line', (line) => {
    let nums = line.split(' ');

    if(lineNr == 0) {
        honey = parseInt(nums[0]);
        rows = parseInt(nums[1]);
        cols = parseInt(nums[2]);
    } else {
        // shift() removes first element
        if(lineNr % 2 == 0) {
            nums.shift();
        }

       arr.push(nums);
    }
    lineNr++;
});

let edges = Array();
let dots = 0;
var map = {};

rl.on("close", () => {

    findSolution();

})

function findSolution() {
    // Only run through second last line?
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            let leftIndex = i % 2 == 0 ? j-1 : j;

            let currentIndex =  calculateNumberPos(i, cols, j);
            let belowLeft = calculateNumberPos(i+1, cols, leftIndex);
            let belowRight = calculateNumberPos(i+1, cols, leftIndex+1);

            if(arr[i][j] == '#') {
                continue;
            } else {
                map[currentIndex] = dots;
                dots++;
            }

            if(i % 2 == 0) {
                if(i != (rows-1) && j != 0 && arr[i+1][leftIndex] == '.') 
                    edges.push([currentIndex,belowLeft])
                
                if(i != (rows-1) && arr[i+1][leftIndex+1] == '.')
                    edges.push([currentIndex,belowRight])

            } else {
                if(i != (rows-1) && arr[i+1][leftIndex] == '.') 
                    edges.push([currentIndex,belowLeft])
                
                if(i != (rows-1) && j != (cols-1) && arr[i+1][leftIndex+1] == '.')
                    edges.push([currentIndex,belowRight])
            }

            if(j != (cols-1) && arr[i][j+1] == '.')
                edges.push([currentIndex,calculateNumberPos(i, cols, j+1)])
        }
    }

    var newEdges = edges.map(mapToVertexNumbers);

    // UNION FIND
    var VERTEX_COUNT = dots;

    // Link all the nodes together
    var forest = new UnionFind(VERTEX_COUNT)
    for(var i=0; i<newEdges.length; ++i) {
        forest.link(newEdges[i][0], newEdges[i][1])
    }

    // Label components
    var labels = new Array(VERTEX_COUNT)
    let countArr = Array();
    for(var i=0; i<VERTEX_COUNT; ++i) {
        labels[i] = forest.find(i)
        countArr[labels[i]] = 0;
    }
    for(var i=0; i<VERTEX_COUNT; ++i) {
        labels[i] = forest.find(i)
        countArr[labels[i]] = countArr[labels[i]] + 1;
    }
    countArr = countArr.sort((a,b) => b-a)

    let honeyDistributionService = 0;
    
    /*countArr.forEach(v => {
        if(honey > 0) {
            honey -= v;
            honeyDistributionService++;
        }
    })*/
    while(honey > 0) {
        honey -= countArr[honeyDistributionService];
        honeyDistributionService++;
    }

    console.log(honeyDistributionService)
}

function mapToVertexNumbers(innerEdgeArr) {
    return [map[innerEdgeArr[0]], map[innerEdgeArr[1]]];
}

function calculateNumberPos(rows1, cols1, colNumber) {
    return (rows1 * cols1) + colNumber;
}

    

function UnionFind(count) {
    this.roots = new Array(count);
    this.ranks = new Array(count);
    
    for(var i=0; i<count; ++i) {
      this.roots[i] = i;
      this.ranks[i] = 0;
    }
}
  
  var proto = UnionFind.prototype
  
  Object.defineProperty(proto, "length", {
    "get": function() {
      return this.roots.length
    }
})
  
  proto.makeSet = function() {
    var n = this.roots.length;
    this.roots.push(n);
    this.ranks.push(0);
    return n;
}
  
  proto.find = function(x) {
    var x0 = x
    var roots = this.roots;
    while(roots[x] !== x) {
      x = roots[x]
    }
    while(roots[x0] !== x) {
      var y = roots[x0]
      roots[x0] = x
      x0 = y
    }
    return x;
}
  
  proto.link = function(x, y) {
    var xr = this.find(x)
      , yr = this.find(y);
    if(xr === yr) {
      return;
    }
    var ranks = this.ranks
      , roots = this.roots
      , xd    = ranks[xr]
      , yd    = ranks[yr];
    if(xd < yd) {
      roots[xr] = yr;
    } else if(yd < xd) {
      roots[yr] = xr;
    } else {
      roots[yr] = xr;
      ++ranks[xr];
    }
  }
