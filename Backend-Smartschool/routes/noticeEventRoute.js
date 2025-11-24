const { addNotice, editNotice, getAllNotices, deleteNotice, addEvent, getAllEvents, editEvent, deleteEvent} 
= require('../controller/NoticeEventController');

const router = require('express').Router()

router.post('/addnotice',addNotice)
router.get('/allnotices',getAllNotices)
router.put('/editnotice/:id',editNotice)
router.delete('/deletenotice/:id',deleteNotice)

router.post('/addevent',addEvent)
router.get('/allevents',getAllEvents)
router.put('/editevent/:id',editEvent)
router.delete('/deleteevent/:id',deleteEvent)

module.exports=router;