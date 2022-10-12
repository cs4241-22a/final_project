window.onload = function () {
    let startTs = null

    const gameWindow = document.getElementById('gameWindow')
    const statusText = document.getElementById('statusText')
    const activeStatus = document.getElementById('activeStatus')

    const startBtn = document.getElementById("startBtn");
    startBtn.addEventListener('click', function () {
        startBtn.disabled = true;
        statusText.innerText = "Starting in 3...";
        setTimeout(function() {countdown(2)}, 1100)
    })

    function countdown(i){
        if (i !== 0){
            statusText.innerText = (i == 2) ? "Starting in 3... 2..." : (i == 1) ? "Starting in 3... 2... 1..." : "NAAA"
            i -= 1
            setTimeout(function() {countdown(i)}, 1100)
        }
        else{
            statusText.innerText = "Click when the area is green."
            playGame()
        } 
    }

    function playGame() {
        // delay between 0 and 2 sec
        let randDelay = Math.random() * 2000
        setTimeout(function () {
            gameWindow.addEventListener('click', endGame)
            gameWindow.style.backgroundColor = 'lightgreen'      // doesnt work?
            activeStatus.innerText = "CLICK ME!"
            startTs = Date.now()
            
        },
        randDelay)

    }

    function endGame () {
        score = (Date.now() - startTs) / 1000
        startTs = null
        gameWindow.removeEventListener('click', endGame)

        startBtn.disabled = false
        activeStatus.innerText = ''
        statusText.innerText = `Reaction time: ${score} sec`

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
            console.log( data )
            console.log("response ^")

            window.dispatchEvent(new CustomEvent("updateData", {detail: {data: data}}))
        })
    }
    
}