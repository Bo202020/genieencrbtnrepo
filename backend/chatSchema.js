const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  masterIP: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
