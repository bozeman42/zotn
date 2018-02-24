const express = require('express');
const path = require('path');

// routes
const playerRouter = require('./routes/router-player');

const app = express();

const PORT = 5000;

app.use('/players',playerRouter);
app.use(express.static(`${__dirname}/../build/`));

app.listen(PORT,() => console.log(`Listening on port ${PORT}...`))