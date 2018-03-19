const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/',(req,res) => {
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message: 'Database connection error',
        error: connectError
      });
    } else {
      const queryText = 'SELECT * FROM players';
      client.query(queryText,(queryError,result) => {
        done();
        if (queryError) {
          res.status(500).send({
            message: "Database Query Error",
            error: queryError
          });
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

router.post('/new',(req,res) => {
  const { id, nickname, faction } = req.body;
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message: "Error connecting to database",
        error: connectError
      });
    } else {
      const queryText = `INSERT INTO "players" ("id", "nickname", "faction")
      VALUES ($1,$2,$3);`;
      client.query(queryText,[id, nickname, faction], (queryError, result) => {
        done();
        if (queryError) {
          res.status(500).send({
            message: "Error querying database",
            error: queryError
          });
        } else {
          res.sendStatus(201);
        }
      });
    }
  })
})

module.exports = router;