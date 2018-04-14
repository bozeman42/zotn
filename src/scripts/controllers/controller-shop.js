export default class {
  constructor($location, $routeParams, $scope, PlayerService, ScannerService, FactionService, AssetService) {
    const vm = this;
    this.$inject = ['$location', '$routeParams', '$scope', 'PlayerService', 'ScannerService', 'FactionService','AssetService'];
    this.ss = ScannerService;
    this.ps = PlayerService;
    this.as = Asset
    this.$scope = $scope;
    this.$location = $location;
    this.$routeParams = $routeParams;
    this.data = this.ps.data;
    this.message = 'Loading...';
    PlayerService.getPlayer($routeParams.id)
      .then((player) => {
        this.data.currentPlayer = player;
        this.startKillScanner();
      }
    )
    this.startShopScanner();
  }

  startShopScanner() {
    const vm = this;
    vm.ss.start(content => {
      vm.message = "Please scan an asset to purchase...";
      if (vm.isValidPurchase(content)) {
        vm.as.purchaseAsset(content, vm.data.currentPlayer.id);
      }
    })
  }

  isValidPurchase(content) {
    const { EntityType } = content;
    return (EntityType === "Boon" || EntityType === "Bullet" || EntityType === "")
  }

}