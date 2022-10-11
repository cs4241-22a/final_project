

window.onload = function() {

    let user = null;

    let profile = null;

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
                    if (( parseInt(profile.age)>= parseInt(item.youngest)) && (parseInt(profile.age) <= parseInt(item.oldest))){
                        if (profile.status === item.status){
                            console.log(item);
                        }
                    }
                }
            })
        })
}