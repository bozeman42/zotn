import { ZOMBIE, HUNTER} from '../constants/factions';

export default class FactionService {
  constructor($http){
    this.$inject = ['$http'];
    this.$http = $http;
    this.data = {
      badges: {}
    };
  }
  processKilledLanyard(badge){
    return this.$http.put('/faction/killed',badge)
    .then((response) => {
      console.log('killed:',response);
    })
  }

  getUnassignedFactionBadges(){
    const vm = this;
    return this.$http.get('/faction/badges/unassigned')
    .then((response) => {
      const badges = response.data;
      badges.forEach((badge) => {
        vm.data.badges.unassigned[badge.id] = badge;
      })
      console.log(vm.data.badges);
    })
  }

  getFactionBadges(){
    const vm = this;
    return this.$http.get('/faction/badges/')
    .then((response) => {
      const badges = response.data;
      badges.forEach((badge) => {
        vm.data.badges[badge.id] = badge;
      });
      return vm.data.badges;
    })
  }

  attachPlayerToFactionLanyard(lanyardId,playerId) {
    console.log("Lanyard Id:",lanyardId,"PlayerId:",playerId);
    return this.$http()
  }
}

