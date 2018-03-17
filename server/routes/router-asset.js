const router = require('express').Router();
const pool = require('../modules/pool');
// {"EntityType":"Bullet","EntityId":1}
// {"EntityType":"Boon","EntityId":9,"BoonId": 2}
// {"EntityType":"Bite","EntityId":8}

router.get('/boons',(req,res) => {
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message:"Error connecting to database",
        error: connectError
      });
    } else {
      const queryText = `SELECT * FROM "boon_cards"
                          JOIN "boons" ON "boon_cards"."boon_id" = "boons"."boon_id"
                          ORDER BY "card_id";`;
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

// remove player from boon
// query params: card_id


router.put('/boons/attach',(req,res) => {
  const { EntityId, PlayerId } = req.query;
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message:"Error connecting to database",
        error: connectError
      });
    } else {
      const queryText = `UPDATE "boon_cards"
                          SET "player_id" = $2
                          WHERE "card_id" = $1;`;
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

router.put('/boons/detach',(req,res) => {
  const {EntityId} = req.query;
  pool.connect((connectError,client,done) => {
    if (connectError) {
      res.status(500).send({
        message:"Error connecting to database",
        error: connectError
      });
    } else {
      const queryText = `UPDATE "boon_cards"
                          SET "player_id" = NULL
                          WHERE "card_id" = $1;`;
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

router.post('/boons', (req, res) => {
  const { EntityId, BoonId } = req.query;
  let queryData = [EntityId, BoonId];
  let queryString = `INSERT INTO "boon_cards" ("card_id","boon_id")
    VALUES ($1,$2);`;
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
  const { EntityId, PlayerId } = req.query;
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
  const {EntityId} = req.query;
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
  const { EntityId } = req.query;
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
  const { EntityId, PlayerId } = req.query;
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
  const {EntityId} = req.query;
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
  const { EntityId } = req.query;
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

module.exports = router;