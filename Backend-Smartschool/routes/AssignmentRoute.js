const { addAssignment, getAssignment } = require('../controller/AssignmentController')

const router = require('express').Router()

router.post('/addassignment',addAssignment)
router.get('/getassignments/:grade', getAssignment)

module.exports = router