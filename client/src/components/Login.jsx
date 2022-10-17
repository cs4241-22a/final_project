import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../login.css";

async function loginUser(credentials) {
  const bodyVal = new URLSearchParams();
  bodyVal.append("username", credentials.username);
  bodyVal.append("password", credentials.password);
  const res = await fetch("/login", {
    method: "POST",
    body: bodyVal.toString(),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res;
}
function authenticateWithGithub(e) {
  e.preventDefault();
  window.open("https://quick-notes.glitch.me/auth/github", "_self");
}

export default function Login() {
  //add some kind of token
  const navigate = useNavigate();

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginResponse = await loginUser({
      username: username,
      password: password,
    });
    if (loginResponse.ok) {
      // Server said correct creds
      sessionStorage.setItem("loggedIn", "true");
      navigate("/", { replace: true });
      console.log("User entered correct credentials");
    } else {
      console.log("User entered incorrect credentials");
    }
  };

  return (
    <div className="bg-stone-900 text-white text-opacity-80 flex justify-center items-center h-screen w-screen ">
      <form className="min-w-[20%] " onSubmit={handleSubmit}>
        <div className="login-wrapper m-auto flex flex-col  rounded-lg bg-zinc-800 px-16 py-16 ">
          <div className="flex flex-row">
            <p className="mb-5 font-semibold text-3xl ">
              Sign into
              <p className="text-emerald-700 font-bold">Quick Notes</p>
            </p>
          </div>
          <p className="mb-2 text-md text-slate-300 dark:text-white font-normal">
            Username
          </p>

          <input
            className="mb-5 p-2 bg-inherit border border-b rounded-lg focus-visible:border-transparent"
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUserName(e.target.value)}
          />

          <p className="mb-2 text-md text-slate-300 dark:text-white font-normal">
            Password
          </p>
          <input
            className="mb-5 p-2 bg-inherit border border-blue-gray-700 rounded-lg focus-visible:border-transparent"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="py-2 mb-3 text-md bg-transparent hover:bg-emerald-500 border border-emerald-500 hover:border-transparent text-white font-normal rounded"
            type="submit"
          >
            Log in
          </button>
          <a
            className="text-center text-md button py-2 bg-transparent hover:bg-gray-400 text-white border border-gray-400 hover:border-transparent hover:text-black font-semibold rounded"
            href="/auth/github"
            onClick={(e) => authenticateWithGithub(e)}
          >
            Continue with GitHub
          </a>
          <p className="text-grey-text-md 700 mt-4 text-center">or</p>

          <Link
            className="text-center text-md mx-auto text-opacity-70 hover:text-opacity-90 text-emerald-500 font-light underline hover:decoration-wavy decoration-emerald-500 hover:underline-offset-4 w-16"
            to="/register"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
