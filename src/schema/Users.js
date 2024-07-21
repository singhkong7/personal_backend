const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone: {
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    tokens:[{
        token:{
            type:String,
            require:true,
        }
    }]
    });


const Users=new mongoose.model("Users",userSchema); 




module.exports=Users;