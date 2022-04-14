
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Session = require('../models/Session');
const ErrorResponse = require('../utils/errorResponse');

const logout = async (req, res, next) =>
{
    const { token } = req.body;
    if (!token)
    {
        const message = "Please login first";
        return next(new ErrorResponse({ message: message, statusCode: 400 }));
    }

    try 
    {
        const session = await Session.findOne({ token: token }).select("+tokenSecret");
        if (!session)
        {
            const message = "Please Login first";
            return next(new ErrorResponse({ message: message, statusCode: 401 }));
        }
        const decoded = jwt.verify(token,
            session.tokenSecret);
        const user = await User.findById(decoded._id);
        user.isLogin = false;
        await Session.deleteOne({ token: token });
        await user.save();

        return res.status(200).json({
            error: false,
            statusCode: 200,
            // result: "Please Delete Token in Client Side",
            // shouldDeleteToken: true,
            token: null,
            data: user,
        });
    }
    catch (error) 
    {
        return next(error);
    }
};

module.exports = { logout };