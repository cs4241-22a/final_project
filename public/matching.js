

window.onload = function() {

    let user = null;

    let profile = null;

    let age = null;

    // fetch('/test', {
    //     method: 'GET',
    //     headers: {'Content-Type': 'application/json'}
    // })

    fetch('/getUser', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => (response.text()))
        .then(text => {
            user = text;
            console.log(user);
        })
    fetch('/getprofile', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => (response.json()))
        .then((json) => {
            json.forEach((item) => {
                if (item.user === user) {
                    profile = item;
                    age = item.age;
                }
            })
        })

    fetch('/getAllMatches', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => (response.json()))
        .then((json) => {
            json.forEach((item) => {
                if(item.user != user){
                    if ((( item.age >= (profile.youngest)) && (item.age <= (profile.oldest))) && (( profile.age >= (item.youngest)) && (profile.age <= (item.oldest)))){
                        if (profile.status === item.status){
                            console.log(item);
                        }
                    }
                }
            })
        })
}