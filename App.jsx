// import logo from './logo.svg';
// import React from 'react';
// import { layout } from './Layout.js';
// import { redrawCanvas } from './boundary/Boundary.js'
// import Model from './model/Model.js';
// import {configuration_1} from './model/Puzzle.js';
// import {Up, Down, Left, Right} from './model/Model.js';
// import {move, reset} from './controller/Controller.js';


let [model, setModel] = null;

function App() {
  //default to level 1
  [model, setModel] = React.useState(new Model(level1));
  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model]);

  const moveHandler = (direction) => {
    let newModel = move(model, direction);
    setModel(newModel);
  }

  const resetHandler = () => {
        let newModel = reset(model);
        setModel(newModel);
  }

  return(
    <main ref={appRef}>
      <canvas tabIndex="1"
              ref={canvasRef}
              width={layout.canvas.width}
              height={layout.canvas.height}
              />

      <div style={layout.buttons}>
          <button style={layout.upbutton} 
                  onClick={(e) => moveHandler(Up)} 
                  disabled={!model.puzzle.canMove(Up)}
                  >^
          </button>

          <button style={layout.leftbutton} 
                  onClick={(e) => moveHandler(Left)} 
                  disabled={!model.puzzle.canMove(Left)}
                  >&lt;
          </button>

          <button style={layout.rightbutton}
                  onClick={(e) => moveHandler(Right)} 
                  disabled={!model.puzzle.canMove(Right)} 
                  >&gt;
          </button>

          <button style={layout.downbutton} 
                  onClick={(e) => moveHandler(Down)} 
                  disabled={!model.puzzle.canMove(Down)} 
                  >v
          </button>
      </div>

      <div style={layout.resetButtons}>
        <label className="box">
                {"number of moves: " + model.numMoves}
        </label>
        <button className="button is-danger" 
                onClick={(e) => resetHandler()} 
                >Reset
        </button>
        <button className="button is-info" 
                //onClick={(e) => resetHandler()} 
                >Start Timer
        </button>

      </div>

    </main>
  );
}


// export default App;
