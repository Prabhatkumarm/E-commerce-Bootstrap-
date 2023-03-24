const express= require('express');
const router= express.Router();
const Product= require('../models/products');
router.use(express.urlencoded({extended:true}));
const methodOverride = require('method-override');
router.use(methodOverride('__method'));

router.get('/products',async(req,res)=>{
    const products= await Product.find({});
    res.render('products/index',{products});
})

router.get('/products/new',(req,res)=>{
    res.render('products/new');
})

router.post('/products' ,async(req,res)=>{
    const {name,img,price,description}= req.body;
    await Product.create({name,img,price,description});
    res.redirect('/products');
})

router.get('/products/:Id', async(req,res)=>{
    const { Id } = req.params;
    
    const pdt =  await Product.findById(Id).populate('reviews');
    
    
    res.render('products/show',{pdt});
})

router.get('/products/:Id/edit',async(req,res)=>{
    const {Id}=req.params;
    const pdt= await Product.findById(Id);
    res.render('products/edit',{pdt})
})

router.patch('/products/:Id', async(req,res)=>{
    const { Id } = req.params;
    const {name, img, price, description}= req.body;
    const pdt =  await Product.findByIdAndUpdate(Id,{name, img, price, description});
    

    res.redirect(`/products/${Id}`);
})

router.delete('/products/:Id',async(req,res)=>{
    const {Id}= req.params;
    await Product.findByIdAndDelete(Id);
    res.redirect('/products');
})


module.exports= router;