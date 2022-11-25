import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    passwordHash: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
})

module.exports =  mongoose.model('User', UserSchema)