export default class {
  constructor($location,$scope,ScannerService){
    this.$inject = ['$location', '$scope','ScannerService'];
    this.$scope = $scope;
    this.$location = $location;
    this.ss = ScannerService;
    
  }

  restart(){
    if (this.$location.path() !== '/'){
      this.ss.stop()
      .then(() => {
        this.$scope.$apply(() => {
          this.$location.path('/');
        });
      });
    }
  }

  register() {
    if (this.$location.path() !== '/register'){
      this.ss.stop()
      .then(() =>  {
        this.$scope.$apply(() => {
          this.$location.path('/register')
        });
      });
    }
  }
}