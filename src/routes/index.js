const express = require('express');
const login=require('./NonAuth/loginRoute');
const register=require('./NonAuth/registerRoute');
const movieRoute = require('./Auth/movieRoute');
const { jwtAuthMiddleware } = require('../utilities/jwt');

const routes=express.Router();
routes.use('/register',register);
routes.use('/login',login);
routes.use('/movieList',jwtAuthMiddleware,movieRoute)
module.exports = routes;