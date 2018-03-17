const router = require('express').Router();

// {"EntityType":"Bullet","EntityId":1}
// {"EntityType":"Boon","EntityId":9,"BoonId": 2}
// {"EntityType":"Bite","EntityId":8}

router.post('/boon', (req, res) => {
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

router.post('/bullet', (req, res) => {
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

router.post('/bite', (req, res) => {
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