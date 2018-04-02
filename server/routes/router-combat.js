const router = require('express').Router();
const Query = require('../modules/Query');
const pool = require('../modules/pool');
const ZOMBIE = 2;
const HUNTER = 1;

router.put('/bullet', (req, res) => {
  const { playerId, bulletId } = req.body;
  const query = new Query(req, res);
  query.withParams(
    `SELECT
      (SELECT "faction" FROM "players" WHERE "id" = $1) AS "playerFaction",
      (SELECT "zombie_level" FROM "players" WHERE "id" = $1) AS "playerLevel",
      (SELECT "player_id" FROM "bullets" WHERE "bullet_id" = $2) AS "bulletOwner",
      (SELECT p."nickname" as "bulletOwnerName" FROM "bullets" AS b JOIN "players" AS p ON b.player_id = p.id WHERE b."bullet_id" = $2);`
    ,
    [playerId, bulletId],
    (req, res, result) => {
      console.log(result.rows[0]);
      const { playerFaction, playerLevel, bulletOwner, bulletOwnerName } = result.rows[0]
      if (playerFaction === ZOMBIE && bulletOwner !== null) {
        pool.connect((connectError, client, done) => {
          if (connectError) {
            res.status(500).send({
              message: "Connect error",
              error: connectError
            });
          } else {
            client.query("BEGIN TRANSACTION;");
            client.query(`UPDATE "players" SET "credits" = "credits" + 1 WHERE "id" = $1;`, [playerId]);
            client.query(`UPDATE "players" SET "score" = "score" + (50 * $1) WHERE "id" = $2;`, [playerLevel, bulletOwner]);
            client.query(`UPDATE "bullets" SET "player_id" = NULL WHERE "bullet_id" = $1;`, [bulletId])
            client.query(`COMMIT;`, (queryError, result) => {
              done();
              if (queryError) {
                res.status(500).send({
                  message: "Query error",
                  error: queryError
                });
              } else {
                res.status(200).send({
                  message: 'Credited',
                  shotBy: {
                    id: bulletOwner,
                    name: bulletOwnerName
                  }
                });
              }
            })
          }
        });
      } else {
        res.status(200).send("Wrong faction or no bullet owner.");
      }
    }
  );
});

router.put('/bite', (req, res) => {
  const { playerId, biteId } = req.body;
  const query = new Query(req, res);
  query.withParams(
    `SELECT
    (SELECT "faction" FROM "players" WHERE "id" = $1) AS "playerFaction",
    (SELECT "hunter_level" FROM "players" WHERE "id" = $1) AS "playerLevel",
    (SELECT "player_id" FROM "bites"  WHERE "bite_id" = $2) AS "biteOwner",
    (SELECT p."nickname" as "biteOwnerName" FROM "bites" AS b JOIN "players" AS p ON b.player_id = p.id WHERE b."bite_id" = $2);`
    ,
    [playerId, biteId],
    (req, res, result) => {
      console.log(result.rows[0]);
      const { playerFaction, playerLevel, biteOwner, biteOwnerName } = result.rows[0]
      if (playerFaction === HUNTER && biteOwner !== null) {
        pool.connect((connectError, client, done) => {
          if (connectError) {
            res.status(500).send({
              message: "Connect error",
              error: connectError
            });
          } else {
            client.query("BEGIN TRANSACTION;");
            client.query(`UPDATE "players" SET "credits" = "credits" + 1 WHERE "id" = $1;`, [playerId]);
            client.query(`UPDATE "players" SET "score" = "score" + (50 * $1) WHERE "id" = $2;`, [playerLevel, biteOwner]);
            client.query(`UPDATE "bites" SET "player_id" = NULL WHERE "bite_id" = $1;`, [biteId])
            client.query(`COMMIT;`, (queryError, result) => {
              done();
              if (queryError) {
                res.status(500).send({
                  message: "Query error",
                  error: queryError
                });
              } else {
                res.status(200).send({
                  message: 'Credited',
                  bitBy: {
                    id: biteOwner,
                    name: biteOwnerName
                  }
                });
              }
            })
          }
        });
      } else {
        res.status(200).send("Wrong faction or no bite owner.");
      }
    }
  );
});


module.exports = router;