const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();
// mongoose.connect(process.env.API_KEY);

const dealerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  demail: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  dpassword: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  waddress: {
    type: String,
    required: true,
  },
  Manufacture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection",
  },
});

const AddDealer = mongoose.model("AddDealer", dealerSchema);

module.exports = AddDealer;
