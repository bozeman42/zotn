export default class Scanner {
  constructor(callback) {
    console.log('scanner constructed',callback);
    this.inputString = '';
    this.getScannerInput = this.getScannerInput.bind(this);
    this.callback = callback;
    this.timeoutHandler = null;
  }

  start() {
    console.log('started',this);
    window.addEventListener('keypress', this.detectRapidInput);
    window.addEventListener('scan',this.callback);
  }

  stop() {
    window.removeEventListener('keypress',this.detectRapidInput);
    window.removeEventListener('scan',this.callback);
  }

  getScannerInput() {
    console.log('timeout happening');
    if (this.inputString.length < 5) {
      console.log(`killed ${this.inputString}`)
      this.inputString = '';
      return;
    }
    console.log(this.inputString);
    dispatchEvent(new CustomEvent('scan', {value: this.inputString} ));
  }

  detectRapidInput(event) {
    console.log('keypress event');
    console.log(event.key);
    event.preventDefault();
      this.inputString += event.key;
      this.timeoutHandler = setTimeout(this.getScannerInput, 100);
  }
  
  killEvent(event) {
    event.preventDefault();
  }
}

