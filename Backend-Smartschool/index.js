const express = require('express')
require('dotenv').config()
require('./Database/Connection')
const cors = require('cors')




const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

const StudentRoute = require('./routes/StudentRoute')
const UserRoute = require('./routes/UserRoute')
const NoticeEventRoute = require('./routes/noticeEventRoute')

const ExamRoute = require('./routes/ExamRoutes')
const AssignmentRoute = require('./routes/AssignmentRoute')

const ResultRoute = require('./routes/ResultRoute')


app.use(UserRoute)
app.use(NoticeEventRoute)
app.use(StudentRoute)
app.use(ExamRoute)
app.use(AssignmentRoute)
app.use('/public', express.static('public'))

app.use(ResultRoute)



app.listen(port,()=>{console.log(`App started successfully at port ${port}`)})

