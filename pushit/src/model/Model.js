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

    remove() {
        this.color = "white";
    }

}

export class Player {
    constructor (row, col) {
        this.row = row;
        this.column = col;
    }

    location() {
        return new Coordinate(this.row, this.column);
    }
    copy() {
        let s = new Player(this.row, this.column)
        return s;
    }
    move(dir) {
        this.row = this.row + dir.deltar;
        this.column = this.column + dir.deltac;
    }
}

export class Puzzle {
    constructor(rowNum, colNum) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.squares = this.init();
        this.player = new Player(0, 0);
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

    setPlayer(row, col) {
        this.player.row = row;
        this.player.column = col;
    }

    clone() {
        let copy = new Puzzle(this.rowNum, this.colNum);
        copy.squares = [];
        for (let s of this.squares) {
            let dup = s.copy();
            copy.squares.push(dup);
            if (s === this.selected) {
                copy.selected = dup;
            }
        }
        copy.player = this.player.copy();
        return copy;
    }

    move(dir) {
        let player = this.player;
        let newRow = player.row + dir.deltar;
        let newCol = player.column + dir.deltac;
        let adjSquare = this.getSquare(newRow, newCol);
        if (this.canRemove(dir)) {
            let farSquare = this.getSquare(newRow + dir.deltar, newCol + dir.deltac);
            adjSquare.color = "white";
            farSquare.color = "white";
            this.setPlayer(newRow, newCol);
        }
        else if (this.canPush(dir)) {
            let farSquare = this.getSquare(newRow + dir.deltar, newCol + dir.deltac);
            farSquare.color = adjSquare.color;
            adjSquare.color = "white";
            this.setPlayer(newRow, newCol);
        }
        else if (this.canMoveToEmpty(dir)) {
            this.setPlayer(newRow, newCol);
        }
    }

    getSquare(row, col) {
        return this.squares[row*this.colNum+col];
    }

    canMove(dir) {
        return this.canMoveToEmpty(dir) || this.canPush(dir) || this.canRemove(dir);
    }

    canMoveToEmpty(dir) {
        let player = this.player;
        let newRow = player.row + dir.deltar;
        let newCol = player.column + dir.deltac;

        if ((newRow >= 0 && newRow < this.rowNum) && (newCol >= 0 && newCol < this.colNum)) {
            let adjSquare = this.getSquare(newRow, newCol);
            if (adjSquare.color === "white") return true;
        } 
        else return false;

    }

    canPush(dir) {
        let player = this.player;
        let newRow = player.row + dir.deltar;
        let newCol = player.column + dir.deltac;

        if ((newRow >= 0 && newRow < this.rowNum) && (newCol >= 0 && newCol < this.colNum)) {
            let adjSquare = this.getSquare(newRow, newCol);
            if ((newRow + dir.deltar>= 0 && newRow+ dir.deltar < this.rowNum) && (newCol+ dir.deltac >= 0 && newCol+ dir.deltac < this.colNum)) {
                let farSquare = this.getSquare(newRow + dir.deltar, newCol + dir.deltac);
                if (!(adjSquare.color === "white") && farSquare.color === "white") return true;
            }
            else return false;
        } 
        else return false;
    }

    canRemove(dir) {
        let player = this.player;
        let newRow = player.row + dir.deltar;
        let newCol = player.column + dir.deltac;

        if ((newRow >= 0 && newRow < this.rowNum) && (newCol >= 0 && newCol < this.colNum)) {
            let adjSquare = this.getSquare(newRow, newCol);
            if ((newRow + dir.deltar>= 0 && newRow+ dir.deltar < this.rowNum) && (newCol+ dir.deltac >= 0 && newCol+ dir.deltac < this.colNum)) {
                let farSquare = this.getSquare(newRow + dir.deltar, newCol + dir.deltac);
                if (adjSquare.color === farSquare.color) return true;
            }
            else return false;
        } 
        else return false;
    }
}


export default class Model {
    constructor(info) {
        this.initialize(info);
        this.info = info;
    }

    copy() {
        let m = new Model(this.info);
        m.puzzle = this.puzzle.clone();
        m.victory = this.victory;
        m.level = this.level;
        return m;
    }
    
    initialize(info) {
        let numRows = parseInt(info.numRows);
        let numCols = parseInt(info.numCols);

        let arow = parseInt(info.actor.row);
        let acol = parseInt(info.actor.column);
        
        this.puzzle = new Puzzle(numRows, numCols);
        
        for (let s of info.squares) {
            let r = parseInt(s.row);
            let c = parseInt(s.column);
            this.puzzle.squares[r*numCols+c].color = s.color;
        }
        this.puzzle.setPlayer(arow, acol);
        this.victory = false;
        this.level = parseInt(info.level);
        
    }
}