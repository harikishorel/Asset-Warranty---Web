const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  adminWallet: {
    type: String,
    required: true,
  },
  adminPassword: {
    type: String,
    required: true,
  },
});

const AdminLogin = mongoose.model("AdminLogin", adminSchema);

module.exports = AdminLogin;
