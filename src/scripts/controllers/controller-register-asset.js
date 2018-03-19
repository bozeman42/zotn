export default class RegisterAssetController {
  constructor($location,$scope,AssetService,ScannerService){
    this.$inject = ['$location','$scope','AssetService','ScannerService'];
    this.message = "Please scan an asset to register.";
    this.as = AssetService;
    this.ss = ScannerService;
    this.data = this.as.data.assets;
    this.registerAsset = this.registerAsset.bind(this);
    this.updateAssets();
    this.startAssetRegistrationScanner();
  }

  startAssetRegistrationScanner(){
    const vm = this;
    this.ss.start((content) => {
      console.log("Asset Registration callback called");
      if (content.EntityType) {
        vm.registerAsset(content);
      }
    })
  }

  registerAsset(content){
    const vm = this;
    vm.as.registerAsset(content);
  }

  updateAssets(){
    console.log('Getting assets');
    this.as.getAssets();
  }
}