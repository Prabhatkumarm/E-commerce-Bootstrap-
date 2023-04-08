const express= require('express');
const router= express.Router();
const Product = require('../models/products');
const Review = require('../models/review');
const {validateProducts,validateReviews}= require('../middleware');


router.post('/products/:Id/review',validateReviews,async(req,res)=>{
    try {
        const {Id}=req.params;
        const product= await Product.findById(Id);
        const review=new Review({...req.body});
        await review.save();
        product.reviews.push(review); //we push entire review but internally mongoose will take only its id and save 
        await product.save();
        req.flash('msg','Added your review successfully');
        res.redirect(`/products/${Id}`); 
    } catch (error) {
        
        res.status(200).send(error.message);
    }
       
})









module.exports=router;
