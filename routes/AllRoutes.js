
const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require('../middleware/errorHandler');

const register = require('./register_R');
const login = require('./login_R');
const forgotPassword = require('./forgotPassword_R');
const resetPassword = require('./resetPassword_R');
const auth = require('../middleware/auth');
const logout = require('./logout_R');

const start = (app)=>
{
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.json());

    app.use('/register', register);
    app.use('/login', login);
    app.use('/forgotPassword', forgotPassword);
    app.use('/resetPassword', resetPassword);
    app.use(auth);
    app.use('/private', require("./testPrivate_R"));
    app.use('/logout', logout);

    // errorHandler must be the last one
    app.use(errorHandler);
};

module.exports = start;
