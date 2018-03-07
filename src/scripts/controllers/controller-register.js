import scanner from '../modules/scanner';
import chime from '../../assets/sounds/electronic_chime.mp3';
import { ZOMBIE, HUNTER, HUNTER_ZOMBIE_RATIO } from '../constants/factions';
// injected dependencies:
// PlayerService

export default class PlayerSelectController {
  constructor($location, $http, $scope, PlayerService, ScannerService) {
    this.$inject = ['$location', '$http', '$scope', 'PlayerService', 'ScannerService'];
    const vm = this;
    vm.ss = ScannerService;
    vm.ps = PlayerService;
    vm.$location = $location;
    vm.$scope = $scope;
    vm.badge = null;
    vm.data = PlayerService.data;
    vm.message = 'Please scan your Con badge...';
    vm.newPlayer = {
      nickname: '',
      faction: null,
      level: 1,
      id: null
    }

    PlayerService.getCounts();
    PlayerService.getPlayers();
    vm.startRegistrationScanner();
  }

  startRegistrationScanner() {
    const vm = this;
    console.log('start registration scanner vm:', vm);
    vm.ss.startScanner(null, vm.registerBadge.bind(vm));
  }

  registerBadge(content) {
    console.log('this in registerBadge', this);
    const vm = this;
    const { badge, data: { players } } = vm;
    vm.$scope.$apply(() => {
      if (isValidNewPlayer(content)) {
        vm.ss.stop();
        vm.getPlayerInfo();
      } else {
        vm.ss.stop();
        vm.resetScanner(vm.startRegistrationScanner);
      }
    });
  }

  isValidNewPlayer(content) {
    const vm = this;
    const { ss, chime, data: { players }, ss: { scanner, isJSON } } = vm;
    let { badge, message } = vm;
    let result = false;
    if (!isJSON(content)) {
      vm.message = 'Invalid data format. Please have team check badge...';
      result = false;
    } else {
      badge = JSON.parse(content);
      if (!vm.isBadgeValid(badge)) {
        vm.message = "Please scan a valid player badge.";
        result = false;
      } else if (vm.playerExists(badge)) {
        vm.message = "This badge is already associated with a player account.";
        result = false;
      } else {
        chime.play();
        result = true;
      }
    }
    if (result === false) {
      badge = null;
    }
    return result;
  }

  resetScanner(scannerFunction) {
    const vm = this;
    setTimeout(() => {
      vm.$scope.$apply(() => {
        vm.message = 'Scan badge...';
        scannerFunction();
      })
    }, 2000);
  }

  isBadgeValid(badge) {
    return (badge.EntityType === "Badge" && badge.EntityId);
  }

  playerExists(badge) {
    return this.data.players.hasOwnProperty(badge.EntityId);
  }

  getNickname() {
    const vm = this;
    vm.message = "Please enter a public nickname for this account:";
  }

  getPlayerInfo() {
    vm.player
    const { newPlayer, data: {counts: {zombieCount,hunterCount}} } = this;
    if (hunterCount / zombieCount < HUNTER_ZOMBIE_RATIO) {
      newPlayer.faction = HUNTER;
    } else {
      newPlayer.faction = ZOMBIE;
    }
    this.getNickname();
  }

}