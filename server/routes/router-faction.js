const router = require('express').Router();
const pool = require('../modules/pool');

router.put('/killed',(req,res) => {
  console.log('put killed hit.');
  res.send('woop!');
})

module.exports = router;