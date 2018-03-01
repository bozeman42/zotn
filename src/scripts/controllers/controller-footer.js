export default class {
  constructor($location){
    this.$location = $location;
  }
  restart(){
    this.$location.path('/');
  }
}