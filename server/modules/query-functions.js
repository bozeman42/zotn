const pool = require('./pool');

function queryWithParams(req,res,queryText,queryParams,resultCallback) {
  pool.connect((connectError,client,done) => {
    if (connectError) {
      console.error("Database Connection error",connectError);
      res.status(500).send({
        message: 'Database connection error',
        error: connectError
      });
    } else {
      client.query(queryText,queryParams,(queryError,result) => {
        done();
        if (queryError) {
          res.status(500).send({
            message: 'Database query error',
            error: queryError
          });
        } else {
          resultCallback(req,res,result);
        }
      })
    }
  })
}

function queryNoParams(req,res,queryText,resultCallback) {
  pool.connect((connectError,client,done) => {
    if (connectError) {
      console.error("Database Connection error",connectError);
      res.status(500).send({
        message: 'Database connection error',
        error: connectError
      });
    } else {
      client.query(queryText,queryParams,(queryError,result) => {
        done();
        if (queryError) {
          res.status(500).send({
            message: 'Database query error',
            error: queryError
          });
        } else {
          resultCallback(req,res,result);
        }
      })
    }
  })
}