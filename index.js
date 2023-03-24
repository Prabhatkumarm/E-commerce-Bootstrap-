const express= require('express');
const app=express();
const path= require('path');

const ejsMate= require('ejs-mate');
app.engine('ejs',ejsMate);

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
.then(()=>{console.log('DB connected')})
.catch((err)=>{console.log(err)})

//takes routes from mini server and uses it
const productRoutes= require('./routes/productRoutes');
app.use(productRoutes);

const reviewRoute= require('./routes/reviewRoutes');
app.use(reviewRoute);

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