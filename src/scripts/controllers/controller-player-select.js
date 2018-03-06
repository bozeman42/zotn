
// injected dependencies:
// PlayerService

export default class PlayerSelectController {
  constructor($location, $scope, PlayerService, ScannerService) {
    const ps = PlayerService;
    this.ss = ScannerService;
    this.data = PlayerService.data;
    this.$location = $location;
    this.message = 'Scan Badge...';
    this.badge = {};
    this.$scope = $scope;
    const vm = this;
    ps.getPlayers()
    this.startPlayerBadgeLoginScanner();
  }

  startPlayerBadgeLoginScanner(){
    this.ss.startScanner(null,(content) => {
      const vm = this;
      const {ss,ss:{scanner}} = vm;
      let {badge} = vm;
      vm.$scope.$apply(() => {

      // TODO: make this check a reusable function for all scans
      try {
        badge = JSON.parse(content);
      } catch (error) {
        vm.message = 'Invalid data format. Please have team check badge...';
        ss.stop()
        vm.resetScanner();
      }

      ss.stop();
        const {players} = vm.data;
        if (vm.isBadgeValid(badge)){
          if (vm.playerExists(badge)){
            console.log("This is the scanner",scanner);
            vm.setCurrentPlayer(badge);
            // speechSynthesis.speak(new SpeechSynthesisUtterance(`Hello, ${this.data.currentPlayer.nickname}. Identity confirmed.`));
            this.navigateToKillScreen();
          } else {
            vm.message = "This badge is not associated with a player account.";
            vm.resetScanner()
          }
        } else {
          vm.message = "Please scan a valid player badge.";
          vm.resetScanner();
        }
      })
    });
  }

  resetScanner(){
    const vm = this;
    setTimeout(() => {
      vm.$scope.$apply(() => {
        vm.message = 'Scan badge...';
        vm.startPlayerBadgeLoginScanner();
      })
    },2000);
  }

  selectPlayer(player){
    this.data.currentPlayer = player;
    this.navigateToKillScreen();
  }

  isBadgeValid(badge) {
    return (badge.EntityType === "Badge" && badge.EntityId);
  }

  setCurrentPlayer(badge){
    const {players} = this.data;
    this.data.currentPlayer = players[badge.EntityId];
  }

  navigateToKillScreen(){
    this.$location.path(`kills/${this.data.currentPlayer.id}`);
  }

  playerExists(badge){
    return this.data.players.hasOwnProperty(badge.EntityId);
  }
}