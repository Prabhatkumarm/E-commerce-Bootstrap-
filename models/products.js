const mongoose= require('mongoose');
const Review = require('./review');

const productSchema= new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    img:{
        type: String,
        trim: true,
        default: '/images/product.jpg'
    },
    price:{
        type: Number,
        min: 0,
        default: 0
    },
    description:{
        type: String,
        trim: true
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});


//deletes all the associated reviews
productSchema.post('findOneAndDelete',async (data)=>{
    if(data.reviews.length >0){

        await Review.deleteMany({_id:{$in: data.reviews}})
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports= Product;
