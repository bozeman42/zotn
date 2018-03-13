export default class Scanner {
  constructor(callback) {
    console.log('scanner constructed', callback);
    this.inputString = '';
    this.getScannerInput = this.getScannerInput.bind(this);
    this.detectRapidInput = this.detectRapidInput.bind(this);
    this.callback = callback;
    this.timeoutHandler = null;
    this.result = '';
    this.count = 0;
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
    if (this.inputString.length < 5) {
      console.log(`killed ${this.inputString}`)
      this.inputString = '';
      return;
    }
    console.log(this.count++)
    this.timeoutHandler = null;
    if (this.inputString[this.inputString.length - 1] === '}'){
      window.dispatchEvent(new CustomEvent('scan',{detail: this.inputString}));
      this.inputString = '';
    }
  }

  detectRapidInput(event) {
    event.preventDefault();
    this.inputString += event.key;
    this.timeoutHandler = setTimeout(this.getScannerInput, 200);
  }

  killEvent(event) {
    event.preventDefault();
  }
}

