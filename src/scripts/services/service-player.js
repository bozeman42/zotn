import Player from '../classes/Player';
export default class PlayerSelectController {
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
      console.log(vm.data.counts);
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
        console.log('player',player);
        vm.data.players[id] = new Player(nickname,faction,level,id);
      });
      console.log(vm.data.players);
      return vm.data.players;
    })
    .catch((error) => console.log('an error occured',error));
  }
}

