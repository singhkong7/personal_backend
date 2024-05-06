
const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/my_database").then(()=>console.log("Connection Successful....")).catch(err=>console.log(err));


const userSchema=new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    phone: String,
    website: String,
    
    });


const Users=new mongoose.model("Users",userSchema);  


const newUsers= new Users({
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    });
    // newUsers.save();

    module.exports=Users;