const { Schema, model } = require("mongoose");

const motivesOrProhibitions = new Schema({
    title: String,
    description: String,
    create_at: {
        type: Date,
        default: new Date(),
    },
});

module.exports = model("MotivesOrProhibitions", motivesOrProhibitions);
