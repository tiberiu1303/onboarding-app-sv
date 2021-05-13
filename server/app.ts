const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('./db/config')

const app = express()

//Middleware
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 3000

// Routes
const apiUserRoutes = require("./src/routes/api/user")
const apiTaskRoutes = require("./src/routes/api/task")

app.use('/api', apiUserRoutes)
app.use('/api', apiTaskRoutes)
// Routes END

app.listen(port)

module.exports = app