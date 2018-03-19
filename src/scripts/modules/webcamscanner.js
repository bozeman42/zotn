import Instascan from 'instascan';

export default class Scanner {
  constructor(callback, element = null) {
    this.scanner = null;
    this.callback = callback;
    this.element = element;
    this.state.active = false;
  }

  start() {
    let vm = this;
    let options = {
      scanPeriod: 60,
      video: vm.element ? document.getElementById(vm.element) : null
    }
    vm.scanner = new Instascan.Scanner(options);
    vm.scanner.addListener('scan', vm.callback);
    Instascan.Camera.getCameras()
      .then(function (cameras) {
        if (cameras.length > 0) {
          this.state.active = true;
          vm.scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (error) {
        console.error(error);
      });
  }

  stop() {
    if (this.scanner) {
      return this.scanner.stop()
        .then(() => {
          this.state.active = false;
          this.scanner = null;
        })
        .catch((error) => {
          console.log('Scanner failed to stop.', error);
        });
    }
  }
}