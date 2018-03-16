import Instascan from 'instascan';

export default class Scanner extends Instascan.Scanner {
  constructor(callback, element = null){
    super({
      scanPeriod: 60,
      video: element?document.getElementById(element):null
    })
    this.addListener('scan',callback);
    Instascan.Camera.getCameras()
    .then(function(cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function(error) {
      console.error(error);
    });
  }
}