const router = require('express').Router();
const pool = require('../modules/pool');
const FactionCounts = require('../modules/faction-counts');
const fc = new FactionCounts;

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
      });
    }
  });
});

router.get('/:id',(req,res) => {
  const { id } = req.params;
  console.log('id',id)
  pool.connect((connectError,client,done) => {
    if (connectError) {
      console.error(connectError);
      res.status(500).send({
        message: 'Database connection error',
        error: connectError
      });
    } else {
      const queryText = "SELECT * FROM players WHERE id = $1;";
      client.query(queryText,[id],(queryError,result) => {
        done();
        if (queryError) {
          console.error(queryError);
          res.status(500).send({
            message: 'Database query error',
            error: queryError
          });
        } else {
          res.send(result.rows[0]);
        }
      });
    }
  });
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
      fc.newPlayerFaction()
      .catch((error) => {
        res.status(500).send(error);
      })
      .then((faction) => {
        const queryText = `INSERT INTO "players" ("id","faction","credits")
                          VALUES ($1,$2,3)
                          ON CONFLICT ("id")
                          DO NOTHING RETURNING *;`;
        client.query(queryText,[id,faction], (queryError, result) => {
          done();
          if (queryError) {
            console.error('Error Querying the database',queryError);
            res.status(500).send({
              message: "Error querying database",
              error: queryError
            });
          } else {
            if (result.rowCount) {
              res.status(201).send(result.rows[0]);
            } else {
              res.status(200).send("Player record already exists for this ID");
            }
          }
        });

      })
    }
  })
})

router.put('/name',(req,res) => {
  const { name, id } = req.body;
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message: "Error connecting to database.",
        error: connectError
      });
    } else {
      const queryText = 
        `UPDATE "players" SET "nickname" = $1 WHERE "id" = $2;`;
      client.query(queryText,[name,id],(queryError,result) => {
        if (queryError) {
          res.status(500).send({
            message: "Error querying database",
            error: queryError
          });
        } else {
          res.sendStatus(200);
        }
      })
    }
  })
})

module.exports = router;