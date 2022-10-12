

window.onload = async function() {

    await fetch('/getUser', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => (response.text()))
        .then(text => {
            user = text;
            console.log(user);
            document.getElementById("loggedIn").innerHTML = "Logged in as: " + user;
        })

    await fetch('/hasProfile', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => response.json())
        .then(json => {
            console.log(json[0]);
            let current = json[0];
            if (current == null){
                let nav = document.getElementById("sideNavBar");

                let log_Out = document.createElement("a");
                log_Out.href = "/index.html";
                log_Out.innerHTML = "Log Out";

                nav.appendChild(log_Out);
            }
            else{

                let nav = document.getElementById("sideNavBar");

                let profile = document.createElement("a");
                profile.href = "/profile.html";
                profile.innerHTML = "Profile";

                let matching = document.createElement("a");
                matching.href = "/matching.html";
                matching.innerHTML = "Matching";

                let log_Out = document.createElement("a");
                log_Out.href = "/index.html";
                log_Out.innerHTML = "Log Out";

                nav.appendChild(profile);
                nav.appendChild(matching);
                nav.appendChild(log_Out);

                document.getElementById("fName").value = current.firstName;
                document.getElementById("lName").value = current.lastName;
                document.getElementById("addr").value = current.address;
                document.getElementById("email").value = current.email;
                document.getElementById("ageValue").innerHTML = current.age;
                document.getElementById("ageSlider").value = parseInt(current.age);
                document.getElementById("hobbies").value = current.hobbies;
                document.getElementById("fProject").value = current.firstProject;
                document.getElementById("currProject").value = current.currentProject;
                document.getElementById("yAgeRange").value = current.youngest;
                document.getElementById("oAgeRange").value = current.oldest;
                document.getElementById("distValue").innerHTML = current.distance;
                document.getElementById("distSlider").value = parseInt(current.distance);

                if (current.status === "mingle"){
                    console.log("ming house");
                    document.getElementById("mingleStatus").checked = true;
                }
                else{
                    console.log("NOt ming house");
                    document.getElementById("toDateStatus").checked = true;
                }
            }
        })
}


const form = document.forms[0];
form.onsubmit = function(event) {

    event.preventDefault();

    const fName = form.elements['fName'];
    const lName = form.elements['lName'];
    const addr = form.elements['addr'];
    const email = form.elements['email'];
    const age = form.elements["Age"];


    const hobbies = form.elements['hobbies'];
    const fProject = form.elements['fProject'];
    const currProject = form.elements['currProject'];
    const status = form.elements['status'];


    const yAgeRange = form.elements['yAgeRange'];
    const oAgeRange = form.elements['oAgeRange'];
    const Distance = form.elements['Distance'];

    const input = {
        firstName: fName.value,
        lastName: lName.value,
        address: addr.value,
        email: email.value,
        age: age.value,
        hobbies: hobbies.value,
        firstProject: fProject.value,
        currentProject: currProject.value,
        status: status.value,
        youngest: yAgeRange.value,
        oldest: oAgeRange.value,
        distance: Distance.value,

    }

    const body = JSON.stringify(input);
    fetch( '/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body,
    })
        .then(response => {
            window.location.href = "/profile.html";
        })

    form.reset();

    console.log(input);
}

function openNav() {
    document.getElementById("sideNavBar").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideNavBar").style.width = "0px";
}







