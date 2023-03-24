const express= require('express');
const router= express.Router();
const Product = require('../models/products');
const Review = require('../models/review');


router.post('/products/:Id/review',async(req,res)=>{
    const {Id}=req.params;
    const product= await Product.findById(Id);
    const review=new Review({...req.body});
    await review.save();
    product.reviews.push(review); //we push entire review but internally mongoose will take only its id and save 
    await product.save();
    
    res.redirect(`/products/${Id}`);
       
})









module.exports=router;
