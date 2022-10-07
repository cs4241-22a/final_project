let csrf = null

window.onload = function() {
    csrf = document.getElementById("csrf").getAttribute('value')
    console.log("Window loaded")
}
