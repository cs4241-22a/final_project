let csrf = null
let game = null
let user = null

document.addEventListener("DOMContentLoaded", function(event) {
    csrf = document.getElementById("csrf").getAttribute('value')
    game = document.getElementById("game_type")
        if (game != null) game = game.getAttribute('value')
    user = document.getElementById("user")
    if (user != null){
        user = parseInt(user.getAttribute('value'))
    }
})
