require('dotenv').config();
const express = require('express');
const path = require('path');

// routes
const playerRouter = require('./routes/router-player');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(`${__dirname}/../build/`));
app.use('/players',playerRouter);

app.listen(PORT,() => console.log(`Listening on port ${PORT}...`))