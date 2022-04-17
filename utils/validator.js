const validator = require("email-validator");


function validateUsername(username = '') 
{
    //if (typeof username !== 'string') return false;
    const pattern = /^([a-z]{3})([a-z0-9]{5,28}$)/;
    const regex = new RegExp(pattern);
    return regex.test(username);
}

function validatePassword(password = '') 
{
    //if (typeof username !== 'string') return false;
    const pattern = /^([a-zA-Z0-9!@#$%^&*()_+=-]{8,31}$)/;
    const regex = new RegExp(pattern);
    return regex.test(password);
}

function validateAll(username, email, password) 
{
    const isUsername = validateUsername(username);
    const isEmail = validator.validate(email);
    const isPassword = validatePassword(password);
    return isUsername && isEmail && isPassword;
}

function validateTitle(title)
{
    if(title.length < 100)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function validateBody(body)
{
    if(body.length < 1000)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function validateArticle(title, body)
{
    const isTitle = validateTitle(title);
    const isBody = validateBody(body);
    return isTitle && isBody;
}

module.exports = { validateAll, validateArticle };