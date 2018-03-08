require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// routes
const playerRouter = require('./routes/router-player');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(`${__dirname}/../build/`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/players',playerRouter);

app.listen(PORT,() => console.log(`Listening on port ${PORT}...`))