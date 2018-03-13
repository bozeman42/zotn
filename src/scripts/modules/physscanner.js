export default class Scanner {
  constructor(callback) {
    console.log('scanner constructed', callback);
    this.inputString = '';
    this.getScannerInput = this.getScannerInput.bind(this);
    this.detectRapidInput = this.detectRapidInput.bind(this);
    this.callback = callback;
    this.timeoutHandler = null;
  }

  start() {
    console.log('started', this);
    window.addEventListener('keypress', this.detectRapidInput);
    window.addEventListener('scan', this.callback);
  }

  stop() {
    console.log('stop called');
    window.removeEventListener('keypress', this.detectRapidInput);
    window.removeEventListener('scan', this.callback);
  }

  getScannerInput() {
    console.log('timeout happening');
    console.log(this.inputString.length);
    if (this.inputString.length < 5) {
      console.log(`killed ${this.inputString}`)
      this.inputString = '';
      return;
    }
    window.dispatchEvent(new CustomEvent('scan',{content: this.inputString}));
  }

  detectRapidInput(event) {
    event.preventDefault();
    this.inputString += event.key;
    console.log(this.inputString);
    this.timeoutHandler = setTimeout(this.getScannerInput, 100);
  }

  killEvent(event) {
    event.preventDefault();
  }
}

