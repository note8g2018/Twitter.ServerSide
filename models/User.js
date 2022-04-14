const mongoose      = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        trim: true,
        type: String,
        required: [true,'Please provide a username'],
        indexes: true,
        unique: true,
        lowercase: true,
    },
    email:{
        trim: true,
        type: String,
        required: [true,'Please provide an email'],
        indexes: true,
        lowercase: true,
    },
    password:{
        trim: true,
        type: String,
        required: [true,'Please provide a password'],
        minlength: 8,
        select: false,
    },
    idNumber:{
        type: Number,
        indexes: true,
    },
    ip:{
        type: String,
    },
    disabled: {
        type: Boolean,
    },
    isLogin:{
        type: Boolean,
    },
    lastTimeLoginUTC:{
        type: Date,
    },
    tempPassword:{type: String, trim: true, select: false},
    tempPasswordExpire: {type: Date, select: false},
},
{
    timestamps: true,
    validateBeforeSave: true,
}
);

const User = mongoose.model('User', UserSchema);
module.exports = User;