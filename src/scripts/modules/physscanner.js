import EventEmitter from 'events';

export default class DedicatedScanner extends EventEmitter {
  constructor(callback) {
    super();
    this.inputString = '';
    this.handleKeydownOnlyKeys = this.handleKeydownOnlyKeys.bind(this);
    this.detectRapidInput = this.detectRapidInput.bind(this);
    this.getScannerInput = this.getScannerInput.bind(this);
    this.callback = callback;
    this.timeoutHandler = null;
    this.result = '';
    this.count = 0;
  }

  start() {
    window.addEventListener('keydown', this.handleKeydownOnlyKeys);
    window.addEventListener('keypress', this.detectRapidInput);
    this.addListener('scan', this.callback);
  }

  stop() {
    return new Promise((resolve) => {
      try {
        window.removeEventListener('keydown', this.handleKeydownOnlyKeys);
        window.removeEventListener('keypress', this.detectRapidInput);
        this.removeListener('scan', this.callback)
        resolve("Stopped");
      } catch (error) {
        reject(error);
      }
    });
  }
  
  detectRapidInput(event) {
    event.preventDefault();
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
    }
    this.inputString += event.key;
    this.timeoutHandler = setTimeout(this.getScannerInput, 75);
  }

  getScannerInput() {
    if (this.inputString.length < 5) {
      this.inputString = '';
      return;
    }
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