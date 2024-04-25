const mongoose = require('mongoose');
const User = require('./User');
const todoSchema=mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        default:false,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Todo',todoSchema)