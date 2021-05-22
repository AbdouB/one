var drawGrid = function(w, h, id, grid, size) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = w;
    ctx.canvas.height = h;


    x = 0
    y = 0
		for (var row = 0; row < grid.length; row++) {
      for (var col = 0; col < grid[row].length; col++) {
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF"
        if (grid[row][col] == 0) {
          ctx.fillStyle = "#000000"
        }
        ctx.fillRect(x, y, size, size);
        ctx.stroke();

        x += size
      }
      x = 0
      y += size
    }
};


var initGrid = function(w, h){
	var grid = []
	for (var i = 0; i < h; i++){
  	grid[i] = []
    for (var j = 0; j < w; j++){
      if (Math.random() > 0.95) {
        grid[i][j] = 1
      }else{
        grid[i][j] = 0
      }
    }
  }
  return grid
}
var updateGrid = function(grid){
	for (var row = 0; row < grid.length; row++) {
      for (var col = 0; col < grid[row].length; col++) {
						c = getAdjacentAliveCount(grid, row, col)
            if (c < 2 || c > 3) {
            	grid[row][col] = 0
            }
            if (c == 3) {
              grid[row][col] = 1
            }
      }
    }
} 

var getAdjacentAliveCount = function(grid, cellRowIndex, cellColumnIndex){
	maxColumnIndex = grid[0].length - 0
  maxRowIndex = grid.length - 0

  //we start off with the top left adjacent cell
  currentCellRowIndex = cellRowIndex - 1
  currentCellColumnIndex = cellColumnIndex - 1
  count = 0  
  
  for (var i = currentCellRowIndex; i < currentCellRowIndex + 3; i++) {
  	if (i < 0 || i >= maxRowIndex) {
    	continue
    }
  	for (var j = currentCellColumnIndex; j < currentCellColumnIndex + 3; j++) {
      if (j < 0 || j >= maxColumnIndex) {
        continue
      }
      if (i == cellRowIndex && j == cellColumnIndex) {
      	continue
      }
      count += grid[i][j]
  	}
  }

  return count
}

async function main(){
	rectSize = 15
  grid = initGrid(window.innerWidth/rectSize, window.innerHeight/rectSize)
  
	while (true) {
   	await sleep(50)
    drawGrid(window.innerWidth, window.innerHeight, "grid", grid, rectSize)
    updateGrid(grid)
   
  }
  console.log("done")

  
}
const sleep = (delay) => new Promise((resolve)=>setTimeout(resolve, delay))

main()

