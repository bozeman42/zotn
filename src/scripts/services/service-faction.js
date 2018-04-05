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
    .catch((error) => {
      console.log(error);
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

  getPlayerLanyards(id) {
    const vm = this;
    return this.$http.get('/faction/badges/:id')
    .then((response) => {
      console.log('badges', response.data)
      response.data.forEach(badge => {
        
      })

    })
  }

  attachPlayerToFactionLanyard(lanyardId,playerId) {
    console.log("Lanyard Id:",lanyardId,"PlayerId:",playerId);
    const data = {
      lanyardId: lanyardId,
      playerId: playerId
    }
    return this.$http.put('/faction/badges/attach',data)
  }

  detachPlayerFromFactionLanyard(lanyardId,playerId) {
    console.log("detaching Lanyard Id:",lanyardId," from PlayerId:",playerId);
    const data = {
      lanyardId: lanyardId,
      playerId: playerId
    }
    return this.$http.put('/faction/badges/detach',data)
    .catch((error) => {
      console.error('error attaching lanyard',error);
    })
  }
}

