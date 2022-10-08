window.onload = () => {

  const startBtn = document.getElementById('startBtn')
  const canvas = document.getElementById('gameCanvas')

  var buttonsClicked = 0
  var startTs = 0

  // start game, clear previous stats if any
  startGame = (e) => {
    e.preventDefault()

    // reset stats
    this.setState({totalTimeSeconds: 0})
    this.setState({buttonsClicked: 0})

    // clear canvas
    const canvas = document.getElementById('mouseAccuracyCanvas')
    canvas.innerHTML = ''

    // place game button on canvas
    const btn = document.createElement('button')
    btn.id = 'gameButton'
    btn.className = 'btn'
    btn.onclick = this.handleButtonClick
    const x = Math.random().toPrecision(2)
    const y = Math.random().toPrecision(2)
    /* set btn style to absolute position x,y */

  }

  handleButtonClick = (e) => {
    e.preventDefault()

    // increment counter 
    const i = this.state.buttonsClicked
    this.setState({buttonsClicked: i+1})

    // check if win condition satisfied
    if (i+1 === 10) {
      this.gameOver()

    } else {
      // move button to random place within canvas 
      const x = Math.random().toPrecision(2)
      const y = Math.random().toPrecision(2)
      const btn = document.getElementById('gameButton')
      /* set btn style to absolute position x,y */
    }
  }

  // end game, capture game stats
  gameOver = (e) => {
    e.preventDefault()

    // clear canvas and display completion message
  }

}