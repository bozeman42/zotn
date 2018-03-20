import chime from '../../assets/sounds/electronic_chime.mp3';
// injected dependencies:
// PlayerService

export default class PlayerSelectController {
  constructor($location, $scope, PlayerService, ScannerService) {
    this.$inject = ['$location', '$scope', 'PlayerService', 'ScannerService'];
    const ps = PlayerService;
    window.controller = this;
    this.ss = ScannerService;
    this.data = PlayerService.data;
    this.$location = $location;
    this.message = 'Loading...';
    this.badge = {};
    this.$scope = $scope;
    const vm = this;
    vm.chime = new Audio(chime);
    this.navigateToKillScreen = this.navigateToKillScreen.bind(this);
    ps.getPlayers()
      .then(this.startPlayerBadgeLoginScanner.bind(vm));
  }

  startPlayerBadgeLoginScanner() {
    const vm = this;
    vm.message = "Please scan your Con badge...";
    vm.ss.start((content) => {
      vm.$scope.$apply(() => {
        if (vm.isLoginSuccessful(content)) {
          vm.ss.stop()
            .then(() => vm.navigateToKillScreen())
        } else {
          vm.ss.stop()
          vm.resetScanner();
        }
      });
    })
  }

  resetScanner() {
    const vm = this;
    setTimeout(() => {
      vm.$scope.$apply(() => {
        vm.message = 'Scan badge...';
        vm.startPlayerBadgeLoginScanner();
      })
    }, 2000);
  }

  selectPlayer(player) {
    const vm = this;
    vm.data.currentPlayer = player;
    vm.ss.stop()
      .then(() => vm.navigateToKillScreen())
  }

  isLoginSuccessful(content) {
    const vm = this;
    const { chime, data: { players }} = vm;
    let { badge, message } = vm;
    let result = false;
    badge = content
    if (!vm.isBadgeValid(badge)) {
      vm.message = "Please scan a valid player badge.";
      result = false;
    } else if (!vm.playerExists(badge)) {
      vm.message = "This badge is not associated with a player account.";
      result = false;
    } else {
      vm.setCurrentPlayer(badge);
      chime.play();
      // const welcome = new SpeechSynthesisUtterance(`Hello, ${this.data.currentPlayer.nickname}. Identity confirmed.`)
      // speechSynthesis.speak(welcome);
      result = true;
    }
    return result;
  }

  isBadgeValid(badge) {
    return (badge.EntityType === "Badge" && badge.EntityId);
  }

  playerExists(badge) {
    return this.data.players.hasOwnProperty(badge.EntityId);
  }

  setCurrentPlayer(badge) {
    const { players } = this.data;
    this.data.currentPlayer = players[badge.EntityId];
  }

  navigateToKillScreen() {
    const vm = this;
    vm.$scope.$apply(() => {
      vm.$location.path(`kills/${vm.data.currentPlayer.id}`);
    })
  }
}