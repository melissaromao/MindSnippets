const express = require("express");
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const rota_snippets = require('./controller/snippetsController');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/rota_snippets', rota_snippets);
const PORT = 8081;
app.listen(PORT, () => {
    console.log('Servidor Rodando em http://localhost:8081/rota_snippets/snippets/add');
});