import Instascan from 'instascan';
import { EventEmitter } from 'events';


export default class Scanner extends EventEmitter {
  constructor(callback, element = null) {
    super();
    this.scanner = null;
    this.callback = callback;
    this.element = element;
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
          vm.scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (error) {
        console.error(error);
      });
  }

  stop() {
    const vm = this;
    if (this.scanner) {
      return this.scanner.stop()
        .then(() => {
          vm.scanner = null;
        })
        .catch((error) => {
          console.log('Scanner failed to stop.', error);
        });
    }
  }
}