const entityIdField = {
  field: 'EntityId',
  type: 'number'
};

const assetStructures = {
  Badge: [entityIdField],
  Bite: [entityIdField],
  Bullet: [entityIdField],
  Boon: [
    entityIdField,
    {
      field: 'BoonId',
      type: 'number'
    }
  ]
}

function validateAsset(asset) {
  return function (validAssetList) {
    return new Promise((resolve,reject) => {
      if (!(typeof asset.EntityType === 'string')) {
        reject('Invalid asset. No EntityType.');
      } else if (!isListedAsset(asset, validAssetList)) {
        reject ("Not a valid asset for this transaction.");
      } else if (!isAssetWellFormed(asset)) {
        reject("Malformed asset. Not all required information is present.");
      }
      resolve(asset);
    });
  }
}

function isListedAsset(asset, validAssetList) {
  return validAssetList.some(assetName => {
    return assetName === asset.EntityType;
  })
}

function isAssetWellFormed(asset) {
  const entityType = asset.EntityType;
  return assetStructures[entityType].every(field => {
    return (typeof asset[field.field] === field.type)
  })
}

function factionPurchaseList(faction) {
  let assetList = [];
  if (faction === 1) {
    assetList = ['Bullet', 'Armor', 'Headshot'];
  } else if (faction === 2) {
    assetList = ['Bite'];
  }
  return Promise.resolve(assetList);
}

module.exports = {
  validateAsset,
  factionPurchaseList
};

// { "EntityType": "Bullet", "EntityId": 1 };
// { "EntityType": "Bite", "EntityId": 1 };
// { "EntityType": "Boon", "EntityId": 1, "BoonId": 1 }
// { "EntityType": "Boon", "EntityId": 11, "BoonId": 2 }