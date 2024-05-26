require('dotenv').config()
const express=require('express');
const path=require('path');
const bcrypt=require('bcryptjs');
const app=express();
const port=process.env.PORT || 8000;
const Users=require('./app');


app.use(express.json());

// app.get('/',(req,res)=>{
//     res.send(`Welcome to Priyansh's Port`);
// });


// app.get('/users',async(req,res)=>{
//     try{
//         const listOfUsers=await Users.find();
//         res.send(listOfUsers);
//     }
//     catch(e){
//         res.send(e);
//     }
// });

app.post('/register',(req,res)=>{
    const createUser=new Users(req.body);
    createUser.save().then(()=>{
        res.status(201).send({"Message":"User created Successfully"});
    }).catch((e)=>{
        res.send(e);
    })

})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json(user);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid)
        {
            res.status(201).send({Message:"User Logged in successfully"});
        }
        else
        {
            return res.status(401).json({ error: 'Invalid email or password' });
        }        

        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.patch('/users/:id',async(req,res)=>{
//     try
//     {
//         const _id=req.params.id;
//         const updatedUser=await Users.findByIdAndUpdate(_id,req.body);
//         res.status(201).send({"Message":"User updated Successfully"});

//     }
//     catch(e){
//         res.send(e);
//     }
// });

// app.delete('/users/:id',async(req,res)=>{
//     try
//     {
//         if(!req.params.id)
//         {
//             res.status(400).send("Invalid Id");
//         }
//         else
//         {
//             const result=await Users.findByIdAndDelete(req.params.id);
//             res.status(201).send({"Message":"User deleted Successfully"});
//         }
        
//     }
//     catch(e){
//         res.send(e);
//     }
// });

app.get('*',(req,res)=>{
    res.send("404 Error Page");
});

app.listen(port,()=>{
    console.log(`listening to the ${port}`);
});