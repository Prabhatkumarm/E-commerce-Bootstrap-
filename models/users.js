const mongoose=require('mongoose');
const passportLM=require('passport-local-mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type: String,
        trim: true,
        required: true
    }
});


//username and password are directly added to the model by passport local mongoose
userSchema.plugin(passportLM);

const User= mongoose.model('User',userSchema);

module.exports=User;