const express= require('express');
const app=express();
const path= require('path');

const ejsMate= require('ejs-mate');
app.engine('ejs',ejsMate);

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
.then(()=>{console.log('DB connected')})
.catch((err)=>{console.log(err)})

const session= require('express-session');
const flash= require('connect-flash');
app.use(flash());

const sessionConfig={
    secret: 'confidential keyword',
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionConfig));
app.use((req,res,next)=>{
    res.locals.msg=req.flash('msg');
    next();
})


//takes routes from mini server and uses it
const productRoutes= require('./routes/productRoutes');
app.use(productRoutes);

const reviewRoute= require('./routes/reviewRoutes');
app.use(reviewRoute);

const authRoute= require('./routes/authRoutes');
app.use(authRoute);

app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//tells express to use static file from public folder
app.use(express.static(path.join(__dirname,'public')));
 
const methodOverride = require('method-override');
app.use(methodOverride('__method'));









app.listen(5000,()=>{
    console.log('Server running on port 5000.....');
})