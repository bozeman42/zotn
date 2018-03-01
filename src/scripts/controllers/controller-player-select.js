import scanner from '../modules/scanner';
// injected dependencies:
// PlayerService

export default class PlayerSelectController {
  constructor($location, $scope, PlayerService) {
    this.data = PlayerService.data;
    this.message = '';
    this.badge = {};
    const vm = this;
    PlayerService.getPlayers()
    this.$location = $location;
    scanner(null,(content) => {
      $scope.$apply(() => {
        const {players} = this.data;
        console.log(content);
        vm.badge = JSON.parse(content);
        console.log(vm.badge);
        if (vm.badge.entity_type = "badge"){
          vm.data.currentPlayer = players[vm.badge.entity_id];
          vm.$location.path(`kills/${vm.badge.entity_id}`);
        }
      })
    });
  }

  selectPlayer(player){
    this.data.currentPlayer = player;
    this.$location.path(`/kills/${player.id}`);
  }
}