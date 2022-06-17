//just require mongoose but not connect to database
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    first: {
        type:String,
        required:true
    },
    last: {
        type:String,
        required:true
    },
    office: {type: mongoose.Schema.Types.ObjectId,ref:'Office'}

},{timestamps:true})

const User = mongoose.model('User',userSchema);

module.exports=User;
