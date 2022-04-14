const mongoose      = require('mongoose');

const InfoSchema = new mongoose.Schema({
    idNumberUser:{
        trim: true,
        type: Number,
        required: [true,'Please provide a idNumberUser'],
        indexes: true,
        unique: true,
        default: 0,
    },
},
{
    timestamps: true,
}
);

const Info = mongoose.model('Info', InfoSchema);
module.exports = Info;