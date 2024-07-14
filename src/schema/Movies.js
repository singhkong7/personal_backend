const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    title:String,
    year:String,
    rating:String,
    type:String,
    poster:String,

    });

    
const Movies=new mongoose.model("Movies",userSchema); 




module.exports=Movies;