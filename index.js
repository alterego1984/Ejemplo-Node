const express = require("express");
const mongoose = require("mongoose");
const PersonaSchema = require("./models/Persona.js");

const app = express();
const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.get("/", (req, res) => {
    res.send("Hola Node JS");
});

//conexión BD
mongoose.connect("mongodb+srv://dbUser:12345@cluster0.06thz.mongodb.net/MiBDNodeJS?retryWrites=true&w=majority");

//CRUD Persona
router.get("/persona", (req, res) => {
    let doc = req.query.doc;
    if (doc == "") {
        PersonaSchema.find(function (err, datos) {
            if (err) {
                console.log("Error en la consulta de la Persona");
            } else {
                res.send(datos);
            }
        });

    } else {
        PersonaSchema.find({ documento: doc }, function (err, datos) {
            if (err) {
                console.log("Error en la consulta de la Persona");
            } else {
                res.send(datos);
            }
        });
    }
});

router.post("/persona", (req, res) => {
    let nuevaPersona = new PersonaSchema({
        tipoDocumento: req.body.tipodoc,
        documento: req.body.documento,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion
    });

    nuevaPersona.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.send("Persona almacenada correctamente");
        }
    });
});

router.delete("/persona", (req, res) => {
    let doc = req.body.doc;
    PersonaSchema.deleteOne({ documento: doc }, function (err) {
        if (err) {
            console.log("Error eliminando la persona");
        } else {
            res.send("Persona eliminada con éxito.")
        }
    });

});









app.use(router);
app.listen(8000, () => {
    console.log("Servidor nodejs, puerto 8000");
});