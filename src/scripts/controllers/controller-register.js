import scanner from '../modules/physscanner';
import chime from '../../assets/sounds/electronic_chime.mp3';
// injected dependencies:
// PlayerService

export default class RegisterPlayerController {
  constructor($location, $http, $scope, PlayerService, ScannerService, FactionService) {
    this.$inject = ['$location', '$http', '$scope', 'PlayerService', 'ScannerService','FactionService'];
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
      hunter_level: 1,
      zombie_level: 1,
      id: null
    }
    vm.enteringInfo = false;
    vm.assignFactionBadge = vm.assignFactionBadge.bind(this);
    vm.startRegistrationScanner = vm.startRegistrationScanner.bind(this);
    Promise.all([PlayerService.getCounts(),PlayerService.getPlayers(),FactionService.getFactionBadges()])
    .then(vm.startRegistrationScanner.bind(vm))
    ;
  }

  startRegistrationScanner() {
    const vm = this;
    console.log(this);
    vm.ss.start(vm.registerBadge.bind(vm));
  }

  registerBadge(content) {
    const vm = this;
    vm.$scope.$apply(() => {
      if (this.isValidNewPlayer(content)) {
        vm.ss.stop()
        .then(() => {
          vm.assignFactionBadge();
        })
        vm.getPlayerInfo();
      } else {
        vm.ss.stop();
        vm.resetScanner(vm.startRegistrationScanner);
      }
    });
  }

  assignFactionBadge(){
    const vm = this;
    vm.ss.start(vm.scanFactionBadge.bind(vm));
  }

  scanFactionBadge(content){
    const vm = this;
    vm.$scope.$apply(() => {
      if (vm.isValidFactionBadge(content)){

      }
    })
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

  // isValidFactionBadge(content) {
  //   const vm = this;
  //   const { ss, chime}
  // }

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