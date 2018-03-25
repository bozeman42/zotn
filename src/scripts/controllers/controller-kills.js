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
    this.$routeParams = $routeParams;
    this.data = this.ps.data;
    this.startKillScanner = this.startKillScanner.bind(this);
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
          vm.message = "Invalid kill... please try again..."
          vm.resetScanner(vm.startKillScanner);
        }
      });
    })
  }

//   {"EntityType":"FactionLanyard","EntityId":13, "Level":1, "Faction":1}

  isValidKillScan(content) {
    return (content.EntityType === "FactionLanyard" && this.data.currentPlayer.isEnemyFaction(content.Faction))
  }

  processKilledLanyard(killBadge){
    this.fs.processKilledLanyard(killBadge);
  }
  
  processKill(killBadge){
    const vm = this;
    console.log('processing kill',killBadge)
    console.log('this',this);
    const kill = {
      killerId: this.data.currentPlayer.id,
      killed: killBadge
    }
    this.fs.processKilledLanyard(kill)
    .then(() => {
      vm.ps.getPlayer(vm.$routeParams.id)
      .then((player) => {
        vm.data.currentPlayer = player;
      });
      vm.resetScanner(vm.startKillScanner);
    })
  }

  finalizeKills() {
    this.ss.stop()
    .then(() => {
      this.$scope.$apply(() => {
        this.$location.path('/death');
      });
    })
  }
  
  creditKill(player){
    this.ps.creditKill(player);
  }

  resetScanner(callback) {
    const vm = this;
    setTimeout(() => {
      vm.$scope.$apply(() => {
        vm.message = 'Scan badge...';
        callback();
      })
    }, 2000);
  }

}