const mongoose = require('mongoose');

//INSERT MODELS
const Request = require('./models/request')

//MONGO CONNECTION TO DATABASE
mongoose.connect('mongodb://localhost:27017/misRequest', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
console.log("Mongo open")})
.catch(err => {
console.log("oh no, Mongo error")
 console.log(err);
})
 




const seedRequests = [
    {
        requester: 'Nicko De Guzman',
        nature: 'Fix Internet Connection',
        date_created: Date.now(),
        category: 'Network'
    },
    {
        requester: 'Charmane De Guzman',
        nature: 'UIS not connected',
        date_created: Date.now(),
        category: 'Network'
    },
    {
        requester: 'Charmane R. Flores',
        nature: 'Printer error',
        date_created: Date.now(),
        category: 'Hardware'
    },
    {
        requester: 'Jayvee Ortiz',
        nature: 'Install Microsoft word',
        date_created: Date.now(),
        category: 'Software'
    },
    {
        requester: 'Nicko De Guzman',
        nature: 'Aircon not working',
        date_created: Date.now(),
        category: 'Hardware'
    }
]


//if fail validation, it will not insert anything
Request.insertMany(seedRequests)
.then (res => {
    console.log(res)
})
.catch(e=> {
    console.log(e)
})