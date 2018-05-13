import Player from '../classes/Player';
import { ZOMBIE, HUNTER, HUNTER_ZOMBIE_RATIO } from '../constants/factions.ts';
export default class PlayerService {
  constructor($http) {
    this.$inject = ['$http'];
    this.data = {
      // counts: {
      //   zombieCount: 0,
      //   hunterCount: 0,
      //   playerCount: 0,
      // },
      players: {},
      currentPlayer: {},
      newPlayer: new Player(null)
    };
    this.$http = $http;
    this.getPlayers();
  }

  getPlayers() {
    let vm = this;
    return vm.$http.get('/players')
    .then((response) => {
      const players = response.data;
      players.forEach((player) => {
        const { faction, id, nickname,zombie_level,hunter_level,credits,score,xp } = player;
        vm.data.players[id] = new Player(
          faction,
          id,
          nickname,
          zombie_level,
          hunter_level,
          credits,
          score,
          xp
        );
      });
      return vm.data.players;
    })
    .catch((error) => console.error('an error occured',error));
  }

  createNewPlayerWithId(id){
    const data = { id: id }
    return this.$http.post('/players/new',data)
    .catch((error) => console.error(error));
  }

  submitNickname(player) {
    const data = {
      name: player.nickname,
      id: player.id
    }
    return this.$http.put('/players/name',data)
    .catch((error) => {
      console.error(error);
    });
  }

  getPlayer(id) {
    const vm = this;
    return this.$http.get(`/players/${id}`)
    .then((response) => {
      const { faction, id, nickname,zombie_level,hunter_level,credits,score,xp } = response.data;
      console.log(response);
      vm.data.players[id] = new Player(faction, id, nickname,zombie_level,hunter_level,credits,score,xp);
      return vm.data.players[id];
    })
  }

  refreshCurrentPlayer(id) {
    const vm = this;
    return vm.getPlayer(id)
    .then(() => {
      vm.data.currentPlayer = vm.data.players[id];
    })
  }

  creditKill(player){
    console.log('playerService creditKill player:',player);
  }

  levelUp(id) {
    const vm = this;
    return vm.$http.put(`/players/levelup/${id}`);
  }

  processDeath(id) {
    const vm = this;
    console.log('processing death');
    return vm.$http.put(`/players/death/${id}`)
    .then(response => {
      console.log(response);
      return vm.getPlayer(id)
      .then(() => vm.data.currentPlayer = vm.data.players[id]);
    });
  }
}