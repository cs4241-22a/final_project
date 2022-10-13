window.onload = function() {
    let startTs = null
    let numClicks = 0

    const randBtn = document.getElementsByClassName('randBtn');
    const btnCont = document.getElementById('btnContainer');
    const statusText = document.getElementById("statusText")
    const winWidth = btnCont.offsetWidth
    const winHeight = btnCont.offsetHeight;

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
            // console.log(i)
            setTimeout(function() {countdown(i)}, 1100)
        }
        else{
            statusText.innerText = ""
            startGame()
        } 
    }

    function getRandomNumber(min, max) {
        return Math.random() * (max - min - 120) + min;
    }
    
    function startGame() {
        startTs = Date.now()
        numClicks = 0
        
        for( let i = 0; i < randBtn.length; i++) {
            let currBtn = randBtn[i];
            const randomTop = getRandomNumber(0, winHeight);
            const randomLeft = getRandomNumber(0, winWidth);
    
            currBtn.style.position = 'absolute'
            currBtn.style.width = '2em'
            currBtn.style.height = '2em'
            currBtn.style.top = randomTop +"px";
            currBtn.style.left = randomLeft +"px";

            currBtn.addEventListener('click', handleClick)
        }
    }

    function handleClick(evt) {
        evt.target.style.width = '0px'
        evt.target.style.height = '0px'
        
        numClicks += 1

        if (numClicks === 5) {
            endGame()
        }
    }
    
    function endGame() {
        score = (Date.now() - startTs) / 1000
        statusText.innerText = `Nice work! Total time: ${score} sec`
        
        numClicks = 0
        startTs = 0
        startBtn.disabled = false
        
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
        })
    }
}
