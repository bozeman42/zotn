export default class PlayerSelectController {
  constructor($http) {
    this.data = {
      players: []
    };
    this.$http = $http;
    this.getPlayers();
  }

  getPlayers() {
    console.log('Service getPlayers called');
    return this.$http.get('/players')
    .then((response) => this.data.players = response.data)
    .catch((error) => console.log(error));
  }
}