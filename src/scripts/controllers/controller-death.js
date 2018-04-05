import { HUNTER, ZOMBIE } from '../constants/factions';
import commonEmitter from '../modules/common-emitter';
export default class DeathController {
  constructor($location, $routeParams, $scope, AssetService, FactionService, PlayerService, ScannerService) {
    this.$inject = [
      '$location',
      '$routeParams',
      '$scope',
      'AssetService',
      'FactionService',
      'PlayerService',
      'ScannerService'
    ]
    this.$location = $location;
    this.$routeParams = $routeParams;
    this.$scope = $scope;
    this.as = AssetService;
    this.ps = PlayerService;
    this.ss = ScannerService;
    this.fs = FactionService;
    this.data = PlayerService.data;
    this.currentPlayerLanyards = [];
    this.askPlayerIfKilled = true;
    this.scanningWeapons = false;
    this.playerWasKilled = false;
    this.playerNeedsNewLanyard = false;
    this.message = '';
    this.weapon = '';
    this.levelUp = this.levelUp.bind(this);
    PlayerService.getPlayer($routeParams.id)
      .then((player) => {
        this.data.currentPlayer = player;
        this.selectMessageAndWeapon();
      })
  }

  selectMessageAndWeapon() {
    const hunterMsg = "Did a zombie bite and kill you?";
    const zombieMsg = "Were you killed by a hunter?";
    const bite = "bite";
    const bullet = "bullet";
    const player = this.data.currentPlayer;
    console.log('player', player);
    if (player.isHunter()) {
      this.message = hunterMsg;
      this.weapon = bite;
    } else if (player.isZombie()) {
      this.message = zombieMsg;
      this.weapon = bullet;
    }
  }

  playerDied(playerWasKilled) {
    this.askPlayerIfKilled = false;
    this.scanningWeapons = true;
    this.playerWasKilled = playerWasKilled;
    this.playerNeedsNewLanyard = playerWasKilled;
    this.startBiteBulletScanner();
  }

  startBiteBulletScanner() {
    this.message = `Please scan all ${this.weapon}s you received.`;
    const vm = this;
    vm.ss.start((content) => {
      const weaponCard = content;
      if (vm.isBullet(weaponCard) && vm.data.currentPlayer.isZombie()) {
        vm.as.checkInShot(vm.data.currentPlayer.id, weaponCard.EntityId)
          .then((result) => {
            const { shotBy } = result.data;
            this.message = `You were shot by ${shotBy.name}!`;
            vm.ps.refreshCurrentPlayer(vm.data.currentPlayer.id);
          });
      } else if (vm.isBite(weaponCard) && vm.data.currentPlayer.isHunter()) {
        vm.as.checkInBite(vm.data.currentPlayer.id, weaponCard.EntityId)
          .then((result) => {
            console.log(result);
            if (typeof result.data === 'string') {
              console.error(result.data);
              commonEmitter.emit('bad-scan');
            } else {
              commonEmitter.emit('good-scan');
              const { bitBy } = result.data;
              vm.message = `You were bit by ${bitBy.name}`;
              vm.ps.refreshCurrentPlayer(vm.data.currentPlayer.id);
            }
          });
      } else {
        vm.message = `Invalid ${vm.weapon}...`
        vm.ss.reset(1000)
          .then(() => {
            this.message = `Please scan all ${this.weapon}s you received.`;
          })
      }
    })
  }

  isBullet(weaponCard) {
    return (weaponCard.EntityType === "Bullet");
  }

  isBite(weaponCard) {
    return (weaponCard.EntityType === "Bite");
  }

  doneScanningWeapons() {
    const vm = this;
    vm.scanningWeapons = false;
    vm.ss.stop()
      .then(vm.levelUp);
  }

  levelUp() {
    const vm = this;
    vm.message = "Processing XP..."
    vm.ps.levelUp(vm.data.currentPlayer.id)
      .then((response) => {
        if (response.data.leveledUp) {
          vm.ps.refreshCurrentPlayer(vm.data.currentPlayer.id);
          vm.message = "Level up!";
          vm.playerNeedsNewLanyard = true;
        }
        vm.exchangeLanyards();
      })
  }

  async exchangeLanyards() {
    const vm = this;
    await this.ps.getPlayer(vm.data.currentPlayer.id);
    vm.data.currentPlayer = vm.data.players[vm.data.currentPlayer.id];
    if (!vm.playerNeedsNewLanyard) {
      this.$scope.$apply(() => {
        vm.toPurchase();
      })
    } else {
      if (vm.playerHasLanyard()) {
        vm.returnLanyard(vm.data.currentPlayer)
          .then(() => {
            vm.getNewLanyard(vm.data.currentPlayer)
          })
          .catch(error => {
            console.error(error);
            vm.exchangeLanyards();
          })
      } else {
        if (vm.playerWasKilled) {
          await vm.ps.processDeath(vm.data.currentPlayer.id);
          await vm.ps.getPlayer(vm.data.currentPlayer.id);
          this.$scope.$apply(() => {
            vm.getNewLanyard(vm.data.currentPlayer);
          })
        }
      }
    }
  }


  getNewLanyard(player) {
    const vm = this;
    console.log('getNewLanyard');
    this.message = `Please scan a ${player.factionName} level ${player.level} badge...`;
    this.ss.start((content) => {
      if (content.EntityType === 'FactionLanyard' && content.Faction === player.faction && content.Level === player.level) {
        this.fs.attachPlayerToFactionLanyard(content.EntityId, player.id)
          .then((response) => {
            console.log(response);
            this.toPurchase();
          })
          .catch(err => {
            console.error(err);
            this.getNewLanyard(player);
          });
      } else {
        vm.message = 'Incorrect faction, level, or asset type.';
      }
    });
  }

  getPlayerLanyards() {
    return this.fs.getPlayerLanyards(this.data.currentPlayer.id)
  }

  returnLanyard(player) {
    return new Promise((resolve, reject) => {
      this.$scope.$apply(() => {
        this.message = "Please scan and return your current faction lanyard."
      })
      this.ss.start((content) => {
        console.log('returning', content);
        if (content.EntityType === 'FactionLanyard') {
          this.fs.detachPlayerFromFactionLanyard(content.EntityId, player.id)
            .then(response => {
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        } else {
          reject('Wrong entity type');
        }
      })
    })
  }

  playerHasLanyard() {
    return !this.playerWasKilled;
  }

  toPurchase() {
    console.log('should be going to shop');
    this.$location.path(`/shop/${this.data.currentPlayer.id}`);
  }
}