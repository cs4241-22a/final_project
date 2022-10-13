//SOURCE ONLY

let model = null
let setModel = null;

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

  //REMEMBER: if you modify this file at all, run 'npm run build' to compile the jsx to js-- 
  //this will overwrite the versions in lib
  
  return(
    <main ref={appRef}>
      <div className = "is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-space-evenly">
        <canvas tabIndex="1"
                ref={canvasRef}
                width={layout.canvas.width}
                height={layout.canvas.height}
                />
        <div className="is-flex is-align-items-center is-flex-direction-row is-justify-content-space-evenly is-flex-grow-1 box">
          <div style={layout.buttons} className = "is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center">
            <button className = "button is-size-4" 
                    style={layout.button}
                    >a
            </button>  
            <button className = "button has-background-dark has-text-white-ter is-size-4"
                      onClick={(e) => moveHandler(Up)} 
                      disabled={!model.puzzle.canMove(Up)}
                      >^
            </button>
            <button className = "button is-size-4" 
                    style={layout.button}
                    >a
            </button> 
            <button className = "button has-background-dark has-text-white-ter is-size-4"
                    onClick={(e) => moveHandler(Left)} 
                    disabled={!model.puzzle.canMove(Left)}
                    >&lt;
            </button>
            <button className = "button has-background-dark has-text-white-ter is-size-4"
                    onClick={(e) => moveHandler(Down)} 
                    disabled={!model.puzzle.canMove(Down)} 
                    >v
            </button>
            <button className = "button has-background-dark has-text-white-ter is-size-4"
                    onClick={(e) => moveHandler(Right)} 
                    disabled={!model.puzzle.canMove(Right)} 
                    >&gt;
            </button>
          </div>
          <label className="box has-background-black-ter has-text-white-ter mt-5 mr-2">
                  {"Moves: " + model.numMoves}
          </label>
          <div className="is-flex is-flex-direction-column">
            <button id="formButton" onClick={(e) => add()} className="button is-success is-large">Submit</button>
            <button className="button is-danger is-large" onClick={(e) => resetHandler()} >Reset</button>
          </div>
        </div>
      </div>
      

    </main>
  );
}
