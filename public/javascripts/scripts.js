let csrf = null
let game = null
let user = null

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("Window loaded")
    csrf = document.getElementById("csrf").getAttribute('value')
    game = document.getElementById("game_type")
        if (game != null) game = game.getAttribute('value')
    user = document.getElementById("user")
    if (user != null){
        user = parseInt(user.getAttribute('value'))
    }
    console.log("csrf: %s\ngame: %s\nuser: %s", csrf, game, user)
})
