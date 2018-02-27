// injected dependencies:
// PlayerService
import zombieIcon from '../../assets/images/zombie-icon.png';
import hunterIcon from '../../assets/images/hunter-icon.png';

// faction IDs
const HUNTER = 1;
const ZOMBIE = 2;

export default class PlayerSelectController {
  constructor(PlayerService) {
    this.data = PlayerService.data;
    this.zombieIcon = zombieIcon;
    this.hunterIcon = hunterIcon;
    PlayerService.getPlayers()
    .then((players) => {
      players.forEach((player) => {
        if (player.faction === HUNTER) {
          player.icon = hunterIcon;
        } else if (player.faction === ZOMBIE) {
          player.icon = zombieIcon;
        }
      })
    })
  }
}