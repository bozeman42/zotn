export default class {
  constructor($location){
    this.$location = $location;
  }
  restart(){
    this.$location.path('/');
  }

  register() {
    this.$location.path('/register');
  }
}