import Instascan from 'instascan';

function scanner(element, callback) {
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
  return scanner;
}



export default scanner;