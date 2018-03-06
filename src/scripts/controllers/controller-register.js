import scanner from '../modules/scanner';
// injected dependencies:
// PlayerService

export default class PlayerSelectController {
  constructor($location, $http, $scope, PlayerService, ScannerService) {
    const vm = this;
    vm.ss = ScannerService;
    vm.$location = $location;
    vm.$scope = $scope;
    vm.badge = null;
    vm.data = PlayerService.data;
    vm.message = 'Please scan your Con badge...';
    vm.newPlayer = {
      nickname: '',
      faction: null,
      level: 1
    }

    PlayerService.getCounts();
    PlayerService.getPlayers();
    vm.startRegistrationScanner();
  }

  startRegistrationScanner() {
    const vm = this;
    console.log('start registration scanner vm:',vm);
    vm.ss.startScanner(null, vm.registerBadge.bind(vm));
  }

  registerBadge(content)  {
    console.log('this in registerBadge',this);
    const vm = this;
    vm.$scope.$apply(() => {
      vm.badge = JSON.parse(content);
      vm.ss.stop();
      const { players } = vm.data;
      const { badge } = vm;
      if (vm.isBadgeValid(badge)) {
        if (vm.playerExists(badge)) {
          vm.message = "This badge is already associated with a player account.";
          setTimeout(() => {
            vm.$scope.$apply(() => {
              console.log(vm);
              vm.message = 'Please scan your Con badge...';
              vm.startRegistrationScanner();
            })
          },2000);
          vm.badge = null;
        } else {
          vm.getPlayerInfo();
        }
      } else {
        vm.message = 'Invalid player badge.';
        console.log(vm.badge);
        vm.badge = null;
      }
    });
  }

  isBadgeValid(badge) {
    return (badge.EntityType === "Badge" && badge.EntityId);
  }

  playerExists(badge) {
    return this.data.players.hasOwnProperty(badge.EntityId);
  }

  getNickname(){
    const vm = this;
    vm.message = "Please enter a public nickname for this account:";
  }

  getPlayerInfo(){
    this.getNickname();
  }

}