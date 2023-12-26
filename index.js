const express = require("express")
const app = express()

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
    res.send("estas solicitando la ruta raiz")
})

app.listen(5000, () => console.log("server on"))