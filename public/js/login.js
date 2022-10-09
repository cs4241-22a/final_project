const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', async e => {
    e.preventDefault()
    const username = loginForm.elements['loginUsername'].value
    const password = loginForm.elements['loginPassword'].value


    const loginData = {
        "username": username,
        "password": password,
        "userdata": JSON.stringify([])
    }

    const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })

    const responseJSON = await response.json()
    console.log(responseJSON)
    if (responseJSON.status == "FAILED") {
        alert(responseJSON.message)
        clearFormPassword()
    }
    if (responseJSON.status == "SUCCESS") { //TODO
        window.location.replace('/game')
    }

})
