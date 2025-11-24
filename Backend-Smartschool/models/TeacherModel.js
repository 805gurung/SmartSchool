const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({

  email:{
    type:String,
    required: true
  },
  
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },

  schoolname: {
    type: String,
    required: true
  },

  subject:{
    type: String,
    required: true
  },

  phone: {
    type: Number,
    required:true
  },

  address:{
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "Teacher"
  },

  isVerified: {
    type: Boolean,
    default: false
  }

},{timestamps: true})

module.exports = mongoose.model('Teacher', teacherSchema)