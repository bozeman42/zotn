import { HUNTER, ZOMBIE } from '../constants/factions';
import zombieIcon from '../../assets/images/zombie-icon.png';
import hunterIcon from '../../assets/images/hunter-icon.png';

export default class Player {
  constructor(nickname = '', faction = 1, level = 1, id) {
    this.nickname = nickname;
    this.faction = faction;
    this.level = level;
    this.id = id;
    this.icon = assignIcon(this);
    // experience?
    // inventory?
    
  }
}

function assignIcon(player) {
  let icon = null;
  if (player.faction === HUNTER) {
    icon = hunterIcon;
  } else if (player.faction === ZOMBIE) {
    icon = zombieIcon;
  }
  return icon;
}