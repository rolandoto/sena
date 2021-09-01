const multer = require("multer");
const path = require("path");

function generateRamdom(n) {
    let ramdomCode = "";
    const posibleCharacters = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i <= n; i++) {
        const generate = Math.random() * (1, posibleCharacters.length) + 1;
        ramdomCode += posibleCharacters.charAt(generate);
    }
    return ramdomCode;
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/../../assets/img"));
    },
    filename: function (req, file, cb) {
        cb(null, generateRamdom(40) + "-" + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000,
    },
});

module.exports = upload;
