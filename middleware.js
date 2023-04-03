const {joiProductSchema,joiReviewSchema}= require('./joiSchemas');

const validateProducts=(req,res,next)=>{
    const {name,img,price,description}=req.body;
    const {error}= joiProductSchema.validate({name,img,price,description});
    if(error){
        const msg=error.details.map((err)=>err.message).join(',');
        console.log(error);
        // res.send("because of middleware");
        return res.render('products/error',{err:msg});
    }
    next();
}


module.exports={
    validateProducts
}