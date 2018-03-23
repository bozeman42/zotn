import { HUNTER, ZOMBIE, HUNTER_FACTION_NAME, ZOMBIE_FACTION_NAME, HUNTER_ZOMBIE_RATIO } from '../constants/factions';
import zombieIcon from '../../assets/images/zombie-icon.png';
import hunterIcon from '../../assets/images/hunter-icon.png';

export default class Player {
  constructor(faction, id = null, nickname = '', zombieLevel = 1, hunterLevel = 1, credits = 0, score = 0, xp = 0) {
    if (faction) {
      this.faction = faction;
    }
    this.setId(id);
    this.nickname = nickname;
    this.zombie_level = zombieLevel;
    this.hunter_level = hunterLevel;
    this.credits = credits;
    this.score = score;
    this.xp = xp;
    // inventory?
  }

  get level() {
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

  set level(level) {
    if (this.faction === ZOMBIE) {
      this.zombie_level = level;
    } else if (this.faction === HUNTER) {
      this.hunter_level = level;
    }
  }

  setId(id) {
    this.id = id;
  }

  set faction(faction) {
    this.factionCode = faction;
    this.assignIcon();
  }

  get faction() {
    return this.factionCode;
  }

  set nickname(nickname) {
    this.nicknameValue = nickname;
  }

  get nickname() {
    return this.nicknameValue;
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



  get factionName() {
    let name = '';
    if (this.faction === HUNTER) {
      name = HUNTER_FACTION_NAME;
    } else if (this.faction === ZOMBIE) {
      name = ZOMBIE_FACTION_NAME;
    }
    return name;
  }

  isZombie() {
    return this.faction === ZOMBIE;
  }

  isHunter() {
    return this.faction === HUNTER;
  }

  isEnemyFaction(faction) {
    if (this.faction === HUNTER) {
      return faction === ZOMBIE;
    } else if (this.faction === ZOMBIE) {
      return faction === HUNTER;
    }
  }

}