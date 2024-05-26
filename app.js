
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
mongoose.connect("mongodb://localhost:27017/my_database").then(()=>console.log("Connection Successful....")).catch(err=>console.log(err));


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

    userSchema.methods.generateAuthToken=async function(){
        try{
            const token=jwt.sign({id:this._id.toString()},process.env.SECRET_KEY);
            this.tokens=this.tokens.concat({token:token});
            await this.save();
            return token;
        }
        catch(error)
        {
            res.send("Error Message",error);
        }
    };

    userSchema.pre("save",async function(next){
        if(this.isModified('password')){
            this.password=await bcrypt.hash(this.password,10);
        }
        next();
    })
const Users=new mongoose.model("Users",userSchema); 




module.exports=Users;