const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const tokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    user:{
        type:ObjectId,
        refpath:'userType'

    },
    userType:{
        type:String,
        required:true,
        enum:['Admin','Student','Teacher']
    },
    createdAt:{
        type:Date,
        default: Date.now(),
        expires: 86400
    }
})
module.exports = mongoose.model('Token', tokenSchema)