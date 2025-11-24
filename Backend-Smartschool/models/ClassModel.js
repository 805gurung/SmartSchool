const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    classroom:{
        type:String,
        required:true
    },
    classTeacher:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('Class', classSchema)