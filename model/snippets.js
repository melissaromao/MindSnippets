require('./db');
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Snippets = new Schema({
    insight: {
        type: String,
        required: true
    }
});

mongoose.model("snippets", Snippets);