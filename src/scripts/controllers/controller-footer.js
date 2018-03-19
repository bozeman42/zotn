export default class {
  constructor($location,ScannerService){
    this.$inject = ['$location', 'ScannerService'];
    this.$location = $location;
    this.ss = ScannerService;
    
  }

  restart(){
    if (this.$location.path() !== '/'){
      this.ss.stop();
    }
    this.$location.path('/');
  }

  register() {
    if (this.$location.path() !== '/register'){
      this.ss.stop();
    }
    this.$location.path('/register');
  }
}