import React, {useState} from "./_snowpack/pkg/react.js";
import {useNavigate} from "./_snowpack/pkg/react-router-dom.js";
function Login(props) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  function logIn(e) {
    e.preventDefault();
    fetch("/loggingIn", {
      method: "post",
      "no-cors": true,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({user, pass})
    }).then((response) => response.json()).then((json) => {
      if (!json.login) {
        setLoginStatus("Failed to log in");
        document.getElementById("pass").value = "";
      } else {
        navigate("/");
      }
    });
  }
  function register(e) {
    e.preventDefault();
    fetch("/register", {
      method: "post",
      "no-cors": true,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({user, pass})
    }).then((response) => response.json()).then((json) => {
      console.log(json.result);
      debugger;
      if (json.result !== "") {
        setLoginStatus(json.result);
      } else {
        navigate("/");
      }
    });
  }
  return /* @__PURE__ */ React.createElement("form", null, /* @__PURE__ */ React.createElement("h2", null, "Log in"), /* @__PURE__ */ React.createElement("label", {
    for: "user"
  }, "Username:"), /* @__PURE__ */ React.createElement("input", {
    type: "text",
    id: "user",
    name: "user",
    onChange: (e) => setUser(e.target.value)
  }), /* @__PURE__ */ React.createElement("label", {
    for: "pass"
  }, "Password: "), /* @__PURE__ */ React.createElement("input", {
    type: "password",
    id: "pass",
    name: "pass",
    onChange: (e) => setPass(e.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    value: "log in",
    onClick: (e) => logIn(e)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    value: "register",
    onClick: (e) => register(e)
  }), /* @__PURE__ */ React.createElement("p", null, loginStatus));
}
export default Login;
