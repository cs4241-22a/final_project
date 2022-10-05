// Library Imports
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Component Imports
import LoginPage from "./components/loginPage/LoginPage";
import HomePage from "./components/homePage/HomePage";

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
