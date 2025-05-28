const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/MyLog"
mongoose.connect(url).then(() => {
    console.log("✅ MongoBD Conectado...")
}).catch((err) => {
    console.log("❌Erro ao Conectar: " + err);
});