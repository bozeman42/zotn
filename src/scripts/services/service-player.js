import { HUNTER, ZOMBIE } from '../constants/factions';
import zombieIcon from '../../assets/images/zombie-icon.png';
import hunterIcon from '../../assets/images/hunter-icon.png';

export default class PlayerSelectController {
  constructor($http) {
    this.data = {
      players: [],
      currentPlayer: {}
    };
    this.$http = $http;
    this.getPlayers();
  }

  getPlayers() {
    return this.$http.get('/players')
    .then((response) => {
      this.data.players = response.data;
      this.data.players.forEach(this.assignIcons);
      return this.data.players;
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