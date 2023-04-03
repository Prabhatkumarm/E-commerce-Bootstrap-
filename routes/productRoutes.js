const express= require('express');
const router= express.Router();
const Product= require('../models/products');
const Review= require('../models/review');
const {validateProducts,validateReviews}=require('../middleware');
router.use(express.urlencoded({extended:true}));
const methodOverride = require('method-override');
router.use(methodOverride('__method'));

router.get('/products',async(req,res)=>{
    try {
        const products= await Product.find({});
        res.render('products/index',{products});
    } catch (error) {
        res.status(404).render('error',{err:error});
    }
})

router.get('/products/new',(req,res)=>{
    try {
        res.render('products/new');
    } catch (error) {
        res.status(404).render('products/error',{err:error.message});
    }
    
})

router.post('/products' ,validateProducts, async(req,res)=>{
    try {
        const {name,img,price,description}= req.body;
        await Product.create({name,img,price,description});
        res.redirect('/products');
    } catch (error) {
        res.status(404).render('products/error',{err:error});
    }
    
})

router.get('/products/:Id', async(req,res)=>{
    try {
        const { Id } = req.params;
    
        const pdt =  await Product.findById(Id).populate('reviews');
    
    
        res.render('products/show',{pdt});
    } catch (error) {
        res.status(404).render('error',{err:error});
    }
    
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
    // const pdt= await Product.findById(Id);
    // for(let r of pdt.reviews){
    //    await  Review.findByIdAndDelete(r);
    // }
    await Product.findByIdAndDelete(Id);
    res.redirect('/products');
})


module.exports= router;