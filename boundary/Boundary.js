const LEVELOFFSETH = 5;
const BOXSIZE = 50;
const OFFSET = 3;
var isDraw = false;

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    //If (x,y) is contained in the rectangle
    contains(x, y) {
        return x >= this.x && x <= (this.x + this.width) && y >= this.y && y <= (this.y + this.height);
    }
}


/**
 * redraw the canvas from model
 * @param {*} model 
 * @param {*} canvasObj 
 * @param {*} appObj 
 * @returns 
 */
function redrawCanvas(model, canvasObj, appObj) {
    //for testing purposes
    if (typeof canvasObj === "undefined") {return;}

    const ctx = canvasObj.getContext('2d');

    //for testing purposes
    if (ctx === null) {return;}

    //clear the canvas area
    ctx.clearRect(0,0,canvasObj.width, canvasObj.height)
  
    if (model.puzzle && !model.victory) {
      isDraw = false;
      drawPuzzle(ctx, model.puzzle);
    }
    else {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvasObj.width, canvasObj.height);  
      ctx.fillStyle = "red";
      ctx.font = "30px Segoe UI";
      ctx.textAlign = "center";
      ctx.fillText("FINISH!",255,240);
    }
}



function drawPuzzle(ctx, puzzle) {
    
    const img = new Image();
    img.src = "./assets/2.jpg"
    ctx.shadowColor = "black";

    puzzle.squares.forEach(square => {
        let rect = computeRectangle(square);
        ctx.fillStyle = square.color;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    })

    let rect = computeRectangle(puzzle.player);
    img.onload = function() {
        if (!isDraw) {
        
            ctx.drawImage(img, rect.x, rect.y, rect.width, rect.height);
            isDraw = true
        }
    }
}

function computeRectangle(square) {
    let c = square.location();
    let rect = new Rectangle(BOXSIZE*c.column + OFFSET + LEVELOFFSETH, BOXSIZE*c.row + OFFSET + LEVELOFFSETH, BOXSIZE-2*OFFSET, BOXSIZE-2*OFFSET);
    return rect;
}