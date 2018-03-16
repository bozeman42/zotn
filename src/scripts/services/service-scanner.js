import Scanner from '../modules/physscanner';
import WebcamScanner from '../modules/webcamscanner';

export default class ScannerService {
  constructor() {
    this.scanner = null;
  }

  start(callback) {
    const vm = this;
    this.scanner = new WebcamScanner(callback);
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
    if (this.scanner) {
      this.scanner.stop()
      this.scanner = null;
    }
  }
}