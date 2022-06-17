//just require mongoose but not connect to database
const mongoose = require('mongoose');
const User = require('./user');

const officeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type:String,
        required:true
    },
    head: {
        type:String,
        required:true
    },
    members: [{type: mongoose.Schema.Types.ObjectId,ref:"User"}]

},{timestamps:true})

const Office = mongoose.model('Office',officeSchema);

module.exports=Office;
