const express = require('express');
const register = express.Router();
const Users = require('../../schema/Users');
const bcrypt = require('bcryptjs');

register.post('/', async (req, res) => {
    try {
        const { email, password,name,phone } = req.body;
        
        // Check if the user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        // Hash the password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create a new user
        const newUser = new Users({
            email,
            password: hashedPassword,
            name:name,
            phone:phone,
        });
        
        await newUser.save();
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = register;