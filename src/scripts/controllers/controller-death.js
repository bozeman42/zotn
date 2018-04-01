import { HUNTER, ZOMBIE } from '../constants/factions';

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
    this.askPlayerIfKilled = true;
    this.scanningWeapons = false;
    this.playerWasKilled = false;
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
            vm.ps.refreshCurrentPlayer(vm.data.currentPlayer.id);
          });
      } else if (vm.isBite(weaponCard) && vm.data.currentPlayer.isHunter()) {
        vm.as.checkInBite(vm.data.currentPlayer.id, weaponCard.EntityId)
          .then((result) => {
            const { bitBy } = result;
            vm.message = `You were bit by ${bitBy.name}`;
            vm.ps.refreshCurrentPlayer(vm.data.currentPlayer.id);
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
        if (response.data.leveledUp){
          vm.ps.refreshCurrentPlayer(vm.data.currentPlayer.id);
          vm.message = "Level up!";
        }


      })
  }

  toPurchase() {
    this.$location.path('/shop');
  }
}