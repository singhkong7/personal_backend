// login.js
require('dotenv').config();
const express = require('express');
const login = express.Router();
const Users = require('../../schema/Users');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const { generateToken } = require('../../utilities/jwt');

login.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json(user);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const userInfo={"name":user.name,"email":user.email,"id":user._id}
            const token = generateToken(userInfo);
            res.status(200).json({
            message: "User Logged in Successfully",
            token,
            "ExpiresIn":100
            });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = login;
