const express = require('express')
const cors = require('cors')

const productRoutes = require('./routes/protuctsRoutes')
const handleError = require('./middleware/handleError')

const app = express()
app.use(express.json())
app.use(cors())

app.use(productRoutes)
app.use(handleError)

module.exports = app
