const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    username: {
        trim: true,
        type: String,
        required: [ true, 'Please provide a username' ],
        indexes: true,
        unique: true,
        lowercase: true,
    },
    userID: {
        type: ObjectId,
        required: true,
        unique: true,
        indexes: true,
    },
    tokenSecret: {
        trim: true,
        type: String,
        select: false,
    },
    token: {
        trim: true,
        type: String,
        unique: true,
        indexes: true,
    },
    ip: {
        type: String,
    },
},
    {
        timestamps: true,
    }
);

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;