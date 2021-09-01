const { Schema, model } = require("mongoose");

const templateSchema = new Schema({
    templateName: {
        type: String,
        required: true,
    },
    template: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
});

module.exports = model("Template", templateSchema);
