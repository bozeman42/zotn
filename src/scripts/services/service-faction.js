export default class FactionService {
  constructor($http){
    this.$inject = ['$http'];
    this.$http = $http;
  }
  processKilledLanyard(badge){
    return this.$http.put('/faction/killed',badge)
    .then((response) => {
      console.log('killed:',response);
    })
  }
}