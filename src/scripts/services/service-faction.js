import { ZOMBIE, HUNTER} from '../constants/factions';

export default class FactionService {
  constructor($http){
    this.$inject = ['$http'];
    this.$http = $http;
    this.data = {
      badges: {
        zombie: {
          all: {},
          assigned: {},
          unassigned: {},
        },
        hunter: {
          all: {},
          assigned: {},
          unassigned: {},
        }
      }

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
      console.log(response);
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
      console.log(response);
      const badges = response.data;
      vm.sortFactionBadges(badges);
      console.log(vm.data.badges);
    })
  }

  sortFactionBadges(badges){
    const vm = this;
    badges.forEach((badge) => {
      const { id, faction_id, player_id } = badge;
      console.log(badge);
      console.log(id,faction_id,player_id);
      vm.data.badges[id] = badge;
      if (faction_id === ZOMBIE){
        vm.data.badges.zombie.all[id] = badge;
        if (player_id === null) {
          vm.data.badges.zombie.unassigned[id] = badge;
        } else {
          vm.data.badges.zombie.assigned[id] = badge;
        }
      } else if (faction_id === HUNTER) {
        vm.data.badges.hunter.all[id] = badge;
        if (player_id === null) {
          vm.data.badges.hunter.unassigned[id] = badge;
        } else {
          vm.data.badges.hunter.assigned[id] = badge;
        }
      }
    })
  }

  sortFactionBadgesByLevel(container){
    container.level = {};

  }
}

