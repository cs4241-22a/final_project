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
            statusText.innerHTML = `Congrats! New Highscore of ${highScore}`
        } else {
            console.log(responseJSON)
        }

    }

}

const startCountDown = (config) => {
    let count = 3
    let downloadTimer = setInterval(() => {
        if (count == 0) {
            statusText.innerHTML = ""
            startGame(config)
            clearInterval(downloadTimer)
        }
        statusText.innerHTML = count.toString();
        count--
    }, 1000)
}

const gameCountDown = (config) => {
    let count = config.gameTime
    let downloadTimer = setInterval(() => {
        if (count <= 0) {
            statusText.innerHTML = "Game Over"
            clearInterval(downloadTimer)
            endGame(config)
        }
        if (count > 0) {
            statusText.innerHTML = count.toString() + "s remaining! click the dots as fast as you can!";
        }
        count--
    }, 1000)
}

const placeTarget = (item) => {
    item.classList.remove('hide')
    let x = Math.floor(Math.random() * 91)
    let y = Math.floor(Math.random() * 90)
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
}

init()
