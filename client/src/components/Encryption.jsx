// imports
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import "./styles.css";
// The actual page: Encryption
const Encryption = () => {
  const getWindowSize = () => {
    const windowH = window.innerHeight;
    const windowW = window.innerWidth;

    return {
      height: windowH,
      width: windowW,
    };
  };
  const navigate = useNavigate();
  //setting up essential useState variables
  const [fetchData, setFetchData] = useState({
    crypt: "",
    password: "",
    text: "",
  });
  const [animTarget, setAnimTarget] = useState("");
  const [rowsConst, setRowsConst] = useState(10);
  const [colsConst, setColsConst] = useState(60);
  const iterationsRef = useRef(0);
  const intervalRef = useRef(null);
  let winSize = getWindowSize();
  // alert(winSize);
  //functions that handle submits and changes on page.
  const handleSubmit = async (e) => {
    //Stops reload and submit.
    e.preventDefault();
    // Mannually submitting through POST
    try {
      const res = await fetch("/crypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fetchData),
      });

      const data = await res.json();
      console.log(data);
      if (data.msg) {
        document.querySelector("p").textContent =
          "Invalid AES-256 Text / Hexadecimal!";
      } else {
        document.querySelector("p").textContent = "";
        const output = data.encrypted
          ? `${data.encrypted.iv}:${data.encrypted.encrypted}`
          : `${data.decrypted.decrypted}`;
        // alert(output);
        setAnimTarget(output);
        const letters = "ABCDEF123456";
        iterationsRef.current = 0;
        intervalRef.current
          ? clearInterval(intervalRef.current)
          : console.log("No interval to clear!");
        setFetchData((prev) => ({
          ...prev,
          text: output,
        }));
        intervalRef.current = setInterval(() => {
          setFetchData((prev) => {
            const text = prev.text
              .split("")
              .map((letter, index) => {
                if (index < iterationsRef.current) {
                  return output[index];
                }
                return letters[Math.floor(Math.random() * 12)];
              })
              .join("");
            return { ...prev, text };
          });
          iterationsRef.current += 1;
          if (iterationsRef.current >= output.length) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }, 10);
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  const handleRadioChange = (e) => {
    if (e.target.checked) {
      setFetchData((prev) => ({
        ...prev,
        crypt: "encrypt",
      }));
      document.getElementById("eWrapper").style.position = "absolute";
      document.getElementById("eWrapper").style.top = "50%";
      document.getElementById("eWrapper").style.left = "85%";
    } else {
      setFetchData((prev) => ({
        ...prev,
        crypt: "decrypt",
      }));
      document.getElementById("eWrapper").style.position = "absolute";
      document.getElementById("eWrapper").style.top = "50%";
      document.getElementById("eWrapper").style.left = "15%";
    }
    // Uses spread operator to overwrite crypt when radio changes.
    // setFetchData({
    //   ...fetchData,
    //   crypt: e.target.checked ? "encrypt" : "decrypt",
    // });
    const een = document.getElementById("EEn");
    const ede = document.getElementById("EDe");
    if (e.target.checked) {
      een.style.position = "absolute";
      een.style.top = "50%";
      ede.style.position = "absolute";
      ede.style.top = "130%";
    } else {
      een.style.position = "absolute";
      een.style.top = "130%";
      ede.style.position = "absolute";
      ede.style.top = "50%";
    }
  };
  const handlePasswordChange = (e) => {
    setFetchData({ ...fetchData, password: e.target.value });
  };
  const handleTextChange = (e) => {
    setFetchData({ ...fetchData, text: e.target.value });
  };
  const handleCopy = (e) => {
    const targetP = document.getElementById("ePassword");
    const targetE = document.getElementById("eTextarea");
    targetP.setSelectionRange(0, 99999);
    targetE.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(
      `Password: ${targetP.value}, Encrypted: ${targetE.value}, valid.`
    );
  };
  const handlePaste = async (e) => {
    const re = /valid/gim;
    let data = await navigator.clipboard.readText();
    if (
      data === undefined ||
      data === null ||
      data === NaN ||
      data === "" ||
      data === false
    ) {
      return;
    }
    if (data.match(re) !== undefined) {
      data = data.replace(/password:|encrypted|,|valid.|\s+/gim, "").trim();
    }

    data = [...data.split(":")];

    data = [data[0], `${data[1]}:${data[2]}`];

    document.getElementById("ePassword").value = data[0];
    document.getElementById("eTextarea").value = data[1];
    document.getElementById("eCryptOption").checked = false;

    handleRadioChange({ target: { checked: false } });

    setFetchData((prev) => ({
      ...prev,
      crypt: "decrypt",
      password: data[0],
      text: data[1],
    }));
  };
  window.addEventListener("resize", () => {
    winSize = getWindowSize();
    // alert(winSize);
  });

  setInterval(() => {
    if (winSize.height < 636 || winSize.width < 1094) {
      navigate("/cryptM");
    }
  }, 250);
  return (
    // Actuall JSX (fancy HTML) for page.
    <>
      <h1 class="eTitle">WASSUP!!!</h1>
      <h2 class="eSubTitle">This is the encryption page: AES 256</h2>
      <form action="/crypt" method="POST" onSubmit={handleSubmit}>
        <p id="top">Switch between Encrypt and Decrypt text!</p>
        <div id="eTextinputs">
          <label for="eCryptOption" class="eCrypting">
            <span id="EEn">Encrypt</span>
            <span id="EDe">Decrypt</span>
            <div id="eWrapper" onClick={handleRadioChange}>
              <input
                type="checkbox"
                id="eCryptOption"
                onChange={handleRadioChange}
              />
            </div>
          </label>

          <input
            type="text"
            id="ePassword"
            placeholder="Encryption Key"
            name="password"
            value={fetchData.password}
            onChange={handlePasswordChange}
            autoComplete="off"
            spellCheck="false"
          />
          <a class="eCopy2" onClick={handleCopy}>
            Copy Encrypted & Password
          </a>
          <a class="eCopy3" onClick={handlePaste}>
            {" "}
            Paste Formatted
          </a>
          <textarea
            placeholder="Text to Encrypt"
            name="text"
            id="eTextarea"
            value={fetchData.text}
            onChange={handleTextChange}
            cols={colsConst}
            rows={rowsConst}
          ></textarea>
          <button type="submit" id="eCopy1">
            Submit
          </button>
        </div>
      </form>
      <p></p>
    </>
  );
};
export default Encryption;
