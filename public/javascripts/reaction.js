window.onload = function () {
    let startTs = null

    const gameWindow = document.getElementById('gameWindow')
    const activeStatus = document.getElementById('activeStatus')

    const startBtn = document.getElementById("startBtn");
    startBtn.addEventListener('click', function () {
        startBtn.disabled = true;
        playGame()
    })

    function playGame() {
        // delay between 0 and 2 sec
        let randDelay = (Math.random() * 3000) + 1500
        gameWindow.addEventListener('click', () => {failed = true; failGame();})
        gameWindow.style.backgroundColor = 'red'
        activeStatus.innerText = "Wait..."
        let failed = false
        
        setTimeout(function () {
            if (!failed) {
                gameWindow.addEventListener('click', endGame)
                gameWindow.style.backgroundColor = 'lightgreen'      // doesnt work?
                activeStatus.innerText = "CLICK ME!"
                startTs = Date.now()
            }
        },
        randDelay)
    }
    
    function failGame(){
        gameWindow.removeEventListener('click', failGame)
        startBtn.disabled = false
        gameWindow.style.backgroundColor = "lightslategrey"
        activeStatus.innerText = `Too Fast! Wait for Green!`
    }

    function endGame () {
        score = (Date.now() - startTs) / 1000
        startTs = null
        gameWindow.removeEventListener('click', endGame)

        startBtn.disabled = false
        activeStatus.innerText = `Reaction time: ${score} sec`

        var result = {
            owner_id: user,
            game_type: game,
            score: score 
        }
        console.log(result)

        fetch( '/addResult', {
            method:'POST',
            headers: {"X-CSRF-TOKEN": csrf, "Content-Type": "application/json"},
            body: JSON.stringify(result)
        }).then(async function( response ) {
            var data = await response.json()
            let dataScore = data.map(gameRes => gameRes.score);

            console.log(dataScore);
            
            window.dispatchEvent(new CustomEvent("updateData", {detail: {data: dataScore, myScore : result.score}}))
        })    }
    
}