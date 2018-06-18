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
    vm.ps = PlayerService;
    vm.ss = ScannerService;
    
    vm.message = '';
    console.log(vm.players);
    vm.startShopScanner = vm.startShopScanner.bind(this);
    vm.ps.getPlayer($routeParams.id)
      .then((player) => {
        vm.players.currentPlayer = player;
      })
      .then(this.startShopScanner);
  }

  startShopScanner() {
    const vm = this;
    vm.message = "Scan an item to purchase it...";
    vm.ss.start((content) => {
      vm.as.purchaseAsset(vm.players.currentPlayer.id, content)
        .then(response => {
          console.log(response.data);
          if (response.data.purchased === true) {
            vm.message = "Purchase successful.";
            vm.ps.getPlayer(vm.players.currentPlayer.id)
            .then(player => {
              vm.players.currentPlayer = player;
            })
          } else if (response.data.purchased == false) {
            vm.message = "Purchase failed.";
          }
        });
    });
  }

}

export default Shop;
