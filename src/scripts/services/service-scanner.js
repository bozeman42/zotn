import Instascan from 'instascan';

export default class ScannerService {
  constructor() {
    this.scanner = null;
  }

  startScanner(element, callback) {
    const vm = this;
    try {
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
    } catch (error) {
      console.log(error);
      setTimeout(()=> {
        vm.startScanner(element,callback);
      },500);
    }
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