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
    this.data = this.ps.data;
    PlayerService.getPlayer($routeParams.id)
    .then((player)=>{
      this.data.currentPlayer = player;
      this.selectMessage();
      this.startKillScanner();
    })
  }

  selectMessage() {
    const hunterMsg = "Please report any zombie kills.";
    const zombieMsg = "Turn in any hunter kills.";
    const player = this.data.currentPlayer;
    if (player.faction === HUNTER) {
      this.data.message = hunterMsg;
    } else if (player.faction === ZOMBIE) {
      this.data.message = zombieMsg;
    }
    console.log(this.data.message);
  }

  startKillScanner(){
    const vm = this;
    vm.ss.start((content) => {
      const killBadge = content;
      vm.ss.stop();
      vm.$scope.$apply(() => {
        if (vm.isValidKillScan(killBadge)) {
          vm.processKill(killBadge);
        } else {
          vm.resetScanner();
        }
      });
    })
  }

//   {"EntityType":"FactionLanyard","EntityId":13, "Level":1, "Faction":1}

  isValidKillScan(content) {
    return (content.EntityType === "faction_lanyard" && this.data.currentPlayer.isEnemyFaction(content.Faction))
  }

  processKilledLanyard(killBadge){
    this.fs.processKilledLanyard(killBadge);
  }
  
  processKill(killBadge){
    this.fs.processKilledLanyard(killBadge)
    .then(() => {
      // if (lanyard was assigned)
      this.creditKill(this.data.player);
      // else invalid kill
    })
  }

  finalizeKills() {
    this.$location.path('/death');
  }
  
  creditKill(player){
    this.ps.creditKill(player);
  }

}