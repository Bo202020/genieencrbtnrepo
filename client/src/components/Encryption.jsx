// imports
import React, { useState } from "react";
// The actual page: Encryption
const Encryption = () => {
  //setting up essential useState variables
  const [fetchData, setFetchData] = useState({
    crypt: "",
    password: "",
    text: "",
  });
  const [result, setResult] = useState("");
  //functions that handle submits and changes on page.
  const handleSubmit = (e) => {
    //Stops reload and submit.
    e.preventDefault();
    // Mannually submitting through POST
    fetch("http://localhost:3001/crypt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fetchData),
    })
      .then((res) => res.json())
      .then((data) => setResult(data.encrypted || data.decrypted))
      .catch((err) => console.error(err));
  };
  const handleRadioChange = (e) => {
    // Uses spread operator to overwrite crypt when radio changes.
    setFetchData({ ...fetchData, crypt: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setFetchData({ ...fetchData, password: e.target.value });
  };
  const handleTextChange = (e) => {
    // Checks if value is bigger than the actual input box and then makes it bigegr or smaller.
    if (
      e.target.value.length > e.target.size ||
      e.target.value.length < e.target.size
    ) {
      if (e.target.length > 60) {
        e.target.rows += 1;
      } else {
        if (e.target.value.length < 20) {
          // doesnt make it too small.
          e.target.size = 20;
          // want to escape both ifs
        } else {
          e.target.size = e.target.value.length + 1;
        }
      }
    }
    setFetchData({ ...fetchData, text: e.target.value });
  };
  return (
    // Actuall JSX (fancy HTML) for page.
    <>
      <h1>WASSUP</h1>
      <h2>This is the encryption page: AES</h2>
      <form
        action="http://localhost:3001/crypt"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div id="textinputs">
          <label>
            <input
              name="crypt"
              type="radio"
              value="encrypt"
              onChange={handleRadioChange}
            />
            Encrypt
          </label>
          <label>
            <input
              name="crypt"
              type="radio"
              value="decrypt"
              onChange={handleRadioChange}
            />{" "}
            Decrypt
          </label>
          <input
            type="text"
            id="password"
            placeholder="Encryption Key"
            name="password"
            value={fetchData.password}
            onChange={handlePasswordChange}
          />
          <textarea
            placeholder="Text to Encrypt"
            name="text"
            id="textarea"
            value={fetchData.text}
            onChange={handleTextChange}
            size="20"
            rows="1"
          ></textarea>
          <button type="submit">Submit</button>
        </div>
      </form>

      <p id="msg">Crypt: {result}</p>
    </>
  );
};

export default Encryption;
