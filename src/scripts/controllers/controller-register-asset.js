export default class RegisterAssetController {
  constructor($location,$scope,AssetService,ScannerService){
    this.$inject = ['$location','$scope','AssetService','ScannerService'];
    this.message = "Please scan an asset to register.";
    this.as = AssetService;
    this.ss = ScannerService;
    this.data = this.as.data.assets;
    this.updateAssets();
    this.startAssetRegistrationScanner();
  }

  startAssetRegistrationScanner(){
    const vm = this;
    this.ss.start((content) => {
      if (this.isValidAsset(content)){

      }
    })
  }

  isValidAsset(content){
    const vm = this;
    const { ss, ss: { isJSON }} = vm;
    let result = false;
    
  }

  updateAssets(){
    this.as.getAssets();
  }
}