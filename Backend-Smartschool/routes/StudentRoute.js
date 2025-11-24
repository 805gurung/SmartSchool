const { getAllStudents, getStudentDetails, updateStudent, deleteStudent, forgetPassword, resetPassword, resendVerification, logOut, login, register, verifyEmail, studentsByGrade, } = require('../controller/StudentController')
const {validationScript, userRules } = require('../middleware/validationScript')

const router = require('express').Router()



router.post('/register', userRules, validationScript, register)
router.get('/verifystudent/:token', verifyEmail)
router.get('/getallstudents', getAllStudents)
router.get('/getstudentdetails/:id', getStudentDetails)
router.put('/updatestudent/:id', updateStudent)
router.delete('/deletestudent/:id', deleteStudent)
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword/:token', resetPassword)
router.post('/resendverification', resendVerification)
router.post('/login', login)
router.get('/logout', logOut)

router.get('/students/Grade-:grade', studentsByGrade)

module.exports = router
