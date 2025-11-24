const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const resultSchema = mongoose.Schema({
    studentID: {
        type: ObjectId,
        ref: 'Student',
        required: true
    },
    grade:{
        type:String,
        required:true
    },
    subjects: [
        {
            name: { type: String, required: true },
            marks: { type: Number, required: true }
        }
    ],
    totalMarks: {
        type: Number, required: true
    },
    GPA: {
        type: Number, required: true
    }
})

module.exports = mongoose.model('Result', resultSchema)