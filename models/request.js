//just require mongoose but not connect to database
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requester: {
        type: String,
        required: true
    },
    nature: {
        type:String,
        required:true
    },
    category: {
        type:String,
        enum: ['Hardware','Software','Network']
    }

},{timestamps:true})

const Request = mongoose.model('Request',requestSchema);

module.exports=Request;
