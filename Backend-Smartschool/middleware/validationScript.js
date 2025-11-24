const {check, validationResult} = require('express-validator')

exports.validationScript = (req, res, next)=>{
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg})
    }
    next()
}

exports.userRules = [
    check('student_username', "Username is required").notEmpty().isLength({min:3}).withMessage("Username must be atleast 3 characters"),
    check('Phone', 'Phone number is required').notEmpty().withMessage('Phone number is required').matches(/^\d{10}$/).withMessage('Phone number must be exactly 10 digits'),
    check('email', "Email is required").notEmpty().isEmail().withMessage("Email format incorrect"),
   
    check('password', 'Password is required').notEmpty().matches(/[a-z]/).withMessage("Password must contain atleast one lowercase")
    .matches(/[A-Z]/).withMessage("Password must contain atleast one uppercase")
    .matches(/[0-9]/).withMessage("Password must contain atleast one number")
    .matches(/[!@#$%_.-]/).withMessage("Password must contain atleast one special number")
    .isLength({min:8}).withMessage("Password must contain atleast 8 characters")
    .isLength({max:30}).withMessage("Password mus be atmost 30 characters")
]


exports.teacherRules = [
    check('username', "Username is required").notEmpty().isLength({min:3}).withMessage("Username must be atleast 3 characters"),
    check('email', "Email is required").notEmpty().isEmail().withMessage("Email format incorrect"),
    check('phone', 'Phone number is required').notEmpty().withMessage('Phone number is required').matches(/^\d{10}$/).withMessage('Phone number must be exactly 10 digits'),
    check('password', 'Password is required').notEmpty().matches(/[a-z]/).withMessage("Password must contain atleast one lowercase")
    .matches(/[A-Z]/).withMessage("Password must contain atleast one uppercase")
    .matches(/[0-9]/).withMessage("Password must contain atleast one number")
    .matches(/[!@#$%_.-]/).withMessage("Password must contain atleast one special number")
    .isLength({min:8}).withMessage("Password must contain atleast 8 characters")
    .isLength({max:30}).withMessage("Password mus be atmost 30 characters")
]

exports.adminRules = [
    check('name', "Username is required").notEmpty().isLength({min:3}).withMessage("Username must be atleast 3 characters"),

    check('email', "Email is required").notEmpty().isEmail().withMessage("Email format incorrect"),

    check('password', 'Password is required').notEmpty().matches(/[a-z]/).withMessage("Password must contain atleast one lowercase")
    .matches(/[A-Z]/).withMessage("Password must contain atleast one uppercase")
    .matches(/[0-9]/).withMessage("Password must contain atleast one number")
    .matches(/[!@#$%_.-]/).withMessage("Password must contain atleast one special number")
    .isLength({min:8}).withMessage("Password must contain atleast 8 characters")
    .isLength({max:30}).withMessage("Password mus be atmost 30 characters")
]

