const signupForm = document.getElementById('signupForm')

signupForm.addEventListener('submit', async e => {
    e.preventDefault()
    const statusMSG = document.getElementById('status-message')

    const signupData = {
        "username": signupForm.elements['signupUsername'].value,
        "password": signupForm.elements['signupPassword'].value,
        "userdata": JSON.stringify([])
    }

    const response = await fetch('/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData)
    })

    const jsonResponse = await response.json()

    statusMSG.innerHTML = jsonResponse.message;

    if (jsonResponse.status == 'SUCCESS') {

        window.location.replace('/signin')

    } else {
        console.error(jsonResponse.message)
    }
})
