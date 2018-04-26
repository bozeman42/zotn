class Shop {
  constructor($location, $routeParams, $scope, AssetService, PlayerService, ScannerService) {
    const vm = this;
    vm.$inject = [
      '$location',
      '$routeParams',
      '$scope',
      'AssetService',
      'PlayerService',
      'ScannerService'
    ];
    vm.players = PlayerService.data;
    vm.as = AssetService;
    vm.ss = ScannerService;
    vm.message = '';
    console.log(vm.players);
    vm.startShopScanner = vm.startShopScanner.bind(this);
    PlayerService.getPlayer($routeParams.id)
    .then((player) => {
      vm.players.currentPlayer = player;
    })
    .then(this.startShopScanner);
  }


// {"EntityType":"Bite","EntityId":1}
// {"EntityType":"Bullet","EntityId":1}
// 
// 
//   

  startShopScanner() {
    const vm = this;
    vm.message = "Scan an item to purchase it...";
    vm.ss.start((content) => {
      vm.as.purchaseAsset(vm.players.currentPlayer.id, content)
    })
  }

}

export default Shop;