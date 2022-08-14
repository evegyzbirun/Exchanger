import Exchanger from "./exchanger.js";

export default class App {

  constructor(usd) {
    this.usd = usd;
    this.result = 0;
  }


  async makeExchange(target_code) {
    let askCurrency = await Exchanger.getCurrency(target_code);
    let rateCurrency = askCurrency.conversion_rate;
    this.result = this.usd * rateCurrency;
    return this.result;
  }
}