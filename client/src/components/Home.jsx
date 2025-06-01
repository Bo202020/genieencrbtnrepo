import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="nav">
          <li>
            <Link to="/crypt">Cryption</Link>
          </li>
          <li>
            <Link to="/buttons">Buttons</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
        </ul>
      </nav>
      <h1>WASSUP</h1>
      <h2>This is the Home page.</h2>
    </>
  );
};

export default Home;
