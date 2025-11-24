const mongoose = require('mongoose')
const Admin = require('../models/AdminModel')
const Token = require('../models/TokenModel')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const sendEmail = require('../middleware/emailSender')
const { error } = require('console')
const saltrounds = 10;
const jwt = require('jsonwebtoken')

//register
exports.adminRegister = async (req, res) => {
    //take inputs from user
    const { name, schoolName, email, password, role } = req.body

    //check if username is already taken
    let admin = await Admin.findOne({ name })
    if (admin) {
        return res.status(400).json({ error: 'Username not available.' })
    }
    //check if schoolname is already taken
    admin = await Admin.findOne({ schoolName })
    if (admin) {
        return res.status(400).json({ error: 'School Name not available.' })
    }
    //check if email is already registered
    admin = await Admin.findOne({ email })
    if (admin) {
        return res.status(400).json({ error: 'Email already registered!' })
    }
    //encrypt password
    // "salt" is a random string added to your password before hashing it.
    // saltrounds is a parameter that determines the complexity of the salt generation. More rounds mean more security, but it takes more time.
    const salt = await bcrypt.genSalt(saltrounds)
    const hashed_password = await bcrypt.hash(password, salt)
    //save user in database
    admin = await Admin.create({
        name, schoolName, email, password: hashed_password, role
    })
    if (!admin) {
        return res.status(400).json({ error: 'Something went wrong!' })
    }
    //generate verification token
    let token = await Token.create({
        user: admin._id,
        userType: admin.role,
        token: crypto.randomBytes(24).toString('hex')
    })
    //send token on email
    const URL = `${process.env.FRONTEND_URL}/verify/${token.token}`
    sendEmail({
        from: 'noreply@gmail.com',
        to: req.body.email,
        subject: 'Verification Email',
        text: 'Click on the following link to activate' + URL,
        html: `<a href='${URL}'><button>Verify Email</button></a>`
    })

    //send msg to the user
    res.send({ message: 'Admin registered successfully!' })
}

//verify user
exports.verifyAdminEmail = async (req, res) => {
    //check if token is valid
    let token = await Token.findOne({ token: req.params.token, userType: 'Admin' })
    if (!token) {
        return res.status(400).json({ error: 'Invalid or Token may have expired' })
    }
    //find user
    let admin = await Admin.findById(token.user)
    if (!admin) {
        return res.status(400).json({ error: 'Admin not found!' })
    }
    //check if user is already verified
    if (admin.isVerified) {
        return res.status(400).json({ error: "Admin is already verified. Login to continue." });
    }
    //verify user
    admin.isVerified = true
    admin = await admin.save()
    if (!admin) {
        return res.status(400).json({ error: "Something went wrong." });
    }
    //send message to user
    res.send({ message: "User verified successfully." })
}

//login
exports.adminLogin = async(req,res)=>{
    const{email,password}=req.body

    //check email
    let admin = await Admin.findOne({email})
    if(!admin){
        return res.status(400).json({email:'Email not registered.'})
    }
     
    //check password
    let correctPassword = await bcrypt.compare(password,admin.password)
    if(!correctPassword){
        return res.status(400).json({error:'Incorrect Password'})
    }
    //check if admin is verified
    if(!admin.isVerified){
        return res.status(400).json({error:"User not verified."})
    }
    //generate login token
    let{_id, role, name} = admin
    let token = jwt.sign({
        _id, role, name, email
    },process.env.JWT_SECRET)

    //set token in cookies
    res.cookie('myCookie',token, {expire:Date.now()+86400})

    //send information to user
    res.send({
        token,
        admin:{_id, email, name, role}
    })
}

//signout
exports.Signout = (req,res) =>{
    res.clearCookie('myCookie')
    res.send({message:'Signed out successfully!'})
}