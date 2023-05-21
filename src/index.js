const dotenv = require('dotenv').config({ path: __dirname + '/../config.env' })
const app = require('./app')
const mongoose = require('mongoose')

const start = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, () => {
      console.log('connected')
    })
  } catch (err) {
    console.log(err)
  }
  app.listen(3000, () => {
    console.log('listening on port 3000')
  })
}

start()
