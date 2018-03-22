const { Pool, Client } = require('pg');
const HUNTER = 1;
const ZOMBIE = 2;
const HUNTER_ZOMBIE_RATIO = 4;

class FactionCounts {
  constructor() {
    this.pool = new Pool();
    this.playerCounts = {
      hunters: 0,
      zombies: 0,
      total: 0
    }
    this.getCounts();
  }

  getCounts() {
    return this.pool.query(`SELECT
    (SELECT COUNT(*) FROM "players" WHERE "faction" = 1) as "hunters",
    (SELECT COUNT(*) FROM "players" WHERE "faction" = 2) as "zombies",
    (SELECT COUNT(*) FROM "players") as "total";`)
    .then((result) => {
      const count = result.rows[0];
      count.hunters = parseInt(count.hunters);
      count.zombies = parseInt(count.zombies);
      count.total = parseInt(count.total);
      this.playerCounts = count;
      return count;
    })
    .catch((error) => {
      console.error(error);
    })
  }

  newPlayerFaction() {
    return this.getCounts()
    .then((counts) => {
      let { hunters, zombies } = counts;
      if (zombies === 0 || (hunters / zombies) > HUNTER_ZOMBIE_RATIO) {
        console.log('returning Zombie', counts);
        return ZOMBIE;
      } else {
        console.log('returning Hunter', counts);
        return HUNTER;
      }
    })
  }
}

module.exports = FactionCounts;