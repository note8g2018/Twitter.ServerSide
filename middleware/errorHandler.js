const ErrorResponse         = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) =>{
    let error = {...err};
    error.message = err.message;

    if(err.code === 11000)
    {
        const message = "Duplicate Field Value Enter";
        error = new ErrorResponse({ message: message, statusCode: 400 });
        return next(error);
    }
    if(err.name === "ValidationError")
    {
        const message = Object.values(err.errors).map((val)=> val.message);
        error = new ErrorResponse({ message: message, statusCode: 400 });
        return next(error);
    }
    // return res.status(error.statusCode || 500).json({
    //     error: true,
    //     statusCode: error.statusCode || 500,
    //     errorMessage: error.message || "Server Error"
    // });
    return res.status(200).json({
        error: true,
        statusCode: error.statusCode || 500,
        errorMessage: error.message || "Server Error"
    });
}

module.exports = errorHandler;