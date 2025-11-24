const router = require('express').Router()
const { getAllResults, addResult, deleteResult, deleteAllResults, studentResult } = require('../controller/ResultController')

router.get('/allresults/:grade',getAllResults)
router.post('/addresult',addResult)
router.delete('/deleteresult/:id',deleteResult)
router.delete('/deleteallresults',deleteAllResults)
router.get('/studentresult/:studentid', studentResult)

module.exports = router
