
const bcrypt = require('bcrypt');
const validator = require('../utils/validator');
const User      = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

const resetPassword = async (req, res, next)=>
{
    const { username, resetCode, newPassword } = req.body;
    if (!username || !resetCode || !newPassword)
    {
        const message = "Please provide correct information";
        return next(new ErrorResponse({ message: message, statusCode: 404 }));
    }
    try 
    {
        const user = await User.findOne({
           username: username,
           tempPasswordExpire: {$gt: Date.now()},
        }).select('+tempPassword'); 
        if(!user)
        {
            return next(new ErrorResponse({
               message: "This rest code time is expired",
               statusCode: 400,
            }));
        }
        const isMatch = await bcrypt.compare(resetCode, user.tempPassword);
        if (!isMatch)
        {
            const message = "Your information is not correct";
            return next(new ErrorResponse({ message: message, statusCode: 401 }));
        }
        if (user.disabled)
        {
            const message = "This user is disabled";
            return next(new ErrorResponse({ message: message, statusCode: 401 }));
        }
        const isValid = validator.validateAll(username, user.email, newPassword);
        if (!isValid)
        {
            const message = "Your new password is not valid";
            return next(new ErrorResponse({ message: message, statusCode: 401 }));
        }
        user.password = await bcrypt.hash(newPassword, 14);
        user.tempPassword = undefined;
        user.tempPasswordExpire = undefined;
        await user.save();
        res.status(200).json({
            error: false,
            statusCode: 200,
            result: "Password Reset success",
            token: null,
            data: null,
        });
    } 
    catch (error) 
    {
        return next(error);
    }
}

module.exports = { resetPassword };