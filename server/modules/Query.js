const pool = require('./pool');

class Query {
  constructor(req,res){
    this.req = req;
    this.res = res;
  }

  withParams(queryText,queryParams,resultCallback) {
    pool.connect((connectError,client,done) => {
      if (connectError) {
        console.error("Database Connection error",connectError);
        this.res.status(500).send({
          message: 'Database connection error',
          error: connectError
        });
      } else {
        client.query(queryText,queryParams,(queryError,result) => {
          done();
          if (queryError) {
            this.res.status(500).send({
              message: 'Database query error',
              error: queryError
            });
          } else {
            resultCallback(this.req,this.res,result);
          }
        })
      }
    })
  }

  noParams(queryText,resultCallback) {
    pool.connect((connectError,client,done) => {
      if (connectError) {
        console.error("Database Connection error",connectError);
        this.res.status(500).send({
          message: 'Database connection error',
          error: connectError
        });
      } else {
        client.query(queryText,queryParams,(queryError,result) => {
          done();
          if (queryError) {
            this.res.status(500).send({
              message: 'Database query error',
              error: queryError
            });
          } else {
            resultCallback(this.req,this.res,result);
          }
        })
      }
    })
  }

  atomicQueries(queryTextArray,queryDataArray,resultCallback){
    pool.connect((connectError,client,done) => {
      if (connectError) {
        console.error("Database Connection Error", connectError);
        this.res.status(500).send({
          message: "Database connection error",
          error: connectError
        });
      } else {
        client.query("BEGIN TRANSACTION;");
        queryTextArray.forEach((queryText,index) => {
          client.query(queryText,queryDataArray[index]);
        });
      }
      client.query("COMMIT;",(queryError,result) => {
        if (queryError) {
          this.res.status(500).send({
            message: "Database query error",
            error: queryError
          });
        } else {
          resultCallback(req,res,result);
        }
      })
    })
  }

}

module.exports = Query;