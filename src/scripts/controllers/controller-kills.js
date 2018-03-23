import { HUNTER, ZOMBIE } from '../constants/factions';

export default class KillController {
  constructor($location,$routeParams, $scope,PlayerService,ScannerService,FactionService){
    const vm = this;
    this.$inject = ['$location', '$routeParams', '$scope','PlayerService','ScannerService','FactionService'];
    this.ss = ScannerService;
    this.ps = PlayerService;
    this.fs = FactionService;
    this.$scope = $scope;
    this.$location = $location;
    this.data = {
      message: '',
      playerId: $routeParams.id,
      player: {}
    };
    PlayerService.getPlayer(vm.data.playerId)
    .then(()=>{
      this.data.player = PlayerService.data.players[this.data.playerId];
      this.selectMessage();
      this.startKillScanner();
    })
  }

  selectMessage() {
    const hunterMsg = "Please report any zombie kills.";
    const zombieMsg = "Turn in any hunter kills.";
    const player = this.data.player;
    if (player.faction === HUNTER) {
      this.data.message = hunterMsg;
    } else if (player.faction === ZOMBIE) {
      this.data.message = zombieMsg;
    }
  }

  startKillScanner(){
    const vm = this;
    vm.ss.start((content) => {
      const killBadge = content;
      vm.ss.stop();
      vm.$scope.$apply(() => {
        if (vm.killScanSuccessful(killBadge)) {
          vm.processKill(killBadge);
        } else {
          vm.resetScanner();
        }
      });
    })
  }


  killScanSuccessful(content) {
    const vm = this;

  }

  processKilledLanyard(killBadge){
    this.fs.processKilledLanyard(killBadge);
  }
  
  processKill(killBadge){
    this.creditKill(this.data.player);
    this.processKilledLanyard(killBadge);
  }

  finalizeKills() {
    this.$location.path('/death');
  }
  
  creditKill(player){
    this.ps.creditKill(player);
  }

}