const router = require('express').Router();
const pool = require('../modules/pool');
const boons = require('../modules/boons');
// {"EntityType":"Bullet","EntityId":1}
// {"EntityType":"Boon","EntityId":9,"BoonId": 2}
// {"EntityType":"Bite","EntityId":8}

router.get('/boons',(req,res) => {
  boons.get(req,res);
});

router.put('/boons/attach',(req,res) => {
  boons.attach(req,res);
});

router.put('/boons/detach',(req,res) => {
  boons.detach(req,res);
});

router.post('/boons', (req, res) => {
  boons.post(req,res);
});


// /bullet
// get - return all bullets from database
// post - enter new bullet in database
//

router.get('/bullets',(req,res) => {
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message:"Error connecting to database",
        error: connectError
      });
    } else {
      const queryText = 'SELECT * FROM "bullets"';
      client.query(queryText,(queryError,result) => {
        done();
        if (queryError) {
          res.status(500).send({
            message:"Error querying database",
            error: queryError
          });
        } else {
          res.send(result.rows);
        }
      })
    }
  })
});

router.put('/bullets/attach',(req,res) => {
  const { EntityId, PlayerId } = req.body;
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message:"Error connecting to database",
        error: connectError
      });
    } else {
      const queryText = `UPDATE "bullets"
                          SET "player_id" = $2
                          WHERE "bullet_id" = $1;`;
      client.query(queryText,[EntityId,PlayerId],(queryError,result) => {
        done();
        if (queryError) {
          res.status(500).send({
            message:"Error querying database",
            error: queryError
          });
        } else {
          res.sendStatus(204);
        }
      })
    }
  })
});

router.put('/bullets/detach',(req,res) => {
  const {EntityId} = req.body;
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message:"Error connecting to database",
        error: connectError
      });
    } else {
      const queryText = `UPDATE "bullets"
                          SET "player_id" = NULL
                          WHERE "bullet_id" = $1;`;
      client.query(queryText,[EntityId],(queryError,result) => {
        done();
        if (queryError) {
          res.status(500).send({
            message:"Error querying database",
            error: queryError
          });
        } else {
          res.sendStatus(204);
        }
      })
    }
  })
})

router.post('/bullets', (req, res) => {
  const { EntityId } = req.body;
  let queryData = [EntityId];
  let queryString = `INSERT INTO "bullets" ("bullet_id")
    VALUES ($1);`;
  pool.connect((connectError, client, done) => {
    if (connectError) {
      res.status(500).send({
        message: "Database connect error",
        error: connectError
      });
    } else {
      client.query(queryString, queryData, (queryError, result) => {
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

// /bites
//
// GET: return all bites from database
// POST: register new bite asset in database

router.get('/bites',(req,res) => {
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message:"Error connecting to database",
        error: connectError
      });
    } else {
      const queryText = 'SELECT * FROM "bites"';
      client.query(queryText,(queryError,result) => {
        done();
        if (queryError) {
          res.status(500).send({
            message:"Error querying database",
            error: queryError
          });
        } else {
          res.send(result.rows);
        }
      })
    }
  })
});

router.put('/bites/attach',(req,res) => {
  const { EntityId, PlayerId } = req.body;
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message:"Error connecting to database",
        error: connectError
      });
    } else {
      const queryText = `UPDATE "bites"
                          SET "player_id" = $2
                          WHERE "bite_id" = $1;`;
      client.query(queryText,[EntityId,PlayerId],(queryError,result) => {
        done();
        if (queryError) {
          res.status(500).send({
            message:"Error querying database",
            error: queryError
          });
        } else {
          res.sendStatus(204);
        }
      })
    }
  })
});

router.put('/bites/detach',(req,res) => {
  const {EntityId} = req.body;
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message:"Error connecting to database",
        error: connectError
      });
    } else {
      const queryText = `UPDATE "bites"
                          SET "player_id" = NULL
                          WHERE "bite_id" = $1;`;
      client.query(queryText,[EntityId],(queryError,result) => {
        done();
        if (queryError) {
          res.status(500).send({
            message:"Error querying database",
            error: queryError
          });
        } else {
          res.sendStatus(204);
        }
      })
    }
  })
})

router.post('/bites', (req, res) => {
  const { EntityId } = req.body;
  let queryData = [EntityId];
  let queryString = `INSERT INTO "bites" ("bite_id")
    VALUES ($1);`;
  pool.connect((connectError, client, done) => {
    if (connectError) {
      res.status(500).send({
        message: "Database connect error",
        error: connectError
      });
    } else {
      client.query(queryString, queryData, (queryError, result) => {
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

router.post('/register',(req,res) => {
  console.log(req.body);
  res.sendStatus(200);
})

module.exports = router;