const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema({
    subject:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    details:{
        type: String,
        required:true
    },
    grade:{
        type: String,
        required:true
    }
},{timestamps: true})

module.exports = mongoose.model('Assignment',assignmentSchema)