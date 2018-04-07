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
    console.log(vm.players);
    PlayerService.getPlayer($routeParams.id)
    .then((player) => {
      vm.players.currentPlayer = player;
    })
  }

  // to-do: scan asset.
  // check on server to see if the asset is available and if the player has
  // sufficient credits to make the purchase

}

export default Shop;