import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Encryption from "./components/Encryption.jsx";
import Chat from "./components/Chat.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Help from "./components/Help.jsx";

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
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
