const router = require('express').Router();
const pool = require('../modules/pool');

router.put('/killed',(req,res) => {
  console.log('put killed hit.');
  res.send('woop!');
})

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
})

module.exports = router;