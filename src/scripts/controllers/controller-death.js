import { HUNTER, ZOMBIE } from '../constants/factions';

export default class DeathController {
  constructor($location,$routeParams,$scope,AssetService,FactionService,PlayerService,ScannerService){
    this.$inject = [
      '$location',
      '$routeParams',
      '$scope',
      'AssetService',
      'FactionService'];
      'PlayerService',
      'ScannerService',
    this.$location = $location;
    this.$routeParams = $routeParams;
    this.$scope = $scope;
    this.ps = PlayerService;
    this.ss = ScannerService;
    this.fs = FactionService;
    this.data = PlayerService.data;
    this.playerWasKilled = false;
    this.message = '';
    this.weapon = '';
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
      console.log('player',player);
      if (player.isHunter()) {
        this.message = hunterMsg;
        this.weapon = bite;
      } else if (player.isZombie()) {
        this.message = zombieMsg;
        this.weapon = bullet;
      }
    }

  noDeath() {
    this.message = `Please scan all ${this.weapon}s you received.`;
    this.startBiteBulletScanner();
  }

  death() {
    this.ss.reset();
  }

  startBiteBulletScanner() {
    const vm = this;
    vm.ss.start((content) => {
      const weaponCard = content;
      if (vm.isBullet(weaponCard)) {

      } else if (vm.isBite(weaponCard)) {

      } else {
        vm.message = `Invalid ${vm.weapon}...`
        vm.ss.reset(1000)
        .then(() => {
          vm.selectMessageAndWeapon()
        })
      }
    })
  }

  isBullet(weaponCard){
    // is weaponCard a valid bullet?
  }

  isBite(weaponCard) {
    // is weaponCard a valid bite card?
  }

  toPurchase() {
    this.$location.path('/shop');
  }
}