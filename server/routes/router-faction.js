const router = require('express').Router();
const pool = require('../modules/pool');
const Query = require('../modules/Query');

/* Kill reporting format
{ 
  killerId: 2,
  killed: { 
    EntityType: 'FactionLanyard',
    EntityId: 1,
    Level: 1,
    Faction: 2
  }
}
*/

router.put('/killed',(req,res) => {
  const { killerId, killed } = req.body;
  const lanyardId = killed.EntityId;
  let queryText = `SELECT * FROM "faction_lanyards" WHERE "id" = $1;`
  let queryParams = [lanyardId];
  const query = new Query(req,res);
  query.withParams(queryText,queryParams,(req,res,resultLanyard) => {
    if (resultLanyard.rows[0].player_id === null) {
      res.status(200).send("Invalid kill. No player associated with that faction lanyard.");
    } else {
      const level = resultLanyard.rows[0].level;
      queryText = `
        UPDATE "players" 
        SET 
          "xp" = "xp" + 1,
          "credits" = "credits" + 3,
          "score" = "score" + (50 * $1)
          WHERE "id" = $2;`;
      queryParams = [level,killerId];
      query.withParams(queryText,queryParams,(req,res,result) => {
        queryText = `UPDATE "faction_lanyards" SET "player_id" = NULL WHERE "id" = $1;`;
        queryParams = [lanyardId];
        query.withParams(queryText,queryParams,(req,res,result) => {
          res.status(200).send({
            message: "Kill credited."
            
          });
        });
      });
    }
  });
});

// get all faction lanyards
router.get('/badges',(req,res) => {
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message: "Database connect error",
        error: connectError
      });
    } else {
      let queryString = 'SELECT * FROM "faction_lanyards"';
      client.query(queryString,(queryError,result) => {
        done();
        if (queryError) {
          console.log(queryError);
          res.status(500).send({
            message: "Database query error",
            error: queryError
          });
        } else {
          res.send(result.rows);
        }
      })
    }
  })
})


// get all faction lanyards that are not assigned to players
router.get('/badges/unassigned',(req,res) => {
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message: "Database connect error",
        error: connectError
      });
    } else {
      let queryString = 'SELECT * FROM "faction_lanyards" WHERE "player_id" IS NULL;';
      client.query(queryString,(queryError,result) => {
        done();
        if (queryError) {
          res.status(500).send({
            message: "Database query error",
            error: queryError
          });
        } else {
          res.send(result.rows);
        }
      })
    }
  })
})

// get all faction lanyards that are assigned to players
router.get('/badges/assigned',(req,res) => {
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message: "Database connect error",
        error: connectError
      });
    } else {
      let queryString = 'SELECT * FROM "faction_lanyards" WHERE "player_id" IS NOT NULL;';
      client.query(queryString,(queryError,result) => {
        done();
        if (queryError) {
          res.status(500).send({
            message: "Database query error",
            error: queryError
          });
        } else {
          res.send(result.rows);
        }
      })
    }
  })
});


// register new faction lanyard
router.post('/badges',(req,res) => {
  const {EntityId, Faction, Level} = req.body;
  console.log(EntityId,Faction,Level);
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message: "Database connect error",
        error: connectError
      });
    } else {
      let queryData = [EntityId, Faction, Level];
      let queryString = `INSERT INTO "faction_lanyards" ("id","faction_id","level")
      VALUES ($1,$2,$3);`;
      client.query(queryString,queryData,(queryError,result) =>{
        done();
        if (queryError) {
          res.status(500).send({
            message: "Database query error",
            error: queryError
          });
        } else {
          res.sendStatus(201);
        }
      })
    }
  })
});

router.put('/badges/attach',(req,res) => {
  const { lanyardId, playerId } = req.body;
  pool.connect((connectError,client,done) => {
    if (connectError) {
      console.error('Database connection error',connectError);
      res.status(500).send({
        message: "Database connection error",
        error: connectError
      });
    } else {
      const queryData = [lanyardId,playerId];
      const queryString = 
        `UPDATE "faction_lanyards" SET "player_id" = $2
        WHERE "id" = $1 AND "player_id" IS NULL
        RETURNING *;`
        client.query(queryString,queryData,(queryError,result) => {
          if (queryError) {
            console.error('Database Query Error:\n',queryError);
            res.status(500).send({
              message: "Database Query Error",
              error: queryError
            });
          } else {
            if (result.rowCount){
              res.send(result.rows[0]);
            } else {
              res.sendStatus(200);
            }
          }
        })
    }
  })
})

module.exports = router;