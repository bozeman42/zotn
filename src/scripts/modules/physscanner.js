import EventEmitter from 'events';

export default class DedicatedScanner extends EventEmitter {
  constructor(callback) {
    super();
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
    this.addListener('scan', this.callback);
  }

  stop() {
    console.log('stop called');
    window.removeEventListener('keypress', this.detectRapidInput);
    this.removeListener('scan', this.callback)
  }
  
  detectRapidInput(event) {
    event.preventDefault();
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
    }
    this.inputString += event.key;
    this.timeoutHandler = setTimeout(this.getScannerInput, 100);
  }

  getScannerInput() {
    if (this.inputString.length < 5) {
      console.log(`killed ${this.inputString}`)
      this.inputString = '';
      return;
    }
      console.log('trying to emit event');
      this.emit('scan',this.inputString);
      this.inputString = '';
  }

  handleKeydownOnlyKeys(event) {
    if (event.key.length > 1 || event.key === ' ') {
      event.preventDefault();
    }
  }

  killEvent(event) {
    event.preventDefault();
  }
}

