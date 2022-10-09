
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import Listings from './pages/listings';
import Shop from './pages/shop.js';
import Messages from './pages/messages';
import Goal from "./pages/goal";
import Logout from "./pages/logout";
import Login from "./pages/login"

function App() {
  return (
    <Router>
      <Navbar />
      <Footer />
      <Routes>
        <Route path='/home' exact element={<Home />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/listings' element={<Listings />} />
        <Route path='/goal' element={<Goal />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </Router>
  );
  }

export default App;
