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
  const { id } = req.body;
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message: "Error connecting to database",
        error: connectError
      });
    } else {
      const queryText = `INSERT INTO "players" ("id")
                        VALUES ($1)
                        ON CONFLICT ("id")
                        DO NOTHING RETURNING "id";`;
      client.query(queryText,[id], (queryError, result) => {
        done();
        if (queryError) {
          res.status(500).send({
            message: "Error querying database",
            error: queryError
          });
        } else {
          console.log(result);
          if (result.rowCount) {
            res.status(201).send(result.rows[0]);
          } else {
            res.status(200).send("Player record already exists for this ID");
          }
        }
      });
    }
  })
})

router.put('/name',(req,res) => {
  const { name } = req.body;
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message: "Error connecting to database.",
        error: connectError
      });
    } else {
      const queryText = 
        `UPDATE "players"`
    }
  })
})

module.exports = router;