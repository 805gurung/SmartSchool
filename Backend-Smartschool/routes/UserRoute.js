const router = require('express').Router()
const { adminRegister, verifyAdminEmail, adminLogin, Signout } = require('../controller/AdminController');
const { countStudents } = require('../controller/StudentController');
const { register, verifyEmail, getTeachers, getTeacherDetails, updateTeacher, deleteTeacher, login, countTeacher, requireAdmin } = require('../controller/TeacherController');
const { validationScript, teacherRules, adminRules } = require('../middleware/validationScript');



router.post('/admin/register',adminRules, validationScript, adminRegister)
router.get('/verify/:token', verifyAdminEmail)
router.post('/admin/login', adminLogin)
router.get('/signout', Signout)

router.post('/registerteacher',teacherRules, validationScript, register )
router.get('/verifyteacher/:token',verifyEmail)
router.get('/getteachers', getTeachers)
router.get('/getteacherdetails/:id',getTeacherDetails)
router.put('/updateteacher/:id',updateTeacher)
router.delete('/deleteteacher/:id',deleteTeacher)
router.post('/loginteacher',login)

router.get('/teachercount',countTeacher)
router.get('/studentcount',countStudents)


module.exports = router;