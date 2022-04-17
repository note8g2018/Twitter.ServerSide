const mongoose      = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title:{
        trim: true,
        type: String,
        required: [true,'Please provide a title'],
    },
    body:{
        trim: true,
        type: String,
        required: [true,'Please provide a body'],
    },
    author:{
        trim: true,
        type: String,
        required: [true,'Please provide a author'],
        indexes: true,
        lowercase: true,
    },
},
{
    timestamps: true,
    validateBeforeSave: true,
}
);

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;