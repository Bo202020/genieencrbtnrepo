import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Encryption from "./components/Encryption.jsx";
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul></ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crypt" element={<Encryption />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
