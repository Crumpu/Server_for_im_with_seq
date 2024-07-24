const express = require('express');
// const router = require("./routers")
const app = express()

// Не забыть прописать эррор хендлеры 

app.use(express.json())
// app.use(router)

module.exports = app;