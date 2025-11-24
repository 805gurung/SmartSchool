const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    }
})

module.exports = mongoose.model('Event',eventSchema)