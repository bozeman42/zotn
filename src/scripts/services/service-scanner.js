import Scanner from '../modules/physscanner';

export default class ScannerService {
  constructor() {
    this.scanner = null;
  }

  start(callback) {
    const vm = this;
    this.scanner = new Scanner(callback);
    this.scanner.start();
  }

  isJSON(str){
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
        .then(() => {
          this.scanner = null;
        })
        .catch((error) => {
          console.log('Scanner failed to stop.', error);
        });
    }
  }
}