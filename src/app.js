const path = require('path');
const express = require('express');
const {errHandlers: {validationErrorHandler, sequelizeErrorHandler, errorHandlers}} = require('./middleware')
const router = require("./routers")
const app = express()



app.use(express.json())
app.use('/api', router)
app.use(validationErrorHandler,  sequelizeErrorHandler, errorHandlers)

module.exports = app;