const mongoose = require('mongoose')
// const {ObjectId} = mongoose.Schema

const studentSchema = mongoose.Schema({
  student_username: {
    type: String,
    required: true
  },
  email:{
    type:String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  school_name:{
    type:String,
    required:true
  },
  Grade:{
      type:String,
      required:true
  },
  Phone:{
    type:Number,
    required:true
  },
  Address:{
    type:String,
    required:true
  },
  Parent_name:{
    type:String,
    required:true
  },
  role: {
    type: String,
    default: "Student"
  },
  isVerified:{
    type:Boolean,
    default:false
  }
}, {timestamps: true})

module.exports = mongoose.model('Student', studentSchema)