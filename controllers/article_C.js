//const bcrypt = require('bcrypt');
//const User = require('../models/User');
//const Info = require('../models/Info');
const Article = require('../models/Article');
const ErrorResponse = require('../utils/errorResponse');
const validator = require('../utils/validator');

const articleSave = async (req, res, next) =>
{
    const user = req.user;
    const { title, body } = req.body;
    if (!title || !body )
    {
        const message = "Please provide a title and body";
        return next(new ErrorResponse({ message: message, statusCode: 400 }));
    }
    const isValid = validator.validateArticle(title, body);
    if (!isValid)
    {
        const message = "Your title or body is not valid";
        return next(new ErrorResponse({ message: message, statusCode: 401 }));
    }
    // const duplicate = await Article.findOne({ body: body }).exec();
    // //console.log(duplicate);
    // if (duplicate)
    // {
    //     const message = "This username is body, sorry!!";
    //     return next(new ErrorResponse({ message: message, statusCode: 409 }));
    // }

    // let info = await Info.findOne();
    // if (!info)
    // {
    //     info = await Info.create({ idNumberUser: 0 });
    // }
    //const idNumber = ++info.idNumberUser;

    try 
    {
        // create and store new Article
        const article = await Article.create({
            title: title,
            body: body,
            author: user.username,
        });
        //console.log(article);

        return res.status(200).json({
            error: false,
            statusCode: 200,
            token: null,
            data: article,
        });
    }
    catch (error) 
    {
        return next(error);
    }
};

module.exports = { articleSave };