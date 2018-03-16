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
        const { nickname, faction, level, id } = player;
        vm.data.players[id] = new Player(nickname,faction,level,id);
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
    const { nickname, faction, level, id } = player;
    const playerToSubmit = new Player(nickname, faction, hLevel,zLevel, id);
    return this.$http.post('/players/new',playerToSubmit)
    .catch((error) => {
      alert(error);
    });
  }

  creditKill(player){
    console.log('playerService creditKill player:',player);
  }
}