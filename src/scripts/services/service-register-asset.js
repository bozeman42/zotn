export default class RegisterAssetService {
  constructor($http){
    const vm = this;
    vm.$inject(['$http'])
    vm.data = {
      assets: {
        bullets: {},
        bites: {},
        boons: {},
        factionLanyards: {}
      }
    }
  }

  getBullets() {
    const vm = this;
    vm.$http.get('/')
  }

}