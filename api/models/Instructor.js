const { Schema, model } = require("mongoose");

const instructorSchema = new Schema({
    codigo_sede: String,
    sede: String,
    codigo_regional: String,
    regional: String,
    tipo_documento: {
        type: String,
        required: true,
    },
    numero_documento: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    primer_apellido: String,
    segundo_apellido: String,
});

module.exports = model("Instructor", instructorSchema);
