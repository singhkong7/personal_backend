const mongoose=require('mongoose');
const dbConnection=async ()=>{
    await mongoose.connect("mongodb://localhost:27017/my_database")
    .then(()=>console.log("Connection Successful...."))
    .catch(err=>console.log(err));
}
module.exports=dbConnection;

