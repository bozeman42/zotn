

require('dotenv').config();
const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
// routes
const assetRouter = require('./routes/router-asset');
const combatRouter = require('./routes/router-combat');
const factionRouter = require('./routes/router-faction');
const playerRouter = require('./routes/router-player');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(`${__dirname}/../build/`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/assets',assetRouter);
app.use('/combat',combatRouter);
app.use('/faction',factionRouter);
app.use('/players',playerRouter);

app.listen(PORT,() => console.log(`Listening on port ${PORT}...`))