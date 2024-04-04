const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        max: 10,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model("User", userSchema);