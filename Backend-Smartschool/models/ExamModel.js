const mongoose = require ('mongoose')

const examSchema = mongoose.Schema({
    classroom:{
        type: String,
        required : true
    },
    date:{
        type: Date,
        required: true
    },
    routine:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Exam', examSchema)