import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route } from 'react-router-dom';
import App from './components/App';
//This whole files purpose is to just render our React components to our 'root' tag in the html
//This is just hows its done idk why
//see App.jsx for the routes

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("Getting root div")
root.render(
  <React.StrictMode>
    <App/> 
 </React.StrictMode>
);

