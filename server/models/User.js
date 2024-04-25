const mongoose = require('mongoose');
const userSchema =  mongoose.Schema({
    name:{
        type:String,
        min:6
    },
    username:{
        type:String,
        min:6,
        required:true
    },
    password:{
        type:String,
        min:6,
        required:true
    },
    email:{
        type:String,
        required:true,
        min:6
    },
    todos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Todo'
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports  = mongoose.model('User',userSchema);   