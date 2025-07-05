import React from "react";
import "./styleChat.css";
const handleSubmit = async (e) => {
  e.preventDefault();

  // const res = await fetch("localhost:");
};
const Chat = () => {
  return (
    <>
      <h1>WASSUP!!!</h1>
      <h2>One Time Chat</h2>
      <h3>Once deleted, no possible recovery ever!</h3>
      <form action="/create-chat" onSubmit={handleSubmit}>
        <input type="text" placeholder="Chat Name?" />
        <button>Create Chat</button>
      </form>
    </>
  );
};

export default Chat;
