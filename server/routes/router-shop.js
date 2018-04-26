const router = require('express').Router();
const pool = require('../modules/pool');
const { validateAsset, factionPurchaseList } = require('../modules/validation');


router.put('/purchase', (req, res) => {
  const { id, asset } = req.body;
  purchaseAsset(id, asset)
  res.send({ message: "purchase", asset });
})

function purchaseAsset(playerId, asset) {
  return getPlayerFaction(playerId)
    .then(factionPurchaseList)
    .then(validateAsset(asset))
    .then(assetAvailable)
    .then(executePurchase(playerId,asset))
    .catch(error => console.log('Purchase failed.',error));
}

function executePurchase(playerId,asset) {
  return new Promise((resolve, reject) => {
    pool.connect((connectError, client, done) => {
      if (connectError) {
        reject(connectError);
      } else {

        // TO DO: check available credits against cost of asset
        //        assign player to asset
        //        remove credits from player
        //        all in one transaction



        client.query('BEGIN TRANSACTION;')
        client.query(queryText, queryParam, (queryError, result) => {
          done();
          if (queryError) {
            reject(queryError);
          } else {
            resolve(result.rows[0].faction);
          }
        });
      }
    })
  })
}

function assetAvailable(asset) {
  return new Promise((resolve, reject) => {
    pool.connect((connectError, client, done) => {
      if (connectError) {
        reject(connectError);
      } else {
        let queryText = '';
        let id = asset.EntityId;
        switch(asset.EntityType) {
          case "Boon":
            console.log('boon');
            queryText = 'SELECT "player_id" FROM "boon_cards" WHERE "card_id" = $1;';
            break;
          case "Bullet":
          console.log('bullet',asset);
            queryText = 'SELECT "player_id" FROM "bullets" WHERE "bullet_id" = $1;';
            break;
          case "Bite":
          console.log('bite');
            queryText = 'SELECT "player_id" FROM "bites" WHERE "bite_id" = $1;';
            break;
          default:
            return reject('Bad query');
        }
        let queryParam = [id];
        client.query(queryText, queryParam, (queryError, result) => {
          done();
          if (queryError) {
            reject(queryError);
          } else {
            if (result.rows[0].player_id !== null) {
              reject('Asset already owned');
            } else {
              resolve('Asset available');
            }
          }
        });
      }
    })
  })
}

function getPlayerFaction(id) {
  return new Promise((resolve, reject) => {
    pool.connect((connectError, client, done) => {
      if (connectError) {
        reject(connectError);
      } else {
        let queryText = 'SELECT "faction" FROM "players" WHERE "id" = $1;';
        let queryParam = [id];
        client.query(queryText, queryParam, (queryError, result) => {
          done();
          if (queryError) {
            reject(queryError);
          } else {
            resolve(result.rows[0].faction);
          }
        });
      }
    })
  })
}

module.exports = router;