const router = require('express').Router();
const pool = require('../modules/pool');

router.put('/killed',(req,res) => {
  console.log('put killed hit.');
  res.send('woop!');
})


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

router.put('/')

module.exports = router;