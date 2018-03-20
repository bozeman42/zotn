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
    vm.message = 'Please enter desired nickname...';
    vm.enteringInfo = true;
    vm.assignFactionBadge = vm.assignFactionBadge.bind(this);
    vm.startRegistrationScanner = vm.startRegistrationScanner.bind(this);
  }

  startRegistrationScanner() {
    const vm = this;
    console.log(this);
    this.$scope.$apply(() => {
      vm.message = "Please scan your Con badge...";
    })
    vm.ss.start(vm.registerBadge.bind(vm));
  }

  registerBadge(content) {
    const vm = this;
    vm.$scope.$apply(() => {
      if (this.isValidNewPlayer(content)) {
        vm.ss.stop()
        vm.ps.createNewPlayerWithId(content.EntityId);
        vm.assignFactionBadge()
      } else {
        vm.ss.stop();
        vm.resetScanner(vm.startRegistrationScanner);
      }
    });
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
        vm.fs.attachPlayerToFactionLanyard(lanyardId,playerId);
      } else {
        vm.ss.stop();
        vm.resetScanner(vm.assignFactionBadge);
      }
    })
  }

  isValidNewPlayer(content) {
    const vm = this;
    const { ss, chime, data: { players }, ss: { scanner, isJSON } } = vm;
    let { badge, message } = vm;
    let result = false;
    badge = content;
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
    if (result === false) {
      badge = null;
    }
    return result;
  }

  isCorrectFactionBadge(content) {
    const vm = this;
    const { ss, chime, data: {newPlayer}} = vm;
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