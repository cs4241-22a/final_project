// import Model from '../model/Model.js';

function move(model, dir) {
  if (model.puzzle.canMove(dir)) {
    if (firstMove == true) {
      startTimer();
      firstMove = false;
    }

    model.puzzle.move(dir);
    model.numMoves += 1;
    model.isWin();
    return model.copy();
  } else return model;
}

function reset(model) {
  firstMove = true;
  return new Model(model.info);
}
