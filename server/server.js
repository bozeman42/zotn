const express = require('express');
require('path');
const app = express();

const PORT = 5000;

app.use(express.static(`${__dirname}/../build/`));

app.listen(PORT,() => console.log(`Listening on port ${PORT}...`))