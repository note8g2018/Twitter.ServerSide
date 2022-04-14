const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');
const ErrorResponse = require('../utils/errorResponse');

const auth = async (req, res, next) =>
{
    const { token } = req.body;
    if (!token)
    {
        const message = "Please Login first";
        return next(new ErrorResponse({ message: message, statusCode: 401 }));
    }
    const session = await Session.findOne({ token: token }).select("+tokenSecret");
    //console.log(isMatch);
    if (!session)
    {
        const message = "Please Login first";
        return next(new ErrorResponse({ message: message, statusCode: 401 }));
    }
    try 
    {
        const decoded = jwt.verify(token,
            session.tokenSecret);
        const user = await User.findById(decoded._id);
        user.updatedAt = Date.now();
        await user.save();
        session.updatedAt = Date.now();
        await session.save();
        if (!user)
        {
            const message = "Please Login first";
            return next(new ErrorResponse({ message: message, statusCode: 404 }));
        }
        if (user.disabled)
        {
            const message = "This user is disabled";
            return next(new ErrorResponse({ message: message, statusCode: 401 }));
        }
        //console.log(user);
        req.user = user;
        return next();
    }
    catch (error) 
    {
        const message = "Not authorized to access this route";
        return next(new ErrorResponse({ message: message, statusCode: 401 }));
    }
};

module.exports = auth;