import scanner from '../modules/scanner';
// injected dependencies:
// PlayerService

export default class PlayerSelectController {
  constructor($location,$http, $scope, PlayerService) {
    PlayerService.getCounts();
    PlayerService.getPlayers()
    this.data = PlayerService.data;
    this.message = 'Please scan your Con badge...';
    this.newPlayer = {
      nickname: '',
      faction: null,
      level: 1
    }
    this.badge = null;
    const vm = this;
    this.$location = $location;
    scanner(null,(content) => {
      $scope.$apply(() => {
        const {players} = this.data;
        vm.badge = JSON.parse(content);
        const {badge} = vm;
        console.log(content);
        console.log(badge);
        if (badge.entity_type === "badge"){
          if (!players[badge.entity_id]){
            this.message = "Please enter a public nickname for this account:";
          } else {
            this.message = "This badge is already associated with a player account.";
            this.badge = null;
          }
        }
      })
    });

  }

}