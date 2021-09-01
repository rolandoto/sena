const { Schema, model } = require("mongoose");

const appreticeSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    appretices: Array,
    motiveOrProhibition: String,
    message: String,
    otherIntegrants: Array,
    attachFiles: Array,
    spokesman: Object,
    draw: {
        type: Boolean,
        default: true,
    },
    citation: {
        type: String
    },
    statusDetail: {
        type: String,
        default: "Pendiente",
    },
    status: {
        type: String,
        enum: ["approved", "pending", "reject"],
        default: "pending",
    },
    create_at: {
        type: Date,
        default: new Date(),
    },
});

module.exports = model("Solicity", appreticeSchema);
