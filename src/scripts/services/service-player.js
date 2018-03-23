import Player from '../classes/Player';
import { ZOMBIE, HUNTER, HUNTER_ZOMBIE_RATIO } from '../constants/factions';
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
  
  // getCounts() {
  //   const vm = this;
  //   return vm.$http.get('/players/counts')
  //   .then((result) => {
  //     const { hunter_count, zombie_count, player_count } = result.data[0];
  //     vm.data.counts.hunterCount = parseInt(hunter_count);
  //     vm.data.counts.zombieCount = parseInt(zombie_count);
  //     vm.data.counts.playerCount = parseInt(player_count);
  //   })
  //   .catch((error) => console.log('error getting count',error));
  // }

  getPlayers() {
    let vm = this;
    return vm.$http.get('/players')
    .then((response) => {
      const players = response.data;
      players.forEach((player) => {
        const { faction, id, nickname,zombie_level,hunter_level,credits,score,xp } = player;
        vm.data.players[id] = new Player(faction, id, nickname,zombie_level,hunter_level,credits,score,xp);
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
    return this.$http.get(`/${id}`)
    .then((response) => {
      console.log('get player response',response);
    })
  }

  creditKill(player){
    console.log('playerService creditKill player:',player);
  }
}