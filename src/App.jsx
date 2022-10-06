import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import Profile from './pages/profile.jsx';
import Listings from './pages/listings';
import Shop from './pages/shop.jsx';
import Messages from './pages/messages';
import Signin from "./components/Login/Login"
import Create from "./components/Login/Create"
import Goal from "./pages/goal"

function App() {
return (
	<Router>
	  <Navbar />
	  <Footer />
	  <Routes>
		  <Route path='/index' exact element={<Home />} />
		  <Route path='/profile' element={<Profile />} />
		  <Route path='/messages' element={<Messages />} />
		  <Route path='/shop' element={<Shop />} />
		  <Route path='/listings' element={<Listings />} />
		  <Route path='/signin' element={<Signin />} />
      <Route path='/create-an-account' element={<Create />} />
      <Route path='/goal' element={<Goal />} />
	  </Routes>
	</Router>
);
}

export default App;

