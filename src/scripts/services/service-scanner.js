import DedicatedScanner from '../modules/physscanner';
import WebcamScanner from '../modules/webcamscanner';
import scannerConfig, {DEDICATED_SCANNER, WEBCAM_SCANNER} from '../scanner.config';

export default class ScannerService {
  constructor() {
    this.scanner = null;
  }

  start(callback,element = null) {
    const vm = this;
    if (scannerConfig.type === DEDICATED_SCANNER){
      this.scanner = new DedicatedScanner(callback);
    } else if (scannerConfig.type === WEBCAM_SCANNER){
      this.scanner = new WebcamScanner(callback,element);
    } else {
      console.error("Unknown scanner type. Please check scanner.config.js");
    }
    this.scanner.start();
  }

  isJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
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