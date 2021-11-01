const mongoose = require("mongoose");

let PersonaSchema = new mongoose.Schema({
    tipoDocumento: String,
    documento: Number,
    nombres: String,
    apellidos: String,
    direccion: String
});

module.exports = mongoose.model("persona", PersonaSchema, "Personas");