export default class AssetService {
  constructor($http, FactionService) {
    const vm = this;
    this.fs = FactionService;
    vm.$inject = ['$http', 'FactionService'];
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
        console.log("Asset data:", vm.data);
      })
  }

  getAssets() {
    const vm = this;
    return Promise.all([vm.getBullets(), vm.getBites(), vm.getBoons(), vm.getFactionBadges()]);
  }

  getBullets() {
    const vm = this;
    return vm.$http.get('/assets/bullets')
      .then((response) => {
        const bullets = response.data;
        vm.buildObject("bullets", 'bullet_id', bullets);
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
        vm.buildObject("bites", "bite_id", bites);
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
        vm.buildObject("boons", "card_id", boons);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  getFactionBadges() {
    const vm = this;
    return vm.fs.getFactionBadges()
      .then((badges) => {
        vm.data.assets.factionLanyards = badges;
      })
      .catch((error) => {
        console.error(error);
      })
  }


  buildObject(assetType, idName, data) {
    const vm = this;
    data.forEach((item) => {
      vm.data.assets[assetType][item[idName]] = item;
    })
  }

  registerAsset(asset) {
    return new Promise((resolve, reject) => {
      const vm = this;
      let path = '/assets';
      switch (asset.EntityType) {
        case 'Bite':
          path += '/bites';
          break;
        case 'Boon':
          path += '/boons';
          break;
        case 'Bullet':
          path += '/bullets';
          break;
        case 'FactionLanyard':
          path = '/faction/badges';
          break;
        default:
          reject("Invalid asset type.");
      }
      resolve(vm.$http.post(path, asset)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        })
      );
    });
  }
}