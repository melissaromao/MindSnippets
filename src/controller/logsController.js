const express = require('express')
const router = express.Router();
const mongoose = require("mongoose");

require("../models/logs");
const Logs = mongoose.model("logs");

router.get('/logs', (req, res) => {
    Logs.find().lean().then((logs) => {
        res.render("admin/logs/logs", { logs: logs });
    });
});

module.exports = router;

router.get('/logs/add', (req, res) => {
    res.render("admin/logs/addlogs");
});

router.post('/logs/novo', (req, res) => {
    var logs = new Logs();
    logs.titulo = req.body.titulo;
    logs.conteudo = req.body.conteudo;
    logs.save().then(() => {
        res.redirect("/rota_logs/logs");
    }).catch((erro) => {
        res.send("Houve um erro: " + erro);
    });
});

router.get('/editar_logs/:id', (req, res) => {
    Logs.findOne({
        _id: req.params.id
    }).lean().then((logs) => {
        res.render("admin/logs/editlogs", { log: logs });
    });
});

router.post('/logs/editar_logs', (req, res) => {
    Logs.updateOne({
        _id: req.body._id
    },
        {
            $set: {
                titulo: req.body.titulo,
                conteudo: req.body.conteudo
            }
        }).then(() => {
            res.redirect("/rota_logs/logs");
        });
});

router.get("/deletar_logs/:id", (req, res) => {
    Logs.deleteMany({
        _id: req.params.id
    }).then(() => {
        res.redirect("/rota_logs/logs");
    });
});