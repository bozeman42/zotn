import { HUNTER, ZOMBIE } from '../constants/factions';
import zombieIcon from '../../assets/images/zombie-icon.png';
import hunterIcon from '../../assets/images/hunter-icon.png';

export default class Player {
  constructor(faction, id = null, nickname = '', zLevel = 1, hLevel = 1, credits = 0, score = 0, xp = 0) {
    this.faction = faction;
    this.id = id;
    this.nickname = nickname;
    this.zombie_level = zLevel;
    this.hunter_level = hLevel;
    this.level = this.getFactionLevel();
    this.credits = credits;
    this.score = score;
    this.xp = xp;
    this.icon = assignIcon(this);
    // experience?
    // inventory?
  }

  getFactionLevel() {
    let level;
    if (this.faction === HUNTER) {
      level = this.hunter_level;
    } else if (this.faction === ZOMBIE) {
      level = this.zombie_level;
    }
    return level;
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