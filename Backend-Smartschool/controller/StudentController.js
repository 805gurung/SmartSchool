const Student = require('../models/StudentModel')
const Token = require("../models/TokenModel")
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const sendEmail = require('../middleware/emailSender')
const saltrounds = 10

const jwt = require('jsonwebtoken')
const {expressjwt} = require('express-jwt')

exports.register = async(req, res)=>{
    let{student_username, email, password, school_name, Grade, Phone, Address, Parent_name}= req.body

    let student = await Student.findOne({student_username})
    if(student){
        return res.status(400).json({error:"Student username not available"})
    }
    student = await Student.findOne({email})
    if(student){
        return res.status(400).json({error:"Email already registered"})

    }
    let salt = await bcrypt.genSalt(saltrounds)
    let hashed_password = await bcrypt.hash(password, salt)

    student = await Student.create({
        student_username, email, password:hashed_password, school_name, Grade, Phone, Address, Parent_name})
    if(!student){
        return res.status(400).json({error:"Something went wrong"})
    }

    let token = await Token.create({
        user: student._id,
        userType: student.role,
        token: crypto.randomBytes(24).toString('hex')
    })
    if(!token){
        return res.status(400).json({error:"Something went wrong"})
    }

//    const URL = `${process.env.FRONTEND_URL}/verifystudent/${token.token}`
    const URL = `http://localhost:5000/verifystudent/${token.token}`

    sendEmail({
        from: 'noreply@something.com',
        to:req.body.email,
        subject:'Verification Email',
        text:'Click on the following link to activate'+ URL,
        html: `<a href='${URL}'><button>Verify Email</button></a>`
    })
    res.send({student, message:"Student user registered successfully."})
}

exports.verifyEmail = async (req, res) => {
  let token = await Token.findOne({
    token: req.params.token,
    userType: "Student",
  });
  if (!token) {
    return res.status(400).json({ error: "Something went wrong" });
  }

  //find user
  let student = await Student.findById(token.user);
  if (!student) {
    return res.status(400).json({ error: "User not found" });
  }

  //check if already verified
  if (student.isVerified) {
    return res
      .status(400)
      .json({ error: "Student already verified. Log in to continue" });
  }

  //verify user
  student.isVerified = true;
  student = await student.save();

  if (!student) {
    return res.status(400).json({ error: "Something went wrong" });
  }

  res.send({ message: "User verified successfully." });
};


//forget password

exports.forgetPassword = async(req, res)=>{
    let user = await Student.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({error:"Email not registered"})
    }
    let token = await Token.create({
        user:user._id,
        userType: user.role,
        token:crypto.randomBytes(24).toString('hex')
    })
    if(!token){
        return res.status(400).json({error:"something went wrong"})
    }
    // const URL = `${process.env.FRONTEND_URL}/resetpassword/${token.token}`
    const URL = `http://localhost:5000/verify/${token.token}`
    sendEmail({
        from: 'noreply@something.com',
        to: req.body.email,
        subject: "password reset link",
        text: `Click on the following link to reset your password. ${URL}`,
        html: `<a href='${URL}'><button>Reset Password</button></a>`
    })

    //send message to user
    res.send({message:"Password reset link send to your email."})
}


//reset password

exports.resetPassword = async(req, res)=>{
    let token = await Token.findOne({
    token: req.params.token,
    userType: "Student",
    })
    if(!token){
        return res.status(400).json({error:"Invalid token or token expired"})
    }
    let user = await Student.findById(token.user)
    if(!user){
        return res.status(400).json({error:"Student not found"})
    }
    let salt = await bcrypt.genSalt(saltrounds)
    let hashed_password= await bcrypt.hash(req.body.password, salt)
    user.password = hashed_password
    user = await user.save()
    if(!user) {
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send({message:"Password reset successfully"})

}

exports.resendVerification = async(req, res)=>{
    let user = await Student.findOne({email: req.body.email})
    if(!user){
        return res.status(400).json({error:"Email not registered"})
    }
    if(user.isVerified){
        return res.status(400).json({error:"User is already verified"})
    }
    await Token.deleteMany({user: user._id})
    let token = await Token.create({
        user: user._id,
        userType: 'Student',
        token: crypto.randomBytes(24).toString('hex')
    })
    if(!token){
        return res.status(400).json({error: "Something went wrong"})
    }
    // const URL = `${process.env.FRONTEND_URL}/resendverification/${token.token}`
    const URL = `http://localhost:5000/resendverification/${token.token}`
    sendEmail({
        from: 'noreply@something.com',
        to: student.email,
        subject: 'Verification email',
        text: 'Click on the following link to activate: ' + URL,
        html: `<a href='${URL}'><button>Verify email</button></a>`
    })

    // Send success message to user
    res.send({message: "Verification email resent successfully"})
}





exports.getAllStudents = async(req, res)=>{
    let users = await Student.find()
    if(!users){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(users)
}
exports.getStudentDetails = async(req, res)=>{
    let user = await Student.findById(req.params.id)
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(user)
}

exports.updateStudent = async(req, res)=>{
    let userToUpdate = await Student.findByIdAndUpdate(req.params.id, {
        student_username: req.body.student_username,
        email: req.body.email,
        Phone: req.body.Phone,
        Address: req.body.Address,
        Grade: req.body.Grade
    }, {new:true})
    if(!userToUpdate){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(userToUpdate)
}

exports.deleteStudent = async(req, res)=>{
    let userToDelete = await Student.findByIdAndDelete(req.params.id)
    if(!userToDelete){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(userToDelete)
}


//login
exports.login =  async(req, res)=>{
    let {email, password}= req.body
    let user = await Student.findOne({email})
    if(!user){
        return res.status(400).json({error:"Email not registered"})
    }
    let passwordCorrect = await bcrypt.compare(password, user.password)
    if(!passwordCorrect){
        return res.status(400).json({error:"Password incorrect"})
    }
    if(!user.isVerified){
        return res.status(400).json({error:"Student not verified"})
    }
    let {_id, role, student_username, school_name, Grade, Phone, Address, Parent_name}= user
    let token = jwt.sign({
     _id, email, role, student_username, school_name, Grade, Phone, Address, Parent_name 
     }, process.env.JWT_SECRET)

     res.cookie('myCookie', token, {expire: Date.now() + 86400})

     res.send({
        token, user:{_id,email, student_username,school_name, role, Grade, Phone, Address, Parent_name}
    })
}

//logout
exports.logOut = (req,  res)=>{
    res.clearCookie('myCookie')
    res.send({message:"Signed out successfully"})
}

exports.countStudents=async(req,res)=>{
 try{
  const studentCount= await Student.countDocuments()
  res.status(200).json(studentCount)
 }catch(error){
   res.status(500).json({ error: 'Failed to get students count' });
  console.error(error);
 }
}

exports.studentsByGrade=async(req,res)=>{
    try{
        let {grade}=req.params
        let students= await Student.find({Grade:grade})
        if(!students){
           return res.status(400).json({error:'Students not found.'})
        }
        res.status(200).json(students)
    }catch(error){
        res.status(500).json({ error: 'Server Error' });
        console.error(error);
    }
}

