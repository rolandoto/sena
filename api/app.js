const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");

// Config static files
app.use(express.static(path.join(__dirname, "/assets")));

// Avoid CORS policy
app.use(cors());

// This help us to protect our app
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request all routes
fs.readdir("./routes", (err, files) => {
    files.forEach((route) => {
        app.use(require("./routes/" + route));
    });
});

module.exports = app;
