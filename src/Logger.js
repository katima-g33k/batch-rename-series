export default class Logger {
  constructor(name = '') {
    this.name = name;
    this.console = console;
  }

  error(...args) {
    this.console.error(this.name, ...args);
  }

  info(...args) {
    this.console.log(this.name, ...args);
  }

  log(...args) {
    this.console.log(this.name, ...args);
  }
}
