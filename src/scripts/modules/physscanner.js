

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
    window.addEventListener('keydown',this.handleKeydownOnlyKeys);
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
      window.dispatchEvent(new CustomEvent('scan',{detail: this.inputString}));
      this.inputString = '';
  }

  handleKeydownOnlyKeys(event) {
    if (event.key.length > 1 || event.key === ' ') {
      event.preventDefault();
    }
  }

  detectRapidInput(event) {
    event.preventDefault();
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
    }
    this.inputString += event.key;
    this.timeoutHandler = setTimeout(this.getScannerInput, 100);
  }

  killEvent(event) {
    event.preventDefault();
  }
}

