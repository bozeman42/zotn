import DedicatedScanner from '../modules/physscanner';
import WebcamScanner from '../modules/webcamscanner';
import scannerConfig, {DEDICATED_SCANNER, WEBCAM_SCANNER} from '../scanner.config';

export default class ScannerService {
  constructor() {
    this.scanner = null;
    this.validateJSON = this.validateJSON.bind(this);
  }

  start(callback,element = null) {
    const vm = this;
    const validatedCallback = vm.validateJSON(callback);
    if (scannerConfig.type === DEDICATED_SCANNER){
      this.scanner = new DedicatedScanner(validatedCallback);
    } else if (scannerConfig.type === WEBCAM_SCANNER){
      this.scanner = new WebcamScanner(validatedCallback,element);
    } else {
      console.error("Unknown scanner type. Please check scanner.config.js");
    }
    this.scanner.start();
  }

  validateJSON(callback){
    const vm = this;
    return function(content){
      if(vm.isJSON(content)){
        callback(content);
      }
    }
  }

  isJSON(str) {
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
      return vm.scanner.stop()
      .then(() => {
        vm.scanner = null;
      })
      .catch((error) => {
        alert('Failed to stop',error);
      });
    }
  }
}