
import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Listings from './pages/listings';
import Shop from './pages/shop.js';
import Contact from './pages/contact';
import Goal from "./pages/goal";
import Logout from "./pages/logout";
import Login from "./pages/login"

function App() {
  const [user, setUser] = useState({});
  const [showNav, setShowNav] = useState(true);

  function getUser() {
    fetch("/username", {
      method: "GET",
    }).then(async (response) => {
    let res = await response.json()
    setUser(res)
  })
}

  return (
    <Router>
      {   showNav &&
          <nav>
            <Navbar getUser={getUser} user={user}/>
          </nav>
      }   
      <Routes>
        <Route exact path='/' element={<Login funcNav={setShowNav} getUser={getUser} user={user}/> } />
        <Route path='/home' element={<Home funcNav={setShowNav} getUser={getUser} user={user}/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/shop' element={<Shop getUser={getUser} user={user}/>} />
        <Route path='/listings' element={<Listings getUser={getUser} user={user}/>} />
        <Route path='/goal' element={<Goal />} />
        <Route path='/login' element={<Login funcNav={setShowNav} getUser={getUser} user={user}/>} />
        <Route path='/logout' element={<Logout getUser={getUser} user={user}/>} />
      </Routes>
    </Router>
  );
  }

export default App;
