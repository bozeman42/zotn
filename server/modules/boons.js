const pool = require('./pool');

const get = (req,res) => {
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
      });
    }
  });
}

const post = (req,res) => {
  const { EntityId, BoonId } = req.body;
  let queryData = [EntityId, BoonId];
  console.log("entity id",EntityId,"boon id",BoonId);
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
      });
    }
  });
}

const attach = (req,res) => {
  const { EntityId, PlayerId } = req.body;
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
}

const detach = (req,res) => {
  const {EntityId} = req.body;
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
      });
    }
  });
}

module.exports = {
  get: get,
  attach: attach,
  detach: detach,
  post: post
}