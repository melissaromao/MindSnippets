require('./db');
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Logs = new Schema({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    }
});

mongoose.model("logs", Logs);