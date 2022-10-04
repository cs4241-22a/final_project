export class Coordinate {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}

export class MoveType {
    constructor(dr, dc) {
        this.deltar = dr;
        this.deltac = dc;
    }  
}

export const Down = new MoveType(1, 0, "down");
export const Up = new MoveType(-1, 0, "up");
export const Left = new MoveType(0, -1, "left");
export const Right = new MoveType(0, 1, "right");
export const NoMove = new MoveType(0, 0, "*");  // no move is possible

export class Square {

    constructor(row, column, color) {
        this.row = row;
        this.column = column;
        this.color = color;
    }

    location() {
        return new Coordinate(this.row, this.column);
    }

    copy() {
        let s = new Square(this.row, this.column, this.color)
        return s;
    }

}



export class Puzzle {
    constructor(rowNum, colNum) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.squares = this.init();
    }

    init() {
        var allSquares = [];
        for (let row = 0; row < this.rowNum; row++) {
            for (let col = 0; col < this.colNum; col++) {
                allSquares.push(new Square(row, col, "white"));
            }
        }
        return allSquares;
    }
}


export default class Model {
    constructor(info) {
        this.initialize(info);
        this.info = info;
    }

    
    initialize(info) {
        let numRows = parseInt(info.numRows);
        let numCols = parseInt(info.numCols);
        
        this.puzzle = new Puzzle(numRows, numCols);
        
        for (let s of info.squares) {
            let r = parseInt(s.row);
            let c = parseInt(s.column);
            this.puzzle.squares[r*numCols+c].color = s.color;
        }
        this.victory = false;
        this.level = parseInt(info.level);
    }
}