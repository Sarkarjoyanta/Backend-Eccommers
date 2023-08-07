require("dotenv").config()
const express = require('express')
const app = express()
const dbconnection = require('./config/dbConnection.js')
const router = require("./routes/index.js")

dbconnection()
app.use(express.json())
app.use(router)

app.listen(8000)