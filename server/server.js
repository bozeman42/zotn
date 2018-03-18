

require('dotenv').config();
const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
// routes
const playerRouter = require('./routes/router-player');
const factionRouter = require('./routes/router-faction');
const assetRouter = require('./routes/router-asset');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(`${__dirname}/../build/`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/players',playerRouter);
app.use('/faction',factionRouter);
app.use('/assets',assetRouter);

app.listen(PORT,() => console.log(`Listening on port ${PORT}...`))