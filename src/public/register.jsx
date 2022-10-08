const verifyInfo = function() {  
    const username = document.getElementById("username").value;
    if(username === "") {
        document.getElementById("message").innerHTML = "**Fill the username please!";  
        return false;  
    }

    const pw = document.getElementById("password").value;  
    //check empty password field  
    if(pw === "") {  
       document.getElementById("message").innerHTML = "**Fill the password please!";  
       return false;  
    }  

    const confirmPw = document.getElementById("confirmpassword").value;
    if(pw !== confirmPw) {
        document.getElementById("message").innerHTML = "**Passwords do not match";  
       return false;
    } else {
        // all good, try to make account
        const json = { 
          "username": username, 
          "password": pw
        };
        const data = JSON.stringify(json);
        console.log("my data: " + data);

        fetch("/register", {
            method: "POST",
            body: data,
            headers: {
            "Content-Type": "application/json"
            }
        }).then (response => {
            if (!response.ok) {
              throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        }).then(data => {
            console.log(data);
            document.getElementById("message").innerHTML = data;
            return false;
        });
    }
}