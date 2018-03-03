import Instascan from 'instascan';

export default class ScannerService {
  constructor() {
    this.scanner = null;
  }

  startScanner(element, callback) {
    const options = {
      scanPeriod: 60
    }
    if (element) {
      options.video = document.getElementById(element)
    }
    let scanner = new Instascan.Scanner(options)
    scanner.addListener('scan', callback);
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function (e) {
      console.error(e);
    });
    this.scanner = scanner;
  }

  stop() {
    if (this.scanner) {
      this.scanner.stop()
        .then(() => {
          console.log('Scanner stopped.',this.scanner);
          this.scanner = null;
          console.log('scanner destroyed',this.scanner);
        })
        .catch((error) => {
          console.log('Scanner failed to stop.', error);
        });
    }
  }
}