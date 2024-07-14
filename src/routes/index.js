const express = require('express');
const login=require('./NonAuth/loginRoute');
const register=require('./NonAuth/registerRoute');
const movieRoute = require('./Auth/movieRoute');

const routes=express.Router();
routes.use('/register',register);
routes.use('/login',login);
routes.use('/movieList',movieRoute)
module.exports = routes;