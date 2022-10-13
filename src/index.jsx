import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./Login"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

var mountNode = document.getElementById("app");
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>, mountNode);