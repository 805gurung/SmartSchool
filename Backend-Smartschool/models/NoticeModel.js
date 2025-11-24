const mongoose = require('mongoose')

const noticeSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
    },
    description:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('Notice', noticeSchema)