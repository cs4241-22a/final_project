import Model from '../model/Model.js';

export function move(model, dir) {
    if (model.puzzle.canMove(dir)) {

        model.puzzle.move(dir);
        return model.copy();
    }
    else return model;
}