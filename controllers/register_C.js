const bcrypt = require('bcrypt');
const User = require('../models/User');
const Info = require('../models/Info');
const ErrorResponse = require('../utils/errorResponse');
const validator = require('../utils/validator');

const register = async (req, res, next) =>
{
    const { username, email, password } = req.body;
    if (!username || !email || !password)
    {
        const message = "Please provide a username, email and password";
        return next(new ErrorResponse({ message: message, statusCode: 400 }));
    }
    const isValid = validator.validateAll(username, email, password);
    if (!isValid)
    {
        const message = "Your username or password is not valid";
        return next(new ErrorResponse({ message: message, statusCode: 401 }));
    }
    const duplicate = await User.findOne({ username: username }).exec();
    //console.log(duplicate);
    if (duplicate)
    {
        const message = "This username is taken, sorry!!";
        return next(new ErrorResponse({ message: message, statusCode: 409 }));
    }

    let info = await Info.findOne();
    if (!info)
    {
        info = await Info.create({ idNumberUser: 0 });
    }
    const idNumber = ++info.idNumberUser;

    try 
    {
        const hashedPassword = await bcrypt.hash(password, 14);
        // create and store new user
        await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            idNumber: idNumber,
            ip: req.ip,
        });
        await info.save();
        //req.redirect('/login');
        res.redirect('/login');
    }
    catch (error) 
    {
        return next(error);
    }
};

module.exports = { register };