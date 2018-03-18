export default class AssetService {
  constructor($http, FactionService){
    const vm = this;
    this.fs = FactionService;
    vm.$inject = ['$http','FactionService'];
    vm.$http = $http;
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
    this.buildObject = this.buildObject.bind(this);
    vm.getAssets()
    .then(() => {
      console.log("Asset data:",vm.data);
    })
  }

  getAssets(){
    const vm = this;
    return Promise.all([vm.getBullets(),vm.getBites(),vm.getBoons(),vm.getFactionBadges()]);
  }

  getBullets() {
    const vm = this;
    return vm.$http.get('/assets/bullets')
    .then((response) => {
      const bullets = response.data;
      console.log(bullets);
      vm.buildObject("bullets",'bullet_id',bullets);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  getBites() {
    const vm = this;
    return vm.$http.get('/assets/bites')
    .then((response) => {
      const bites = response.data;
      vm.buildObject("bites","bite_id",bites);
      console.log(bites);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  getBoons() {
    const vm = this;
    return vm.$http.get('/assets/boons')
    .then((response) => {
      const boons = response.data;
      console.log(boons);
      vm.buildObject("boons","card_id",boons);
    })
    .catch((error) => {
      console.error(error);
    })
  }
  
  getFactionBadges(){
    const vm = this;
    return vm.fs.getFactionBadges()
    .then((badges) => {
      vm.data.badges = badges
      return vm.data.badges;
    })
    .catch((error) => {
      console.error(error);
    })
  }


  buildObject(assetType,idName,data){
    const vm = this;
    data.forEach((item) => {
      vm.assets[assetType][idName] = item;
    })
  }


}