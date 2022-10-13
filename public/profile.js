

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
            document.getElementById("profilePic").lastElementChild;
            document.getElementById("profilePic").appendChild(img);
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

                    let profileList = document.createElement("ul");
                    profileList.style.listStyle = "none";
                    profileList.style.fontSize = "larger";
                    let fPList = document.createElement("ul");
                    fPList.style.listStyle="none"
                    fPList.style.fontSize = "larger";
                    let cPList = document.createElement("ul");
                    cPList.style.listStyle="none"
                    cPList.style.fontSize = "larger";

                    const fName = document.createElement("li");
                    const fullName = "Name: " + item.firstName + " " + item.lastName;
                    fName.innerHTML = fullName;
                    profileList.appendChild(fName);
                    
                    const addressItem = document.createElement("li");
                    const address = "Address: " + item.address;
                    addressItem.innerHTML = address;
                    profileList.appendChild(addressItem);

                    const emailItem = document.createElement("li");
                    const email = "Email: " + item.email;
                    emailItem.innerHTML = email;
                    profileList.appendChild(emailItem);

                    const ageItem = document.createElement("li");
                    const age = "Age: " + item.age;
                    ageItem.innerHTML = age;
                    profileList.appendChild(ageItem);

                    const hobbiesItem = document.createElement("li");
                    const hobbies = "Hobbies: " + item.hobbies;
                    hobbiesItem.innerHTML = hobbies;
                    profileList.appendChild(hobbiesItem);

                    const statusItem = document.createElement("li");
                    const statusDescription = "Status: " + item.status;
                    statusItem.innerHTML = statusDescription;
                    profileList.appendChild(statusItem);

                    const youngestItem = document.createElement("li");
                    const youngestDescription = "Youngest: " + item.youngest;
                    youngestItem.innerHTML = youngestDescription;
                    profileList.appendChild(youngestItem);

                    const oldestItem = document.createElement("li");
                    const oldestDescription = "Oldest: " + item.oldest;
                    oldestItem.innerHTML = oldestDescription;
                    profileList.appendChild(oldestItem);

                    const distanceItem = document.createElement("li");
                    const distanceDescription = "Distance: " + item.distance;
                    distanceItem.innerHTML = distanceDescription;
                    profileList.appendChild(distanceItem);

                    const firstProjectItem = document.createElement("li");
                    const firstProjectDesc = "First Project: " + item.firstProject;
                    firstProjectItem.innerHTML = firstProjectDesc;
                    fPList.appendChild(firstProjectItem);

                    const currentProjectItem = document.createElement("li");
                    const currentProject = "Current Project: " + item.currentProject;
                    currentProjectItem.innerHTML = currentProject;
                    cPList.appendChild(currentProjectItem);

                    console.log(item);
                    document.getElementById("profileDesc").lastElementChild;
                    document.getElementById("profileDesc").appendChild(profileList);
                    document.getElementById("firstProjectList").lastElementChild;
                    document.getElementById("firstProjectList").appendChild(fPList);
                    document.getElementById("currentProjectList").lastElementChild;
                    document.getElementById("currentProjectList").appendChild(cPList);
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



