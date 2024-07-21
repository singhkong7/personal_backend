const express = require('express');
const register = express.Router();
const Users = require('../../schema/Users');
const bcrypt = require('bcryptjs');
const constants = require('../../utilities/constants');


register.post('/', async (req, res) => {
    try {
        const { email, password,name,phone } = req.body;
        
        // Check if the user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: constants.DUPLICATE_USER_ERROR });
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
        
        res.status(201).json({ message: constants.REGISTER_SUCCESS });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: constants.SERVER_ERROR });
    }
});

module.exports = register;