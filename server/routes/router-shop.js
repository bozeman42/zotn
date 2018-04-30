const router = require('express').Router();
const pool = require('../modules/pool');
const { validateAsset, factionPurchaseList } = require('../modules/validation');
const getPrice = require('../modules/item-costs').getPrice;

router.put('/purchase', (req, res) => {
  const { id, asset } = req.body;
  purchaseAsset(id, asset)
    .then((result) => {
      res.send({
        message: 'Purchase Successful',
        purchased: true
      });
    })
    .catch(error => {
      console.log('Purchase failed.', error);
      if (error.isFatal) {
        console.log('res.send server error');
        res.status(500).send(error.error);
      } else if (!error.isFatal) {
        console.log('res.send failed purchase');
        res.send({
          error: error.error,
          purchased: false
        });
      } else {
        console.error('Invalid error format.');
      }
    })
})

function purchaseAsset(playerId, asset) {
    return getPlayerFaction(playerId)
    .then(faction => factionPurchaseList(faction))
    .then(assetList => validateAsset(asset)(assetList))
    .then(() => assetAvailable(asset))
    .then(() => sufficientCredits(playerId, asset))
    .then(() => executePurchase(playerId, asset))
}

function executePurchase(playerId, asset) {
  console.log('Executing purchase');
  const price = getPrice(asset);
  const attachQuery = {
    Bullet: 'UPDATE "bullets" SET "player_id" = $1 WHERE "bullet_id" = $2;',
    Bite: 'UPDATE "bites" SET "player_id" = $1 WHERE "bite_id" = $2;',
    Boon: 'UPDATE "boon_cards" SET "player_id" = $1 WHERE "card_id" = $2;',
  }
  const payQuery = 'UPDATE "players" SET "credits" = "credits" - $1 WHERE "id" = $2';
  return new Promise((resolve, reject) => {
    pool.connect((connectError, client, done) => {
      if (connectError) {
        reject({
          error: connectError,
          isFatal: true
        });
      } else {
        client.query('BEGIN TRANSACTION;')
        client.query(attachQuery[asset.EntityType], [playerId, asset.EntityId])
        client.query(payQuery, [price, playerId], (error, result) => console.log(result));
        client.query('END TRANSACTION', (queryError, result) => {
          done();
          if (queryError) {
            reject({
              error: queryError,
              isFatal: true
            });
          } else {
            resolve();
          }
        });
      }
    })
  })
}

function sufficientCredits(playerId, asset) {
  console.log('checking for sufficient credits');
  return new Promise((resolve, reject) => {
    const cost = getPrice(asset);
    getPlayerCredits(playerId)
      .then(credits => {
        if (credits >= cost) {
          resolve();
        } else {
          reject({
            error: 'Insufficient credits.',
            isFatal: false
          });
        }
      })
  })

}

function getPlayerCredits(id) {
  console.log('getting player credits');
  return new Promise((resolve, reject) => {
    pool.connect((connectError, client, done) => {
      if (connectError) {
        reject({
          error: connectError,
          isFatal: true
        });
      } else {
        let queryText = 'SELECT "credits" FROM "players" WHERE "id" = $1;';
        let queryParam = [id];
        client.query(queryText, queryParam, (queryError, result) => {
          done();
          if (queryError) {
            reject({
              error: queryError,
              isFatal: true
            });
          } else {
            let credits = result.rows[0].credits;
            console.log(`Player has ${credits} credits.`)
            resolve(credits);
          }
        });
      }
    })
  })
}

function assetAvailable(asset) {
  console.log('checking if the asset is available');
  return new Promise((resolve, reject) => {
    pool.connect((connectError, client, done) => {
      if (connectError) {
        reject({
          error: connectError,
          isFatal: true
        });
      } else {
        let queryText = '';
        let id = asset.EntityId;
        switch (asset.EntityType) {
          case "Boon":
            queryText = 'SELECT "player_id" FROM "boon_cards" WHERE "card_id" = $1;';
            break;
          case "Bullet":
            queryText = 'SELECT "player_id" FROM "bullets" WHERE "bullet_id" = $1;';
            break;
          case "Bite":
            queryText = 'SELECT "player_id" FROM "bites" WHERE "bite_id" = $1;';
            break;
          default:
            console.log(asset.EntityType);
            return reject({
              error: 'Bad query in \'assetAvailable\'',
              isFatal: true
            });
        }
        let queryParam = [id];
        client.query(queryText, queryParam, (queryError, result) => {
          done();
          if (queryError) {
            console.log(`Rejecting. ${queryError}`);
            reject({
              error: queryError,
              isFatal: true
            });
          } else {
            if (result.rows[0].player_id !== null) {
              console.log(`Rejecting. Asset already owned`);
              reject({
                error: 'Asset already owned',
                isFatal: false
              });
            } else {
              console.log('Resolving available');
              resolve('Asset available');
            }
          }
        });
      }
    })
  })
}

function getPlayerFaction(id) {
  console.log('getting faction');
  return new Promise((resolve, reject) => {
    pool.connect((connectError, client, done) => {
      if (connectError) {
        reject({
          error: connectError,
          isFatal: true
        });
      } else {
        let queryText = 'SELECT "faction" FROM "players" WHERE "id" = $1;';
        let queryParam = [id];
        client.query(queryText, queryParam, (queryError, result) => {
          done();
          if (queryError) {
            reject({
              error: queryError,
              isFatal: true
            });
          } else {
            resolve(result.rows[0].faction);
          }
        });
      }
    })
  })
}

module.exports = router;