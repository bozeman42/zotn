import { HUNTER, ZOMBIE } from '../constants/factions';

export default class KillController {
  constructor($location, PlayerService){
    this.$location = $location;
    this.data = {};
    this.data.message = '';
    this.data.player = PlayerService.data.currentPlayer;
    this.selectMessage();
  }

  selectMessage() {
    const hunterMsg = "Please report any zombie kills.";
    const zombieMsg = "Turn in any hunter kills.";
    const player = this.data.player;
    console.log('player',player);
    if (player.faction === HUNTER) {
      this.data.message = hunterMsg;
    } else if (player.faction === ZOMBIE) {
      this.data.message = zombieMsg;
    }
  }

  finalizeKills() {
    this.$location.path('/death');
  }

}