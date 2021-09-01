require("dotenv").config();
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const userRoles = require("../config/userRoles");

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    first_name: String,
    last_name: String,
    user_role: {
        type: String,
        required: true,
    },
    profilePicture: String,
    enable: {
        type: Boolean,
        default: true,
    },
    date_create: {
        type: Date,
        default: new Date(),
    },
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.confirmPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = model("User", userSchema);
