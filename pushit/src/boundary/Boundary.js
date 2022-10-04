const LEVELOFFSETH = 20;
const BOXSIZE = 55;
const OFFSET = 3;



export class Rectangle {
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
 export function redrawCanvas(model, canvasObj, appObj) {
    //for testing purpose
    if (typeof canvasObj === "undefined") {return;}

    const ctx = canvasObj.getContext('2d');

    //for testing purpose
    if (ctx === null) {return;}

    //clear the canvas area
    ctx.clearRect(0,0,canvasObj.width, canvasObj.height)
  
    if (model.puzzle && !model.victory) {

        drawPuzzle(ctx, model.puzzle);
    }
    else {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Congrats! You have won the puzzle!",40,220);
    }
}



export function drawPuzzle(ctx, puzzle) {
    
    const img = new Image();
    img.src = "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F12%2F16%2Fanime-cat-names-1204854078-2000.jpg"
    ctx.shadowColor = "black";

    puzzle.squares.forEach(square => {
        let rect = computeRectangle(square);
        ctx.fillStyle = square.color;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    })

    let rect = computeRectangle(puzzle.player);
    img.onload = function() {
        ctx.drawImage(img, 400, 150, 1200, 1200, rect.x, rect.y, rect.width, rect.height);
    }
}

export function computeRectangle(square) {
    let c = square.location();
    let rect = new Rectangle(BOXSIZE*c.column + OFFSET + LEVELOFFSETH, BOXSIZE*c.row + OFFSET + LEVELOFFSETH, BOXSIZE-2*OFFSET, BOXSIZE-2*OFFSET);
    return rect;
}