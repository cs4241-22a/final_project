const signupForm = document.getElementById('signupForm')

const clearFormPassword = () => {
    signupForm.elements['signupPassword'].value = ""
    signupForm.elements['signupPasswordConfirm'].value = ""
}

signupForm.addEventListener('submit', async e => {
    e.preventDefault()
    const username = signupForm.elements['signupUsername'].value
    const password = signupForm.elements['signupPassword'].value
    const passwordConfirm = signupForm.elements['signupPasswordConfirm'].value

    if (password == passwordConfirm) {
        const signupData = {
            "username": username,
            "password": password,
            "userdata": JSON.stringify([])
        }

        const response = await fetch('/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData)
        })

        const responseJSON = await response.json()
        console.log(responseJSON)
        if (responseJSON.status == "FAILED") {
            alert(responseJSON.message)
            clearFormPassword()
        }
        if (responseJSON.status == "SUCCESS") {
            window.location.replace('/login')
        }

    } else {
        alert("passwords Don't match!")
        clearFormPassword()
    }

})
