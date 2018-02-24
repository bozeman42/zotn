const router = require('express').Router();

router.get('/',(req,res) => {
  res.send(['Player1','Player2']);
});

module.exports = router;