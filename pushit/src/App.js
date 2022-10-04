import logo from './logo.svg';
import React from 'react';
import './App.css';
import { layout } from './Layout.js';
import { redrawCanvas } from './boundary/Boundary.js'
import Model from './model/Model.js';
import {configuration_1} from './model/Puzzle.js';
import {Up, Down, Left, Right} from './model/Model.js';
import {move} from './controller/Controller.js';

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
  /*
  const handleClick = (e) => {
    let newModel = selectSquare(model, canvasRef.current, e);
    setModel(newModel);
  }

  const extendHandler = (direction) => {
    let newModel = extend(model, direction);
    setModel(newModel);
  }

  const resetHandler = (levelNum) => {
    let newModel = reset(model, levelNum);
    setModel(newModel);
  }
*/

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
                  //</div>disabled={!model.puzzle.canExtend(Up)}
                  >^
          </button>

          <button style={layout.leftbutton} 
                  onClick={(e) => moveHandler(Left)} 
                  //</div>disabled={!model.puzzle.canExtend(Left)}
                  >&lt;
          </button>

          <button style={layout.rightbutton}
                  //data-testid="rightbutton" 
                  onClick={(e) => moveHandler(Right)} 
                  //disabled={!model.puzzle.canExtend(Right)} 
                  >&gt;
          </button>

          <button style={layout.downbutton} 
                  data-testid="downbutton"
                  onClick={(e) => moveHandler(Down)} 
                  //disabled={!model.puzzle.canExtend(Down)} 
                  >v
          </button>
      </div>

      <div style={layout.resetButtons}>
        
          <button style={layout.level1button} 
                  data-testid="l1button"
                  //onClick={(e) => resetHandler(1)}
                  //disabled={model.isLevel(1)} 
                  >Level1
          </button>
          <button style={layout.level2button} 
                  data-testid="l2button"
                  //onClick={(e) => resetHandler(2)} 
                  //disabled={model.isLevel(2)} 
                  >Level2
          </button>
          <button style={layout.level3button} 
                  data-testid="l3button"
                  //onClick={(e) => resetHandler(3)} 
                  //disabled={model.isLevel(3)} 
                  >Level3
          </button>

          <button style={layout.resetbutton} 
                  data-testid="resetbutton"
                 // onClick={(e) => resetHandler(0)} 
                  >Reset
          </button>

      </div>

    </main>
  );
}


export default App;
