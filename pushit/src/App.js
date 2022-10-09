import logo from './logo.svg';
import React from 'react';
import './App.css';
import { layout } from './Layout.js';
import { redrawCanvas } from './boundary/Boundary.js'
import Model from './model/Model.js';
import {configuration_1} from './model/Puzzle.js';
import {Up, Down, Left, Right} from './model/Model.js';
import {move, reset} from './controller/Controller.js';

var level1 = JSON.parse(JSON.stringify(configuration_1));


function App() {
  //default to level 1
  const [model, setModel] = React.useState(new Model(level1));
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
    <main style={layout.Appmain} ref={appRef}>
      <canvas tabIndex="1"
              className="App-canvas"
              data-testid="canvas"
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
                  //data-testid="rightbutton" 
                  onClick={(e) => moveHandler(Right)} 
                  disabled={!model.puzzle.canMove(Right)} 
                  >&gt;
          </button>

          <button style={layout.downbutton} 
                  data-testid="downbutton"
                  onClick={(e) => moveHandler(Down)} 
                  disabled={!model.puzzle.canMove(Down)} 
                  >v
          </button>
      </div>

      <div style={layout.resetButtons}>
        <label style={layout.text}>
                {"number moves: " + model.numMoves}
        </label>
        <button style={layout.resetbutton} 
                data-testid="resetbutton"
                onClick={(e) => resetHandler()} 
                >Reset
        </button>

      </div>

    </main>
  );
}


export default App;
