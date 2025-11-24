const Teacher = require("../models/TeacherModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const saltrounds = 10;
const Token = require("../models/TokenModel");
const sendEmail = require("../middleware/emailSender");
const jwt = require("jsonwebtoken")
const {expressjwt}= require("express-jwt")


//register teacher
exports.register = async (req, res) => {
  let { username, schoolname, email, password, phone, address, subject, role } = req.body;

  //check if username is already taken
  let user = await Teacher.findOne({ username });
  if (user) {
    return res.status(400).json({ error: "Username already taken" });
  }

  //check if email is already registered
  user = await Teacher.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "Email already registered." });
  }

  //encrypt password
  let salt = await bcrypt.genSalt(saltrounds);
  let hashed_password = await bcrypt.hash(password, salt);

  //save user in database
  user = await Teacher.create({
    username,
    schoolname,
    email,
    password: hashed_password,
    phone,
    address,
    role,
    subject,
    
  });

  if (!user) {
    return res.status(400).json({ error: "something went wrong." });
  }

  //generate verification token

  let token = await Token.create({
    user: user._id,
    userType: user.role,
    token: crypto.randomBytes(24).toString("hex"),
  });
  if (!token) {
    return res.status(400).json({ error: "Something went wrong." });
  }

  //sending token in email
  const URL = `http://localhost:5000/verifyteacher/${token.token}`
//   const URL = `${process.env.FRONTEND_URL}/verify/${token.token}`;
  sendEmail({
    from: "noreply@something.com",
    to: email,
    subject: "Verification Email",
    text: "Click on the following link to activate." + URL,
    html: `<a href='${URL}'><button>Verify Email</button></a>`,
  });

  //send msg to user
  res.send(user);
};

//verify user

exports.verifyEmail = async (req, res) => {
  let token = await Token.findOne({
    token: req.params.token,
    userType: "Teacher",
  });
  if (!token) {
    return res.status(400).json({ error: "something went wrong" });
  }

  //find user
  let user = await Teacher.findById(token.user);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  //check if already verified
  if (user.isVerified) {
    return res
      .status(400)
      .json({ error: "user already verified. Log in to continue" });
  }

  //verify user
  user.isVerified = true;
  user = await user.save();

  if (!user) {
    return res.status(400).json({ error: "something went wrong" });
  }

  res.send({ message: "User verified successfully." });
};

//get Teachers list

exports.getTeachers = async (req, res) => {
  let users = await Teacher.find();
  if (!users) {
    return res.status(400).json({ error: "something went wrong." });
  }
  res.send(users);
};

//get teacher details

exports.getTeacherDetails = async (req, res) => {
  let user = await Teacher.findById(req.params.id);
  if (!user) {
    return res.status(400).json({ error: "Something went wrong." });
  }
  res.send(user);
};

//update teachers

exports.updateTeacher = async (req, res) => {
  let userToUpdate = await Teacher.findByIdAndUpdate(
    req.params.id,
    { username: req.body.username ,
      address: req.body.address,
      subject: req.body.subject,
      phone: req.body.phone
    },
    { new: true }
  );
  if (!userToUpdate) {
    return res.status(400).json({ error: "something went wrong." });
  }
  res.send(userToUpdate);
};

//delete teacher
exports.deleteTeacher = async (req, res) => {
  Teacher.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      if (!deleted) {
        return res.status(400).json({ error: "User not found" });
      }
      res.send("user deleted successfully");
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

//login
exports.login = async (req, res) => {
  let { email, password } = req.body;

  //check email
  let teacher = await Teacher.findOne({ email });

  if (!teacher) {
    return res.status(400).json({ error: "Email not registered." });
  }

  //check password
  let passwordCorrect = await bcrypt.compare(password, teacher.password);

  if (!passwordCorrect) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  //check if user is verified
  if (!teacher.isVerified) {
    return res.status(400).json({ error: "Teacher not verified." });
  }

  //generate login token
  let { _id, role, username, phone, address } = teacher;
  let token = jwt.sign(
    {
      _id,
      role,
      username,
      email,
      phone,
      address
    },  
    process.env.JWT_SECRET
  );

  //set token in cookies
  res.cookie("myCookie", token, { expire: Date.now() + 86400 });

  //send information to user
  res.send({
    token,
    teacher: { _id, email, username, role },
  });
};

//Number of teachers
exports.countTeacher=async(req,res)=>{
  try{
   const teacherCount= await Teacher.countDocuments()
   res.status(200).json(teacherCount)
  }catch(error){
    res.status(500).json({ error: 'Failed to get teacher count' });
   console.error(err);
  }
 }