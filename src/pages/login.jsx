import Button from "react-bootstrap/Button";

export default function Login() {
  const hello = "Hello React!";

  const loginSubmit = () => {
    alert("Logging in...");
  };

  const signupSubmit = () => {
    alert("Creating new account...");
    const loginForm = document.querySelector("form");
    if (
      loginForm.elements.username.value == "" ||
      loginForm.elements.password.value == ""
    ) {
      alert("Must enter a username and password.");
      return;
    }
    // reset form
    loginForm.reset();
  };

  return (
    <>
      <h1>Log In</h1>
      <form id="loginForm" action="/login" method="POST">
        <fieldset>
          <div class="form-group">
            <label for="username">Username: </label>
            <input type="text" id="username" name="username" required />
            <br />
          </div>

          <div class="form-group">
            <label for="password">Password: </label>
            <input type="password" id="password" name="password" required />
            <br />
          </div>

          <button class="btn btn-outline-primary" onClick={loginSubmit}>
            Sign In
          </button>
          <button class="btn btn-outline-secondary" onClick={signupSubmit}>
            Register
          </button>
        </fieldset>
      </form>
    </>
  );
}
