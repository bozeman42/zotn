export default class FactionService {
  constructor($http){
    this.$inject = ['$http'];
    this.$http = $http;
    this.data = {
      badges: {}
    };
  }
  processKilledLanyard(badge){
    return this.$http.put('/faction/killed',badge)
    .then((response) => {
      console.log('killed:',response);
    })
  }

  getFactionBadges(){
    const vm = this;
    return this.$http.get('/faction/badges')
    .then((response) => {
      const badges = response.data;
      badges.forEach((badge) => {
        vm.badges[badges.id]
      })
    })
  }
}