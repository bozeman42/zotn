export default class RegisterAssetService {
  constructor($http){
    const vm = this;
    vm.$inject(['$http'])
    vm.data = {
      currentAsset: {

      },
      assets: {
        bullets: {},
        bites: {},
        boons: {},
        factionLanyards: {}
      }
    }
    vm.getAssets();
  }

  getBullets() {
    const vm = this;
    return vm.$http.get('/assets/bullets')
    .then((response) => {
      const bullets = response.data;
      console.log(bullets);
    });
  }

  getBites() {
    const vm = this;
    return vm.$http.get('/assets/bites')
    .then((response) => {
      const bites = response.data;
      console.log(bites);
    });
  }

  getBoons() {
    const vm = this;
    return vm.$http.get('/assets/boons')
    .then((response) => {
      const boons = response.data;
      console.log(boons);
      // vm.buildObject("boons",boons).bind(vm);
    })
  }

  buildObject(assetType,data){
    const vm = this;
    data.forEach((item) => {
      vm.assets[assetType]
    })
  }

}