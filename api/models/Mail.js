const { model, Schema } = require("mongoose");

const mailSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mails: {
        type: String,
        required: true,
    },
    notification: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
});

module.exports = model("Mail", mailSchema);
