const prices = {
  Bullet: 1,
  Bite: 1,
  Boon: {
    1: 3,
    2: 3
  }
}

function getPrice(asset) {
  let price = 0;
  if (asset.EntityType === 'Boon') {
    price = prices.Boon[asset.BoonId];
  } else {
    price = prices[asset.EntityType];
  }
  return price;
}

module.exports = {
  getPrice,
  prices
};