import DedicatedScanner from '../modules/physscanner';
import WebcamScanner from '../modules/webcamscanner';
import scannerConfig, { DEDICATED_SCANNER, WEBCAM_SCANNER } from '../scanner.config';
import commonEmitter from '../modules/common-emitter';

export default class ScannerService {
  constructor($rootScope,$timeout) {
    this.$inject = ['$scope','$timeout'];
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.scanner = null;
    this.validateAndParseJSON = this.validateAndParseJSON.bind(this);
    this.scanLight = false;
  }


  // Callbacks should now expect JavaScript objects as arguments. Scanner input is
  // validated as JSON and parsed into JS objects before being passed to callbacks.
  start(callback, element = null) {
    const vm = this;
    commonEmitter.emit('scanner-started');
    const validatedCallback = vm.validateAndParseJSON(callback);
    if (scannerConfig.type === DEDICATED_SCANNER) {
      this.scanner = new DedicatedScanner(validatedCallback);
    } else if (scannerConfig.type === WEBCAM_SCANNER) {
      this.scanner = new WebcamScanner(validatedCallback, element);
    } else {
      console.error("Unknown scanner type. Please check scanner.config.js");
    }
    this.scanner.start();
    this.scanner.addListener('scan', this.dispatchScan);
  }

  // accept a callback function and return a function that verifies that the input is JSON
  // and parses it into an object before calling the callback with that data.
  validateAndParseJSON(callback) {
    const vm = this;
    return function (content) {
      if (vm.isJSON(content)) {
        callback(JSON.parse(content));
      }
    }
  }

  isJSON(str) {
    console.log(str);
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  reset(timeout) {
    const vm = this;
    console.log(vm.scanner);
    if (vm.scanner) {
      vm.scanner.stop();
      return this.$timeout(() => {
        vm.scanner.start();
      },timeout,true);
    }
  }

  stop() {
    const vm = this;
    if (vm.scanner) {
      commonEmitter.emit('scanning-stopped')
      vm.scanner.removeAllListeners();
      return vm.scanner.stop()
        .then(() => {
          vm.scanner = null;
        })
        .catch((error) => {
          alert('Failed to stop', error);
        });
    } else {
      return Promise.resolve(true);
    }
  }

  dispatchScan(content){
    console.log('dispatching scan');
    commonEmitter.emit('scan',content);
  }
}