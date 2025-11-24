const { addExam, getexams, getexamdetails, updateExam, deleteExam } = require('../controller/ExamController')
const upload = require('../middleware/fileUpload')

const router = require('express').Router()

router.post('/addexam', upload.single('routine') ,addExam)
router.get('/getexams',getexams)
router.get('/getexamdetails/:id',getexamdetails)
router.put('/updateexam/:id',upload.single('routine'),updateExam)
router.delete('/deleteexam/:id',deleteExam)

module.exports = router

