import chime from '../../assets/sounds/electronic_chime.mp3';
// injected dependencies:
// PlayerService

export default class PlayerSelectController {
  constructor($location, $scope, PlayerService, ScannerService) {
    const ps = PlayerService;
    window.controller = this;
    this.ss = ScannerService;
    this.data = PlayerService.data;
    this.$location = $location;
    this.message = 'Scan Badge...';
    this.badge = {};
    this.$scope = $scope;
    const vm = this;
    vm.chime = new Audio(chime);
    ps.getPlayers()
    this.startPlayerBadgeLoginScanner();
  }

  startPlayerBadgeLoginScanner() {
    const vm = this;
    vm.ss.startScanner(null, (content) => {
      vm.$scope.$apply(() => {
        if (vm.isLoginSuccessful(content)) {
          vm.ss.stop();
          vm.navigateToKillScreen();
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
    this.data.currentPlayer = player;
    this.navigateToKillScreen();
  }

  isLoginSuccessful(content) {
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
      } else if (!vm.playerExists(badge)) {
        vm.message = "This badge is not associated with a player account.";
        result = false;
      } else {
        vm.setCurrentPlayer(badge);
        chime.play();
        result = true;
        // speechSynthesis.speak(new SpeechSynthesisUtterance(`Hello, ${this.data.currentPlayer.nickname}. Identity confirmed.`));
      }
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
    this.$location.path(`kills/${this.data.currentPlayer.id}`);
  }

}