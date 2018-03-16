import { HUNTER, ZOMBIE } from '../constants/factions';

export default class KillController {
  constructor($location,$routeParams, $scope,PlayerService,ScannerService,FactionService){
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
    PlayerService.getPlayers()
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
      vm.$scope.$apply(() => {
        if (vm.killScanSuccessful(killBadge)) {
          vm.ss.stop();
          vm.processKill(killBadge);
        } else {
          vm.ss.stop()
          vm.resetScanner();
        }
      });
    })
  }


  killScanSuccessful(content) {
    const vm = this;
    const {  } = vm;
    let { badge, message, ss: {isJSON} } = vm;
    let result = false;
    if (!isJSON(content)) {
      vm.message = 'Invalid data format. Please have team check badge...';
      result = false;
    } else {
      badge = JSON.parse(content);
      // getLanyard(badge);
      // if (!vm.isBadgeValid(badge)) {
      //   vm.message = "Please scan a valid player badge.";
      //   result = false;
      // } else if (!vm.playerExists(badge)) {
      //   vm.message = "This badge is not associated with a player account.";
      //   result = false;
      // } else {
      //   vm.setCurrentPlayer(badge);
      //   chime.play();
      //   // const welcome = new SpeechSynthesisUtterance(`Hello, ${this.data.currentPlayer.nickname}. Identity confirmed.`)
      //   // speechSynthesis.speak(welcome);
        result = true;
      // }
    }
    return result;
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