const express = require('express')
const cors = require('cors')

const createRoutes = require('./routes/createProduct')

const app = express()
app.use(express.json())
app.use(cors())

app.use(createRoutes)

module.exports = app
