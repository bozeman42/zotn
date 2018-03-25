import DedicatedScanner from '../modules/physscanner';
import WebcamScanner from '../modules/webcamscanner';
import scannerConfig, { DEDICATED_SCANNER, WEBCAM_SCANNER } from '../scanner.config';

export default class ScannerService {
  constructor($rootScope) {
    this.$inject = ['$scope'];
    this.$rootScope = $rootScope;
    this.scanner = null;
    this.validateAndParseJSON = this.validateAndParseJSON.bind(this);
    this.activateScanIndicator = this.activateScanIndicator.bind(this);
    this.scanLight = false;
  }


  // Callbacks should now expect JavaScript objects as arguments. Scanner input is
  // validated as JSON and parsed into JS objects before being passed to callbacks.
  start(callback, element = null) {
    const vm = this;
    const validatedCallback = vm.validateAndParseJSON(callback);
    if (scannerConfig.type === DEDICATED_SCANNER) {
      this.scanner = new DedicatedScanner(validatedCallback);
    } else if (scannerConfig.type === WEBCAM_SCANNER) {
      this.scanner = new WebcamScanner(validatedCallback, element);
    } else {
      console.error("Unknown scanner type. Please check scanner.config.js");
    }
    this.scanner.start();
    this.scanner.addListener('scan', this.activateScanIndicator);
  }

  activateScanIndicator(event) {
    const vm = this;
    let indicatorReset = () => {
      this.$rootScope.$apply(() => {
        this.scanLight = false;
      })
    }
    indicatorReset = indicatorReset.bind(vm);
    this.$rootScope.$apply(() => {
      this.scanLight = true;
    })
    this.scanLight;
    setTimeout(indicatorReset, 500);
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

  stop() {
    const vm = this;
    if (vm.scanner) {
      this.scanner.removeListener('scan', this.activateScanIndicator);
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
}