const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/',(req,res) => {
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.sendStatus(500);
    } else {
      const queryText = 'SELECT * FROM players';
      client.query(queryText,(queryError,result) => {
        if (queryError) {
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      })
    }
  })
});

module.exports = router;