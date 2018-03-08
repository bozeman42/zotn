import scanner from '../modules/scanner';
import chime from '../../assets/sounds/electronic_chime.mp3';
// injected dependencies:
// PlayerService

export default class RegisterPlayerController {
  constructor($location, $http, $scope, PlayerService, ScannerService) {
    this.$inject = ['$location', '$http', '$scope', 'PlayerService', 'ScannerService'];
    const vm = this;
    vm.ss = ScannerService;
    vm.ps = PlayerService;
    vm.$location = $location;
    vm.$scope = $scope;
    vm.badge = null;
    vm.chime = new Audio(chime);
    vm.data = PlayerService.data;
    vm.message = 'Please scan your Con badge...';
    vm.newPlayer = {
      nickname: '',
      faction: null,
      level: 1,
      id: null
    }
    vm.enteringInfo = false;

    PlayerService.getCounts();
    PlayerService.getPlayers();
    vm.startRegistrationScanner = vm.startRegistrationScanner.bind(this);
    vm.startRegistrationScanner();
  }

  startRegistrationScanner() {
    const vm = this;
    console.log(this);
    console.log('start registration scanner vm:', vm);
    vm.ss.startScanner(null, vm.registerBadge.bind(vm));
  }

  registerBadge(content) {
    console.log('this in registerBadge', this);
    const vm = this;
    const { badge, data: { players } } = vm;
    vm.$scope.$apply(() => {
      if (this.isValidNewPlayer(content)) {
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
        vm.newPlayer.id = badge.EntityId;
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
    console.log(vm.newPlayer);
    vm.message = "Please enter a public nickname for this account:";
  }

  submitNewPlayer(){
    const vm = this;
    console.log(this.newPlayer)
    if (this.newPlayer.nickname !== '') {
      this.ps.submitNewPlayer(this.newPlayer)
      .then(() => {
        vm.message = 'Player account created';
        setTimeout(() => {
          vm.$scope.$apply(() => {
            vm.$location.path('/');
          });
        },2000);
      });
    }
  }

  getPlayerInfo() {
    const vm = this;
    vm.enteringInfo = true;
    this.getNickname();
  }

}