window.onload = function () {

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
    })
    
}