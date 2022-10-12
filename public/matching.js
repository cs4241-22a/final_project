

window.onload = function() {
    let user = null;
    let profile = null;
    let age = null;
    let count = 0;

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
            console.log()
            json.forEach((item) => {

                if(item.user != user){

                    if ((( item.age >= (profile.youngest)) && (item.age <= (profile.oldest))) && (( profile.age >= (item.youngest)) && (profile.age <= (item.oldest)))){
                        if (profile.status === item.status){

                            let row = document.getElementById("row");

                            let col = document.createElement("div");
                            col.className = "col-lg-4";

                            let card = document.createElement("div");
                            card.className = "card";

                            let name = document.createElement("h1");
                            name.innerHTML = item.firstName + " " + item.lastName;

                            let username = document.createElement("p");
                            username.innerHTML = item.user;

                            let age = document.createElement("p");
                            age.innerHTML = item.age;

                            let button = document.createElement("p");
                            button.onclick = function() {
                                fetch('/viewProfile', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify(item),
                                })
                                    .then(response => {
                                        window.location.href = "./userProfile.html"
                                    });
                            }
                                // viewProfile(item);
                            button.innerHTML = "<p><button>View Profile</button></p>"

                            const img = new Image();
                            img.src = item.pic;
                            img.style.width = "150px";
                            img.style.height = "150px";
                            img.style.borderRadius = "50%";
                            img.style.backgroundClip = "padding-box";
                            img.style.backgroundPosition = "center";

                            card.appendChild(img);
                            card.appendChild(name);
                            card.appendChild(username);
                            card.appendChild(age);
                            card.appendChild(button);
                            col.appendChild(card);
                            row.appendChild(col);
                        }
                    }
                }
            })
        })
}

function viewProfile(match) {

}