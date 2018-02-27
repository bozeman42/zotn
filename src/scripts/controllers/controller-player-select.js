// injected dependencies:
// PlayerService

export default class PlayerSelectController {
  constructor($location, PlayerService) {
    this.data = PlayerService.data;
    PlayerService.getPlayers()
    this.$location = $location;
  }

  selectPlayer(player){
    this.data.currentPlayer = player;
    this.$location.path('/kills');
  }
}