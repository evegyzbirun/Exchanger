import Exchanger from "./exchanger.js";

export default class App {

  constructor(usd) {
    this.usd = usd;
    this.rate = 0;
    this.result = 0;
  }
  // this.usd * this.rate(which we reqest from API)
  initiateBalance() {
    this.result = this.usd * this.rate;
    return this.result;
  }
}