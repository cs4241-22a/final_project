// import Model from '../model/Model.js';

function move(model, dir) {
    if (model.puzzle.canMove(dir)) {

        model.puzzle.move(dir);
        model.numMoves += 1;
        return model.copy();
    }
    else return model;
}

function reset(model) {
    return new Model(model.info);
}