// Style imports
import './assets/style/bootstrap.css';
import './assets/style/app.css';

// Library Imports
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Component Imports
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/home" element={<HomePage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
