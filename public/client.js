// client-side js
// run by the browser each time your view template is loaded

//console.log("hello world :o");

// our default array of dreams

// define variables that reference elements on our page

const loginbtn = document.getElementById("loginbtn");
const registerbtn = document.getElementById("registerbtn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameRInput = document.getElementById("newusername");
const passwordRInput = document.getElementById("newpassword");
const loginDiv = document.getElementById("login");
const registerDiv = document.getElementById("register");
const loginTogglebtn = document.getElementById("loginTogglebtn");
const registerTogglebtn = document.getElementById("registerTogglebtn");
let user, pass


// a helper function that creates a list item for a given dream
//loginPage.setAttribute("hidden", "hidden");
        //plannerPage.removeAttribute("hidden");



// iterate through every dream and add it to our page

// listen for the form to be submitted and add a new dream when it is
//Form.onsubmit = function (event) {

//};



const onClickLogin = function () {
  user = usernameInput.value;
  pass = passwordInput.value;

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: user,
      password: pass,
    }),
  })
    .then((response) => response.json())
    .then((login) => {
      if (login) {
        //loginPage.setAttribute("hidden", "hidden");
        //plannerPage.removeAttribute("hidden");
        //updateTable(user);
        //warn.innerHTML = "";
        window.location.href = 'top.html';
        //TODO: set page (home page)
        console.log("logged in");
      } else {
        
        console.log("not logged in")
        
        //TODO: tell them wrong username or password
        
        
        //warn.innerHTML = "incorrect username or password";
      }
    });

  return false;
};

const onClickRegister = function () {
  user = usernameRInput.value;
  pass = passwordRInput.value;
  

  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: user,
      password: pass,
    }),
  })
    .then((response) => response.json())
    .then((reg) => {
      if (reg) {
        console.log("registered")
        
        usernameInput.value = user;
        passwordInput.value = pass;
        onClickLogin();
        //warn.innerHTML = "registered";
      } else {
        
        console.log("not registered")
        //warn.innerHTML = "username taken";
      }
    });

  return false;
};

const loginVisible = function() {
  loginDiv.removeAttribute("hidden");
  registerDiv.setAttribute("hidden", "hidden");
  return false;
}

const registerVisible = function() {
  loginDiv.setAttribute("hidden", "hidden");
  registerDiv.removeAttribute("hidden");
  return false;
}

loginTogglebtn.onclick = loginVisible;
registerTogglebtn.onclick = registerVisible;
loginbtn.onclick = onClickLogin;
registerbtn.onclick = onClickRegister;
