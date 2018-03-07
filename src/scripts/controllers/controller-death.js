import { HUNTER, ZOMBIE } from '../constants/factions';

export default class DeathController {
  constructor($location,PlayerService){
    this.$inject = ['$location' ,'PlayerService'];
    this.data = {};
    this.$location = $location;
    this.data.player = PlayerService.data.currentPlayer;
    this.message = '';
    this.selectMessage()
  }

  noDeath() {
    this.toPurchase();
  }

  death() {
    this.toPurchase();
  }

  selectMessage() {
    const hunterMsg = "Did a zombie bite you?";
    const zombieMsg = "Were you killed by a hunter?";
    const player = this.data.player;
    console.log('player',player);
    if (player.faction === HUNTER) {
      this.message = hunterMsg;
    } else if (player.faction === ZOMBIE) {
      this.message = zombieMsg;
    }
  }

  toPurchase() {
    this.$location.path('/shop');
  }
}