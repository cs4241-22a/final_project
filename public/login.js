

function githubLog() {

    fetch('/github', {
        method: 'GET',
        'no-cors':true
    })
        .then(response => {
            console.log(response);
            window.location.href = response.url;
        })
        .then()
}


