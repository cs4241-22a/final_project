

let user = null;
window.onload = function () {

    fetch('/profilepic', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => (response.text()))
        .then(text => {
            console.log(text);
            const img = new Image();
            img.src = text;
            document.body.appendChild(img);
        })


    fetch('/getUser', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => (response.text()))
        .then(text => {
            user = text;
            console.log(user);
            document.getElementById("loggedIn").innerHTML = "Logged in as: " + user;
        })
    console.log(user);
    fetch('/getprofile', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => (response.json()))
        .then((json) => {
            json.forEach((item) => {
                if (item.user === user) {

                    const firstName = item.firstName;
                    const lastName = item.lastName;
                    const address = item.address;
                    const email = item.email;
                    const age = item.age;
                    const hobbies = item.hobbies;
                    const firstProject = item.firstProject;
                    const currentProject = item.currentProject;
                    const status = item.status;
                    const youngest = item.youngest;
                    const oldest = item.oldest;
                    const distance = item.distance;
                    const orientation = item.orientation;


                    console.log(item);
                    let current = document.createElement("p");
                    current.innerHTML = JSON.stringify(item);
                    document.body.appendChild(current);
                }
            })
        })

}

function openNav() {
    document.getElementById("sideNavBar").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideNavBar").style.width = "0px";
}



