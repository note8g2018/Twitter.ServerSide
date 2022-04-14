const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const process = require('process');

const User = require('../models/User');
const Session = require('../models/Session');
const ErrorResponse = require('../utils/errorResponse');

const login = async (req, res, next)=>
{
    const {username, password} = req.body;
    if(!username || !password)
    {
        const message = "Please provide a username and password";
        return next(new ErrorResponse({message:message, statusCode:400}));
    }

    try 
    {
        const user = await User.findOne({username}).select("+password");
        //console.log(user);
        if(!user)
        {
            const message = "The username or password or both are not correct";
            return next(new ErrorResponse({message:message, statusCode:401}));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            const message = "The username or password or both are not correct";
            return next(new ErrorResponse({message:message, statusCode:401})); 
        }
        if (user.disabled)
        {
            const message = "This user is disabled";
            return next(new ErrorResponse({ message: message, statusCode: 401 }));
        }
        user.isLogin = true;
        user.lastTimeLoginUTC = Date.now();
        await Session.deleteOne({ userID: user._id }).exec();
        const tokenSecret = crypto.randomBytes(64).toString("hex");
        const token = jwt.sign({ _id: user._id }, tokenSecret,
            { expiresIn: process.env.JWT_EXPIRE });
        await Session.create({
            userID: user._id,
            username: user.username,
            tokenSecret: tokenSecret,
            token: token,
            ip: req.ip,
        });
        await user.save();
        user.password = undefined;
        
        return res.status(200).json({
            error: false,
            statusCode: 200,
            token: token,
            data: user,
        });
    } 
    catch (error) 
    {
        return next(error);
    }
}

module.exports = { login };