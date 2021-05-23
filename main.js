(async function() {
    var drawGrid = function(w, h, id, grid, rectSize) {
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
                ctx.fillRect(x, y, rectSize, rectSize);
                ctx.stroke();
                x += rectSize
            }
            x = 0
            y += rectSize
        }
    };
    var initGrid = function(w, h, threshold) {
        var grid = []
        for (var i = 0; i < h; i++) {
            grid[i] = []
            for (var j = 0; j < w; j++) {
                if (Math.random() > threshold) {
                    grid[i][j] = 1
                } else {
                    grid[i][j] = 0
                }
            }
        }
        return grid
    }
    var updateGrid = function(grid) {
        copyGrid = JSON.parse(JSON.stringify(grid))
        for (var row = 0; row < copyGrid.length; row++) {
            for (var col = 0; col < copyGrid[row].length; col++) {
                c = getAdjacentAliveCount(copyGrid, row, col)
                if (c < 2 || c > 3) {
                    grid[row][col] = 0
                }
                if (c == 3) {
                    grid[row][col] = 1
                }
            }
        }
    }
    var getAdjacentAliveCount = function(grid, cellRowIndex, cellColumnIndex) {
        maxColumnIndex = grid[0].length - 1
        maxRowIndex = grid.length - 1
        //we start off with the top left adjacent cell
        currentCellRowIndex = cellRowIndex - 1
        currentCellColumnIndex = cellColumnIndex - 1
        count = 0
        for (var i = currentCellRowIndex; i < currentCellRowIndex + 3; i++) {
            if (i < 0 || i > maxRowIndex) {
                continue
            }
            for (var j = currentCellColumnIndex; j < currentCellColumnIndex + 3; j++) {
                if (j < 0 || j > maxColumnIndex) {
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
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
    rectSize = 15
    threshold = 0.7
    w = window.innerWidth
    h = window.innerHeight
    grid = initGrid(Math.floor(w / rectSize), Math.floor(h / rectSize), threshold)
    while (true) {
        await sleep(50)
        drawGrid(w, h, "grid", grid, rectSize)
        updateGrid(grid)
    }
})();
