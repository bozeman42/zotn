export default class RegisterAssetService {
  constructor($http, FactionService){
    const vm = this;
    const fs = FactionService;
    vm.$inject(['$http','FactionService'])
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
    return Promise.all(vm.getBullets(),vm.getBites(),vm.getBoons(),vm.getFactionBadges());
  }

  getBullets() {
    const vm = this;
    return vm.$http.get('/assets/bullets')
    .then((response) => {
      const bullets = response.data;
      console.log(bullets);
      vm.buildObject("bullets",'bullet_id',bullets);
    });
  }

  getBites() {
    const vm = this;
    return vm.$http.get('/assets/bites')
    .then((response) => {
      const bites = response.data;
      vm.buildObject("bites","bite_id",bites);
      console.log(bites);
    });
  }

  getBoons() {
    const vm = this;
    return vm.$http.get('/assets/boons')
    .then((response) => {
      const boons = response.data;
      console.log(boons);
      vm.buildObject("boons","card_id",boons);
    })
  }
  
  getFactionBadges(){
    const vm = this;
    return fs.getFactionBadges()
    .then((badges) => {
      vm.data.badges = badges
      return vm.data.badges;
    })
  }


  buildObject(assetType,idName,data){
    const vm = this;
    data.forEach((item) => {
      vm.assets[assetType][idName] = item;
    })
  }


}