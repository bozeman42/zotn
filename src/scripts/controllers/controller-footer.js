import commonEmitter from '../modules/common-emitter';

export default class {
  constructor($location,$scope,ScannerService){
    this.$inject = ['$location', '$scope','ScannerService'];
    this.$scope = $scope;
    this.$location = $location;
    this.ss = ScannerService;
    this.goodScanLight = false;
    this.scanLight
    this.handleScan = this.handleScan.bind(this);
    this.handleBadScan = this.handleBadScan.bind(this);
    commonEmitter.addListener('scan',this.handleScan)
    commonEmitter.addListener('good-scan',this.handleScan)
    commonEmitter.addListener('bad-scan',this.handleBadScan)
  }

  handleScan(){
    this.goodScanLight = true;
    setTimeout(() => {
      this.$scope.$apply(() => {
        this.goodScanLight = false;
      })
    }, 750);
  }

  handleBadScan(){
    this.badScanLight = true;
    setTimeout(() => {
      this.$scope.$apply(() => {
        this.badScanLight = false;
      })
    }, 750);
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