let score = 0
let gameActive = false
let auth = {}
let currentHighScore = 0

const statusText = document.querySelector('.status')
const btnStart = document.querySelector(".btnStart")
const backgroundContainer = document.querySelector(".backgroundContainer")
const scoreText = document.querySelector(".score")
const welcomeMsg = document.querySelector(".welcome")
const highscoreMsg = document.querySelector(".highscore")

const clickhandler = (e, config) => {
    if (e.target !== this) {
        score = Math.round((score - config.scorePenalty) * 100) / 100
        scoreText.innerHTML = "Current Game Score: " + score.toString()
    }
}
const deactivateTargets = () => {
    backgroundContainer.classList.add('hide')

    document.querySelectorAll('.target').forEach(item => {
        item.classList.add('hide')

        item.removeEventListener('click', () => {
            score++;
            item.classList.add('hide')
            setTimeout(() => {
                if (gameActive) {
                    placeTarget()
                }
            }, config.timeBetweenTargets)
        })
    })
}

const startGame = (config) => {
    score = 0
    scoreText.innerHTML = "Current Game Score: " + score.toString()
    gameActive = true
    activateTargets(config)
    gameCountDown(config)
    backgroundContainer.classList.remove('hide')
}

const endGame = (config) => {
    gameActive = false
    deactivateTargets(config)
    scoreText.innerHTML = "Current Game Score: " + score.toString()
    btnStart.classList.remove('hide')

    backgroundContainer.classList.add('hide')
    //TODO send score to server
    updateHighscore(score)
}

const updateHighscore = async (highScore) => {

    if (currentHighScore < highScore) {
        const response = await fetch('/leaderboard/submitScore', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: auth.username, score: highScore })
        })
        const responseJSON = await response.json();

        if (responseJSON.status == "SUCCESS") {
            highscoreMsg.innerHTML = "Your Highscore: " + highScore
            statusText.innerHTML = `<p class="sp">Congrats! New Highscore of ${highScore}</p><p class="sp">You should play again</p>`
        } else {
            console.log(responseJSON)
        }

    }

}

const startCountDown = (config) => {
    let count = 3
    let downloadTimer = setInterval(() => {
        if (count == 0) {
            statusText.innerHTML = '<p class="sp">Get Ready!</p><p class="sp">GO!</p>'
            startGame(config)
            clearInterval(downloadTimer)
        }
        statusText.innerHTML = `<p class="sp">Get Ready!</p><p class="sp">${count.toString()}</p>`;
        count--
    }, 1000)
}

const gameCountDown = (config) => {
    let count = config.gameTime
    let downloadTimer = setInterval(() => {
        if (count <= 0) {
            statusText.innerHTML = `<p class="sp">Game Over!</p><p class="sp">You Should Play Again!!</p>`;
            clearInterval(downloadTimer)
            endGame(config)
        }
        if (count > 0) {
            statusText.innerHTML = `<p class="sp">click the dots as fast as you can!"</p> <p class="sp">${count.toString()}s remaining!</p>`;
        }
        count--
    }, 1000)
}

const placeTarget = (item) => {
    item.classList.remove('hide')
    const targetDiameter = item.offsetWidth
    const viewWidth = backgroundContainer.offsetWidth
    const viewHeight = backgroundContainer.offsetHeight
    const percentX = Math.round(targetDiameter / viewWidth * 100)
    const percentY = Math.round(targetDiameter / viewHeight * 100) - 3
    let x = Math.floor(Math.random() * (100 - percentX))
    let y = Math.floor(Math.random() * (100 - percentY))
    item.style['top'] = `${x}%`
    item.style['left'] = `${y}%`
}
const activateTargets = (config) => {

    document.querySelectorAll('.target').forEach(item => {
        item.classList.add('hide')

        // init position
        setTimeout(() => {
            placeTarget(item)
        }, Math.round(Math.random() * 2500, 2))
    })
}

window.onload = async () => {
    auth = JSON.parse(localStorage.getItem('auth'))

    const response = await fetch(`/user/getHighscore/${auth.username}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const responseJSON = await response.json()
    const data = JSON.parse(responseJSON.data)

    currentHighScore = data.highscore
    welcomeMsg.innerHTML = "Welcome, " + data.username
    highscoreMsg.innerHTML = "Your Highscore: " + currentHighScore
}

const init = () => {
    const config = {
        gameTime: 15, //seconds
        timeBetweenTargets: 250, //milliseconds
        scorePenalty: .4
    }

    deactivateTargets()


    btnStart.addEventListener('click', () => {
        btnStart.classList.add('hide')
        startCountDown(config)
    })

    backgroundContainer.addEventListener('click', e => clickhandler(e, config))

    document.querySelectorAll('.target').forEach(item => {
        item.addEventListener('click', () => {
            score = Math.round((score + 1) * 100) / 100
            scoreText.innerHTML = "Current Game Score: " + score.toString()
            item.classList.add('hide')
            setTimeout(() => {
                if (gameActive) {
                    placeTarget(item)
                }
            }, config.timeBetweenTargets)
        })
    })

    scoreText.innerHTML = "Current Game Score:"
    statusText.innerHTML = `<p class="sp">AIM TRAINER!</p> <p class="sp">press start to begin</p>`;
}

init()
