import Button from "react-bootstrap/Button";

export default function Login() {
  const hello = "Hello React!";

  const loginSubmit = (loginEvent) => {
    loginEvent.preventDefault();
    //alert("Logging in...");
    const loginForm = document.querySelector("form");
   fetch("/login", {
      method: "post",
      body: JSON.stringify({
        username: loginForm.elements.username.value,
        password: loginForm.elements.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      "no-cors": true,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        // has login and user in response
        if (json.login === true) {
          // go to account page
          window.location.href = "/user/" + json.user.username;
        } else {
          alert("Incorrect credentials, please try again.");
          loginForm.reset();
        }
      });
  };

  const signupSubmit = (signupEvent) => {
    // alert("Creating new account...");
    signupEvent.preventDefault();
    const loginForm = document.querySelector("form");
    if (
      loginForm.elements.username.value == "" ||
      loginForm.elements.password.value == ""
    ) {
      alert("Must enter a username and password.");
      return;
    }

    if (!/^[\w_-]+$/.test(loginForm.elements.username.value)) {
      alert("Username must be alphanumeric with no spaces");
      return;
    }
    fetch("/register", {
      method: "POST",
      body: JSON.stringify({
        username: loginForm.elements.username.value,
        password: loginForm.elements.password.value,
        owned: [],
        joined: [],
        availability: [],
      }),
      headers: {
        "Content-Type": "application/json",
      },
      "no-cors": true,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.login === true) {
          window.location.href = "/user/" + json.user.username;
        } else {
          alert("That user already exists! Maybe try another name?");
          loginForm.reset();
        }
      });

    // reset form
    loginForm.reset();
  };

  return (
    <>
      <h1>Log In</h1>
      <form id="loginForm" method="POST">
        <fieldset>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
            <br />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <br />
          </div>
          <br />
          <button className="btn btn-outline-primary" onClick={loginSubmit}>
            Sign In
          </button>
          <button className="btn btn-outline-secondary" onClick={signupSubmit}>
            Register
          </button>
        </fieldset>
      </form>
    </>
  );
}
