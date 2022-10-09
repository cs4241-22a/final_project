window.onload = () => {

  const startBtn = document.getElementById('startBtn')
  const statusMsg = document.getElementById('gameStatus')
  const resultsMsg = document.getElementById('gameResults')
  
  const canvas = document.getElementById('gameCanvas')
  const cWidth = canvas.style.width
  const cHeight = canvas.style.height

  let buttonsClicked = 0
  let startTs = null
  let totalTimeTs = null

  // start game, clear previous state of game
  startBtn.onclick = startGame
  startGame = (e) => {
    e.preventDefault()

    // reset game
    buttonsClicked = 0
    canvas.innerHTML = ''

    // place game button on canvas
    const btn = document.createElement('button')
    canvas.appendChild(btn)
    btn.id = 'gameButton'
    btn.className = 'btn btn-info'
    btn.innerHTML = 'CLICK ME'
    btn.onclick = this.handleButtonClick
    
    /* set position x,y inside canvas */
    btn.style.position = 'absolute'
    const x = Math.round(Math.random().toPrecision(2) * cWidth)
    const y = Math.round(Math.random().toPrecision(2) * cHeight)
    btn.style.left = x
    btn.style.top = y

    // capture start time
    startTs = Date.now()

  }

  handleButtonClick = (e) => {
    e.preventDefault()

    // increment counter 
    buttonsClicked++

    // check if win condition satisfied
    if (buttonsClicked === 10) {
      this.gameOver()

    } else {
      // move button to random place within canvas 
      const btn = document.getElementById('gameButton')
      const x = Math.round(Math.random().toPrecision(2) * cWidth)
      const y = Math.round(Math.random().toPrecision(2) * cHeight)
      btn.style.left = x
      btn.style.top = y
    }
  }

  // end game, capture game stats
  gameOver = (e) => {
    e.preventDefault()

    totalTimeTs = (Date.now() - startTs)
    startTs = null
    canvas.innerHTML = ''

    // display results
    const msgs = ['Congratulations!', 'Nice work!', 'Good job!', 'Great work!']
    statusMsg.innerHTML = msgs[Math.round(Math.random*3)]
    resultsMsg.innerHTML = `Total time: ${totalTimeTs*1000} sec`
  }

}