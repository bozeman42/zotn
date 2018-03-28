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
      (SELECT "zombie_level" FROM "players" WHERE "id" = $1) as "playerLevel",
      (SELECT "player_id" FROM "bullets" WHERE "bullet_id" = $2) AS "bulletOwner";`
    ,
    [playerId, bulletId],
    (req, res, result) => {
      console.log(result.rows[0]);
      const { playerFaction, playerLevel, bulletOwner } = result.rows[0]
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
                res.status(200).send('Credited.');
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

});


module.exports = router;