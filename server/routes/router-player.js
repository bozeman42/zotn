const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/',(req,res) => {
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.sendStatus(500);
    } else {
      const queryText = 'SELECT * FROM players';
      client.query(queryText,(queryError,result) => {
        done();
        if (queryError) {
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      })
    }
  })
});

router.get('/counts',(req,res) => {
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.sendStatus(500);
    } else {
      const queryText = `SELECT
      (SELECT COUNT(*) FROM "players" WHERE "faction" = 1) as "hunter_count",
      (SELECT COUNT(*) FROM "players" WHERE "faction" = 2) as "zombie_count",
      (SELECT COUNT(*) FROM "players") as "player_count";`;
      client.query(queryText,(queryError,result) => {
        done();
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