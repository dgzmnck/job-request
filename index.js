//EXPRESS
const express= require('express');
const app = express();
const path = require('path');
const ejsMate= require('ejs-mate')
//REQUIRE MONGOOSE = npm i mongoose
const mongoose = require('mongoose');
//METHOD OVERRIDE = npm i method-override
const methodOverride = require('method-override')

//categories
const categories= ['Hardware','Software','Network']

const moment = require("moment");



//INSERT MODELS
const Request = require('./models/request');
const User = require('./models/user');
const Office = require('./models/office');
const e = require('method-override');

//MONGO CONNECTION TO DATABASE
mongoose.connect('mongodb://localhost:27017/misRequest', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
console.log("Mongo open")})
.catch(err => {
console.log("oh no, Mongo error")
 console.log(err);
})
 


//EXPRESS INIT
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',ejsMate) //ASSIGN EJS MATE AS ENGINE NOT THE DEFAULT
app.set('view engine','ejs');
//method override
app.use(methodOverride('_method'));

app.use((req, res, next)=>{
    res.locals.moment = moment;
    next();
  });
  


//ROUTES - WILL BE MOVED TO SEPERATE FOLDER
//ACCOUNT
app.get('/account/new',async (req,res)=> {
const offices= await Office.find({})
    res.render('account/create',{offices})
    })


//USERS =================================

app.get('/users', async(req,res)=> {
    const users = await User.find({});
    console.log(users)
res.render('users/index',{users})
})

app.get('/users/new', async (req,res)=> {
    const offices= await Office.find({})
    res.render('users/new',{offices})
})

app.post('/users/new',  async(req,res)=> {
    const {username,first,last,office} = req.body;
  const user=  new User({username,first,last})

  const found_office= await Office.findById(office)
  user.office=found_office
  await user.save()
 console.log(user)
 console.log(found_office)
    res.redirect('/users')

})


//OFFICE =================================   
app.get('/offices', async(req,res)=> {
    const offices = await Office.find({});
    console.log(offices)
res.render('offices/index',{offices})
})

app.get('/offices/new', (req,res)=> {
res.render('offices/new')
})

app.post('/offices/new',  async(req,res)=> {
  const office=  new Office(req.body)
  await office.save()
    res.redirect('/offices')
})







app.get('/requests' , async(req,res)=> {
try {
    const {category} = req.query;
    console.log(category)
    if (category) {
 const requests =  await Request.find({category});
 res.render('requests/index',{requests,category});
    } else {
        const requests =  await Request.find({});
        res.render('requests/index',{requests,category: 'All'})
    }
} catch(e) {
    console.log(e)
}
    
})

app.get('/requests/new', (req,res)=> {
    res.render('requests/new'); 
})

app.post('/requests', async(req,res)=> {
const newR = new Request(req.body);
await newR.save()
    res.redirect('/requests'); 
})


    

app.get('/requests/:id/edit',async (req,res)=> {
    const {id} = req.params;
   const r= await Request.findById(id);
console.log(r);
   res.render('requests/edit',{r,categories})
})

app.put('/requests/:id',async (req,res)=> {
    const {id} = req.params;
   const r= await Request.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    console.log(r);
   res.redirect(`/requests/${r._id}`)
})
app.delete('/requests/:id',async(req,res)=> {
  const {id} = req.params;
  const deletedRequest =await Request.findByIdAndDelete(id);
  res.redirect(`/requests`)
   
})



app.get('/requests/:id',async (req,res)=> {
    const {id} = req.params;
   const r= await Request.findById(id);
console.log(r);
   res.render('requests/show',{r})
})









// STARTING EXPRESS - MUST BE AT THE VERY END
app.listen(3000,()=> {
    console.log('Listening on 3000')
})


