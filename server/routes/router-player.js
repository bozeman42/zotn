const router = require('express').Router();
const pool = require('../modules/pool');
const FactionCounts = require('../modules/faction-counts');
const Query = require('../modules/Query');
const fc = new FactionCounts;
const HUNTER = 1;
const ZOMBIE = 2;

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

const levelUpXp = {
  // huter is faction 1
  1: {
    1: 3,
    2: 5,
    3: 7,
    4: 9
  },
  // zombie is faction 2
  2: {
    1: 5,
    2: 7,
    3: 9,
    4: 11
  }
}

router.put('/levelup/:id',(req,res) => {
  const id = parseInt(req.params.id);
  const query = new Query(req,res);
  query.withParams(
    `SELECT "faction","hunter_level","zombie_level","xp" FROM "players" WHERE "id" = $1;`,
    [id],
    (req,res,result) => {
      let {
        faction,
        zombie_level,
        hunter_level,
        xp
      } = result.rows[0];
      let level;
      let factionName;
      if (faction === HUNTER){
        level = hunter_level;
        factionName = "hunter";
      } else if (faction === ZOMBIE) {
        level = zombie_level;
        factionName = "zombie"
      }
      let leveledUp = false;
      while (level < 5 && xp >= levelUpXp[faction][level]) {
        leveledUp = true;
        xp -= levelUpXp[faction][level];
        level += 1;
      }
      if (leveledUp) {
        query.withParams(
          `UPDATE "players" SET "${factionName}_level" = $1,"xp" = $2 WHERE "id" = $3;`,
          [level,xp,id],
          (req,res,result) => {
            res.status(200).send({
              leveledUp: true
            });
          }
        );
      } else {
        res.status(200).send({
          leveledUp: false
        });
      }
    }
  );
});

module.exports = router;