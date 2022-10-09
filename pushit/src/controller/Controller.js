import Model from '../model/Model.js';

export function move(model, dir) {
    if (model.puzzle.canMove(dir)) {

        model.puzzle.move(dir);
        model.numMoves += 1;
        return model.copy();
    }
    else return model;
}

export function reset(model) {
    return new Model(model.info);
}