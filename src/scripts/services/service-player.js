export default class PlayerSelectController {
  constructor($http) {
    this.data = {
      players: []
    };
    this.$http = $http;
    this.getPlayers();
  }

  getPlayers() {
    this.$http.get('/players')
    .then((response) => this.data.players = response.data)
    .catch((error) => console.log(error));
  }
}