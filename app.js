require('dotenv').config()

const express = require("express");
const cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json());

app.get('/', (req, res) => {
    res.json('app running')
})

require('./routes/app.routes')(app)

module.exports = app;

