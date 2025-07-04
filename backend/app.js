// Imports...
const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Chat = require("./chatSchema.js");
// Setting up neccessary variables for Encryption/Decryption.
const algorithm = "aes-256-cbc";
const deriveKey = (password) => crypto.scryptSync(password, "salt", 32);
// Sets up Express.
const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
mongoose
  .connect("mongodb://localhost:27017/chatSave", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to mongo"))
  .catch((e) => console.error(e));
// Encryption/Decryption functions.
const encrypt = (text, password) => {
  // Gets password and generates and IV.
  const key = deriveKey(password);
  const iv = crypto.randomBytes(16);
  // Creates a cipher algorithm for encryption.
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  // Encrypts and returns encrypted text.
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encrypted,
  }; //`${iv.toString("hex")}:${encrypted}`;
};

const decrypt = (text, password) => {
  // Gets password and IV.
  const [ivHex, encodedText] = text.split(":");
  const key = deriveKey(password);
  const iv = Buffer.from(ivHex, "hex");
  // Creates a cipher algorithm for decryption.
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  // Decrypts and returns decrypted text.
  let decrypted = decipher.update(encodedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return {
    decrypted,
  };
};

//Express POST handler
app.post("/crypt", (req, res) => {
  // Try and Catch block for errors like Invalid Key... .
  // Decides if it should decrypt or encrypt.
  try {
    if (req.body.crypt === "encrypt") {
      // I think we all know what this does.
      // Encrypts text and logs then it returns it as object.

      const encrypted = encrypt(req.body.text, req.body.password);
      console.log(encrypted);
      return res.send({ encrypted });
    } else {
      // Same as above but with Decryption instead.
      const decrypted = decrypt(req.body.text, req.body.password);
      console.log(decrypted);
      return res.send({ decrypted });
    }
  } catch (e) {
    return res.send({ msg: "stop fucking around!!!" });
  }
});

app.post("/create-chat", (req, res) => {
  if (!req.body.name) return res.send({ msg: "No Name!" });
  if (!req.body.time) return res.send({ msg: "No Time!" });
  if (!req.body.masterIP) return res.send({ msg: "No Ip for Master!" });
  res.send({ mssg: "added chat to saved chats." });
});
app.listen(3001, () => console.log("Up on 3001"));
