require('dotenv').config();

const express=require('express');
const app=express();
const port=process.env.PORT || 8000;
const routes=require('./routes/index');
const dbConnection  = require('./db/db');



app.use(express.json());
app.use('/',routes);

app.get('*',(req,res)=>{
    res.send("404 Error Page");
});
dbConnection();
app.listen(port,()=>{
    console.log(`listening to the ${port}`);
});