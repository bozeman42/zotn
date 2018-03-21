import scanner from '../modules/physscanner';
import chime from '../../assets/sounds/electronic_chime.mp3';
import Player from '../classes/Player';

// injected dependencies:
// PlayerService

export default class RegisterPlayerController {
  constructor($location, $http, $scope, PlayerService, ScannerService, FactionService) {
    this.$inject = ['$location', '$http', '$scope', 'PlayerService', 'ScannerService', 'FactionService'];
    const vm = this;
    vm.ss = ScannerService;
    vm.ps = PlayerService;
    vm.fs = FactionService;
    vm.$location = $location;
    vm.$scope = $scope;
    vm.badge = null;
    vm.chime = new Audio(chime);
    vm.data = PlayerService.data;
    vm.message = 'Loading...';
    vm.enteringInfo = false;
    vm.assignFactionBadge = vm.assignFactionBadge.bind(this);
    vm.registerBadge = vm.registerBadge.bind(this);
    vm.startRegistrationScanner = vm.startRegistrationScanner.bind(this);
    vm.startRegistrationScanner();
  }

  startRegistrationScanner() {
    const vm = this;
    vm.message = "Please scan your Con badge...";
    vm.ss.start(vm.registerBadge);
  }

  submitNickname() {
    const vm = this;
    console.log('This:', vm);
    console.log(vm.data.newPlayer);
  }

  registerBadge(content) {
    const vm = this;
    vm.$scope.$apply(() => {
      if (this.isPlayerBadgeValid(content)) {
        vm.chime.play();
        vm.ss.stop()
        vm.ps.createNewPlayerWithId(content.EntityId)
          .then((response) => {
            if (response.data.id) {
              vm.data.newPlayer.id = response.data.id;
              vm.requestNicknameInput();
            } else {
              vm.message = response.data;
              vm.resetScanner(vm.registerBadge);
            }
          })
      } else {
        vm.ss.stop();
        vm.message = "Please scan a valid player badge.";
        vm.resetScanner(vm.startRegistrationScanner);
      }
    });
  }

  requestNicknameInput() {
    console.log('Requesting nickname input');
    this.enteringInfo = true;
    this.message = "Please enter desired nickname...";
  }

  submitNickname() {
    this.enteringInfo = false;
    this.message = "Thank you. Please wait for scanner...";
    this.ps.submitNickname(this.data.newPlayer.nickname)
    .then(this.ps.getPlayer(this.data.newPlayer.id));
  }



  isPlayerBadgeValid(badge) {
    return (badge.EntityType === "Badge" && badge.EntityId);
  }

  assignFactionBadge() {
    const vm = this;
    vm.message = `Please scan a level ${vm.data.newPlayer.level()} ${vm.data.newPlayer.factionName()} badge...`;
    vm.ss.start(vm.scanFactionBadge.bind(vm));
  }

  scanFactionBadge(content) {
    const vm = this;
    vm.$scope.$apply(() => {
      if (vm.isCorrectFactionBadge(content)) {
        const lanyardId = content.EntityId;
        const playerId = vm.data.newPlayer.id;
        vm.message = "Thank you. One moment...";
        vm.fs.attachPlayerToFactionLanyard(lanyardId, playerId);
      } else {
        vm.ss.stop();
        vm.resetScanner(vm.assignFactionBadge);
      }
    })
  }

  isCorrectFactionBadge(content) {
    const vm = this;
    const { ss, chime, data: { newPlayer } } = vm;
    const level = newPlayer.level();
    let result = true;
    if (content.EntityType !== "FactionLanyard") {
      vm.message = 'Incorrect asset type. Please scan a faction lanyard...';
      result = false;
    } else if (content.Faction !== newPlayer.faction) {
      vm.message = 'Incorrect faction...';
      result = false;
    } else if (content.Level !== newPlayer.level()) {
      vm.message = 'Incorrect level...';
      result = false;
    }
    return result;
  }

  resetScanner(scannerFunction) {
    const vm = this;
    setTimeout(() => {
      vm.$scope.$apply(() => {
        scannerFunction();
      })
    }, 2000);
  }

  submitNewPlayer() {
    const vm = this;
    if (this.newPlayer.nickname !== '') {
      this.ps.submitNewPlayer(this.newPlayer)
        .then(() => {
          vm.message = 'Player account created';
          setTimeout(() => {
            vm.$scope.$apply(() => {
              vm.$location.path('/');
            });
          }, 2000);
        });
    }
  }

  getPlayerInfo() {
    const vm = this;
    vm.enteringInfo = true;
    this.getNickname();
  }

}