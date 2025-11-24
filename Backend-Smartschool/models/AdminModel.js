const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    default: "Admin",
  },
  isVerified:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("Admin", adminSchema);
