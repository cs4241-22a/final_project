window.onload = function() {

    const randBtn = document.getElementsByClassName('randBtn');
    const btnCont = document.getElementById('btnContainer');
    const winWidth = btnCont.offsetWidth
    const winHeight = btnCont.offsetHeight;

    function getRandomNumber(min, max) {
        return Math.random() * (max - min - 120) + min;
    }

    for( let i = 0; i < randBtn.length; i++) {
        let currBtn = randBtn[i];
        const randomTop = getRandomNumber(0, winHeight);
        const randomLeft = getRandomNumber(0, winWidth);

        currBtn.style.top = randomTop +"px";
        currBtn.style.left = randomLeft +"px";
    }

    const statusText = document.getElementById("statusText")
    const reactionBtn1 = document.getElementById("reactionBtn1")
    const reactionBtn2 = document.getElementById("reactionBtn2")
    const reactionBtn3 = document.getElementById("reactionBtn3");
    const reactionBtn4 = document.getElementById("reactionBtn4");
    const reactionBtn5 = document.getElementById("reactionBtn5");
    
    
    function endGame() {

        var result = {
            owner_id: user,
            game_type: game,
            score: 0
        }

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
