import React, { MenuItem } from "react";
import "./styles2.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <h1 class="hTitle">WASSUP</h1>
      <nav className="navbar">
        <ul className="nav">
          <li>
            <Link to="/crypt">
              <span class="white">Cryption</span>
            </Link>
          </li>
          <li>
            <Link to="/chat">
              <span class="white underno">One Time Chat</span>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <span class="white">About</span>
            </Link>
          </li>
          <li>
            <Link to="/contacts">
              <span class="white">Contacts</span>
            </Link>
          </li>
          <li>
            <Link to="/help">
              <span class="white">Help</span>
            </Link>
          </li>
        </ul>
      </nav>
      <h2>This is the Home page.</h2>
    </>
  );
};

export default Home;
