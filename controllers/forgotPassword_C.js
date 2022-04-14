const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

const forgotPassword = async (req, res, next)=>
{
    const { username } = req.body;
    if (!username)
    {
        const message = "Please provide a username";
        return next(new ErrorResponse({ message: message, statusCode: 404 }));
    }
    try 
    {
        const user = await User.findOne({username});
        if(!user)
        {
            const message = "Please provide a username";
            return next(new ErrorResponse({message:message, statusCode:404}));
        }
        const tempPassword = crypto.randomBytes(5).toString("hex");
        user.tempPassword = await bcrypt.hash(tempPassword, 14);
        //console.log(user.resetPasswordToken);
        user.tempPasswordExpire = Date.now() + 1000 * 60 * 5;
        await user.save();
        const message = `
        <h1>You have requested a password reset</h1>
        <p>The Reset Password code is: ${tempPassword}</p>
        `;
        try 
        {       
            await sendEmail({
                to: user.email,
                subject: "Password Reset",
                text: message,
            });
            return res.status(200).json({
                error: false,
                statusCode: 200,
                token: null,
                data: null,
                result: "Email sent",
            });     
        }
        catch (error) 
        {
            user.tempPassword = undefined;
            user.tempPasswordExpire = undefined;
            await user.save();
            return next(new ErrorResponse({
                message: "Email could not be sent",
                statusCode: 500,
            }));            
        }
    } 
    catch (error) 
    {
        return next(error);
    }
}

module.exports = { forgotPassword };