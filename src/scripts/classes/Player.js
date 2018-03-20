import { HUNTER, ZOMBIE, HUNTER_FACTION_NAME, ZOMBIE_FACTION_NAME, HUNTER_ZOMBIE_RATIO } from '../constants/factions';
import zombieIcon from '../../assets/images/zombie-icon.png';
import hunterIcon from '../../assets/images/hunter-icon.png';

export default class Player {
  constructor(faction, id = null, nickname = '', zombieLevel = 1, hunterLevel = 1, credits = 0, score = 0, xp = 0) {
    if (faction) {
      this.setFaction(faction);
    }
    this.setId(id);
    this.nickname = nickname;
    this.zombie_level = zombieLevel;
    this.hunter_level = hunterLevel;
    this.level = () => this.getFactionLevel();
    this.factionName = () => this.getFactionName();
    this.credits = credits;
    this.score = score;
    this.xp = xp;
    // inventory?
  }

  setId(id) {
    this.id = id;
  }

  setFaction(faction) {
    this.faction = faction;
    this.assignIcon();
  }

  setNickname(nickname) {
    this.nickname = nickname;
  }

  assignIcon() {
    if (this.faction === HUNTER) {
      this.icon = hunterIcon;
    } else if (this.faction === ZOMBIE) {
      this.icon = zombieIcon;
    } else {
      this.icon = null;
    }
  }

  getFactionName() {
    let name = '';
    if (this.faction === HUNTER) {
      name = HUNTER_FACTION_NAME;
    } else if (this.faction === ZOMBIE) {
      name = ZOMBIE_FACTION_NAME;
    }
    return name;
  }

  getFactionLevel() {
    let level;
    if (this.faction === HUNTER) {
      level = this.hunter_level;
    } else if (this.faction === ZOMBIE) {
      level = this.zombie_level;
    } else {
      level = null;
    }
    return level;
  }
}