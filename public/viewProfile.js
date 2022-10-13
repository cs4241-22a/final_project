let user = null;
window.onload = function () {

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

    fetch('/getViewingProfile', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => response.json())
        .then(response => {
            console.log(response);

            const img = new Image();
            img.src = response.pic;
            img.style.width = "250px";
            img.style.height = "auto";
            document.getElementById("profilePic").lastElementChild;
            document.getElementById("profilePic").appendChild(img);

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
            const fullName = "Name: " + response.firstName + " " + response.lastName;
            fName.innerHTML = fullName;
            profileList.appendChild(fName);


            const emailItem = document.createElement("li");
            const email = "Email: " + response.email;
            emailItem.innerHTML = email;
            profileList.appendChild(emailItem);

            const ageItem = document.createElement("li");
            const age = "Age: " + response.age;
            ageItem.innerHTML = age;
            profileList.appendChild(ageItem);

            const hobbiesItem = document.createElement("li");
            const hobbies = "Hobbies: " + response.hobbies;
            hobbiesItem.innerHTML = hobbies;
            profileList.appendChild(hobbiesItem);

            const statusItem = document.createElement("li");
            const statusDescription = "Status: " + response.status;
            statusItem.innerHTML = statusDescription;
            profileList.appendChild(statusItem);

            let github = document.getElementById("githubHeader");
            github.href = ("https://www.github.com/" + response.user);

            const firstProjectItem = document.createElement("li");
            const firstProjectDesc = "First Project: " + response.firstProject;
            firstProjectItem.innerHTML = firstProjectDesc;
            fPList.appendChild(firstProjectItem);

            const currentProjectItem = document.createElement("li");
            const currentProject = "Current Project: " + response.currentProject;
            currentProjectItem.innerHTML = currentProject;
            cPList.appendChild(currentProjectItem);

            document.getElementById("profileDesc").lastElementChild;
            document.getElementById("profileDesc").appendChild(profileList);
            document.getElementById("firstProjectList").lastElementChild;
            document.getElementById("firstProjectList").appendChild(fPList);
            document.getElementById("currentProjectList").lastElementChild;
            document.getElementById("currentProjectList").appendChild(cPList);
            })
    
                    

}

function openNav() {
    document.getElementById("sideNavBar").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideNavBar").style.width = "0px";
}