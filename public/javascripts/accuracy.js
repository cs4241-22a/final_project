window.onload = function() {
    
    const statusText = document.getElementById("statusText")
    const reactionBtn1 = document.getElementById("reactionBtn1")
    const reactionBtn2 = document.getElementById("reactionBtn2")
    const reactionBtn3 = document.getElementById("reactionBtn3");
    const reactionBtn4 = document.getElementById("reactionBtn4");
    const reactionBtn5 = document.getElementById("reactionBtn5");
    const reactionBtn6 = document.getElementById("reactionBtn6");
    
    var btns = [reactionBtn1, reactionBtn2, reactionBtn3, reactionBtn4, reactionBtn5, reactionBtn6]
    var clicks = []
    var startTime = null
    var chosenBtn = null

    const average = array => array.reduce((a, b) => a + b) / array.length;

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
            console.log(i)
            setTimeout(function() {countdown(i)}, 1100)
        }
        else{
            statusText.innerText = "Wait for green!"
            playGame()
        } 
    }
    
    function playGame(){
        if (clicks.length < 5){
            var delay = Math.random() * 2000 + 1500 // 1.5-3 seconds
            setTimeout(setBtn, delay)
        }
        else {
            var avg = average(clicks).toFixed(3)
            statusText.innerText = `Avg Reaction Time: ${avg}`

            var result = {
                owner_id: user,
                game_type: game,
                score: avg
            }
            
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
            
            clicks = []
            startBtn.disabled = false
        }
        // while (iteration < 5){
        //     var delay = Math.random() * 2000 // 0-2 seconds
        //     setTimeout(setBtn, delay)
        //    
        // }
    }
    
    function setBtn() {
        chosenBtn = btns[Math.floor(Math.random() * btns.length)]
        startTime = Date.now()
        chosenBtn.addEventListener('click', handleClick)
        
        chosenBtn.style.backgroundColor = "lightgreen"
    }
    
    function handleClick(){
        var reactionTime = (Date.now() - startTime)/1000
        console.log("Btn clicked!")
        clicks.push(reactionTime)
        statusText.innerText = `Reaction Time: ${reactionTime}`
        chosenBtn.removeEventListener('click', handleClick)
        chosenBtn.style.backgroundColor = "lightslategrey"
        playGame()
    }
}
