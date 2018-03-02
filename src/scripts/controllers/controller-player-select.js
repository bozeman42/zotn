import scanner from '../modules/scanner';
// injected dependencies:
// PlayerService

export default class PlayerSelectController {
  constructor($location, $scope, PlayerService) {
    this.data = PlayerService.data;
    this.$location = $location;
    this.message = 'Scan Badge...';
    this.badge = {};
    this.$scope = $scope;
    const vm = this;
    PlayerService.getPlayers()
    this.startScanner();
  }

  startScanner(){
    scanner("scanPreview",(content) => {
      const vm = this;
      vm.$scope.$apply(() => {
        const {players} = vm.data;
        vm.badge = JSON.parse(content);
        if (vm.isBadgeValid(vm.badge)){
          if (vm.playerExists(vm.badge)){
            vm.setCurrentPlayer(vm.badge);
            this.navigateToKillScreen();
          } else {
            vm.message = "This badge is not associated with a player account.";
          }
        } else {
          vm.message = "Please scan a valid player badge.";
        }
      })
    });
  }

  isBadgeValid(badge) {
    return (badge.EntityType === "Badge" && badge.EntityId);
  }

  setCurrentPlayer(badge){
    const {players} = this.data;
    this.data.currentPlayer = players[badge.EntityId];
  }

  navigateToKillScreen(){
    this.$location.path(`kills/${this.badge.EntityId}`);
  }

  playerExists(badge){
    return this.data.players.hasOwnProperty(badge.EntityId);
  }
}