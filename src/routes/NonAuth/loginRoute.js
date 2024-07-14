// login.js
const express = require('express');
const login = express.Router();
const Users = require('../../schema/Users');
const bcrypt = require('bcryptjs');

login.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json(user);
        }
        console.log("Test>>>>>>>>",password,user.password);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.status(200).json({ message: 'User logged in successfully' });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = login;
