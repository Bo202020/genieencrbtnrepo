import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Encryption from "./components/Encryption.jsx";
import Chat from "./components/Chat.jsx";
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
