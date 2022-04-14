class ErrorResponse extends Error
{
    constructor({ message, statusCode = 400, error = true}={})
    {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
    }
}

module.exports = ErrorResponse;