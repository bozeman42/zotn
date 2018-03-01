import { HUNTER, ZOMBIE } from '../constants/factions';
import zombieIcon from '../../assets/images/zombie-icon.png';
import hunterIcon from '../../assets/images/hunter-icon.png';

export default class PlayerSelectController {
  constructor($http) {
    this.data = {
      players: {},
      currentPlayer: {}
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
        vm.assignIcons(player);
        vm.data.players[player.id] = player;
      })
      console.log(vm.data.players);
      return vm.data.players;
    })
    .catch((error) => console.log('an error occured',error));
  }

  assignIcons(player) {
    if (player.faction === HUNTER) {
      player.icon = hunterIcon;
    } else if (player.faction === ZOMBIE) {
      player.icon = zombieIcon;
    }
  }
}