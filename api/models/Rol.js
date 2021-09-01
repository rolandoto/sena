const { json } = require("body-parser");
const { Schema, model } = require("mongoose");

const rolSchema = new Schema({
    role_name: {
        type: String,
        required: true,
    },
    capacity: {
        type: String,
        default: false,
    },
});

module.exports = model("Rol", rolSchema);
