require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.URI;
const db = mongoose.connection;

function connectDB() {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    db.on("open", (_) => {
        console.log("Database connect");
    });

    db.on("error", (err) => {
        throw err;
    });
}

connectDB();
