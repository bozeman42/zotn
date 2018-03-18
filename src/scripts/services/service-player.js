import Player from '../classes/Player';
import { ZOMBIE, HUNTER, HUNTER_ZOMBIE_RATIO } from '../constants/factions';
export default class PlayerService {
  constructor($http) {
    this.$inject = ['$http'];
    this.data = {
      counts: {
        zombieCount: 0,
        hunterCount: 0,
        playerCount: 0,
      },
      players: {},
      currentPlayer: {},
    };
    this.$http = $http;
    this.getPlayers();
  }

  getCounts() {
    const vm = this;
    return vm.$http.get('/players/counts')
    .then((result) => {
      const { hunter_count, zombie_count, player_count } = result.data[0];
      vm.data.counts.hunterCount = parseInt(hunter_count);
      vm.data.counts.zombieCount = parseInt(zombie_count);
      vm.data.counts.playerCount = parseInt(player_count);
    })
    .catch((error) => console.log('error getting count',error));
  }

  getPlayers() {
    let vm = this;
    return vm.$http.get('/players')
    .then((response) => {
      const players = response.data;
      players.forEach((player) => {
        console.log(player);
        const { faction, id, nickname,zombie_level,hunter_level,credits,score,xp } = player;
        vm.data.players[id] = new Player(faction, id, nickname,zombie_level,hunter_level,credits,score,xp);
      });
      return vm.data.players;
    })
    .catch((error) => console.log('an error occured',error));
  }

  submitNewPlayer(player){
    const {hunterCount, zombieCount} = this.data.counts;
    if (hunterCount / zombieCount < HUNTER_ZOMBIE_RATIO) {
      player.faction = HUNTER;
    } else {
      player.faction = ZOMBIE;
    }
    const { nickname, faction, id } = player;
    const playerToSubmit = new Player(faction, id, nickname);
    return this.$http.post('/players/new',playerToSubmit)
    .catch((error) => {
      console.error(error);
    });
  }

  creditKill(player){
    console.log('playerService creditKill player:',player);
  }
}