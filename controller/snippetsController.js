const express = require('express')
const router = express.Router();
const mongoose = require("mongoose");

require("../model/snippets");
const Snippets = mongoose.model("snippets");

router.get('/snippets', (req, res) => {
    const colors = [
        "bg-blue-950",
        "bg-fuchsia-950",
        "bg-purple-950", 
        "bg-pink-950", 
        "bg-indigo-950",
        "bg-rose-950",
        "bg-violet-950",
        "bg-sky-950",
        "bg-cyan-950",
        "bg-teal-950",
        "bg-emerald-950",
        "bg-lime-950",
        "bg-amber-950",
    ]; 

    Snippets.find().lean().then((snippets) => {
        snippets = snippets.map(snippet => ({
            ...snippet,
            bgColor: colors[Math.floor(Math.random() * colors.length)]
        }));

        res.render("admin/snippets/snippets", { snippets });
    });
});

module.exports = router;

router.get('/snippets/add', (req, res) => {
    res.render("admin/snippets/addsnippets");
});

router.post('/snippets/novo', (req, res) => {
    var snippets = new Snippets();
    snippets.insight = req.body.insight;
    snippets.save().then(() => {
        res.redirect("/rota_snippets/snippets");
    }).catch((erro) => {
        res.send("Houve um erro: " + erro);
    });
});

router.get('/editar_snippets/:id', (req, res) => {
    Snippets.findOne({
        _id: req.params.id
    }).lean().then((snippets) => {
        res.render("admin/snippets/editsnippets", { snippet: snippets });
    });
});

router.post('/snippets/editar_snippets', (req, res) => {
    Snippets.updateOne({
        _id: req.body._id
    },
        {
            $set: {
                insight: req.body.insight,
            }
        }).then(() => {
            res.redirect("/rota_snippets/snippets");
        });
});

router.get("/deletar_snippets/:id", (req, res) => {
    Snippets.deleteMany({
        _id: req.params.id
    }).then(() => {
        res.redirect("/rota_snippets/snippets");
    });
});