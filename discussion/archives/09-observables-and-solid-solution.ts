import { Observable } from "../include/observable.js";

// Should be "observable"
export class Economy extends Observable<number> {
  updateRate(rate: number): void {
    // Notify whoever cares about the economy
    this.update(rate);
  }
}

// Should observe Economy's rate, and be "observable"

export class Stock extends Observable<number> {
  name: string;
  base: number;
  price: number;

  constructor(name: string, base: number) {
    super();
    this.name = name;
    this.base = base;
    this.price = base;
  }

  updatePrice(rate: number): void {
    // Use formula `price = base * rate` to update price
    this.price = this.base * rate;
    this.update(this.price);
  }
}

// Make changes to Newscast for Exercise 2 only!
// Should observe and report Stock's price
export class Newscast extends Observable<[string, number]> {
  constructor() {
    super();
  }

  report(name: string, price: number): void {
    console.log(`Stock ${name} has price ${price}.`);
    this.update([name, price]);
  }

  observe(stocks: Stock[]): void {
    stocks.forEach(stock => stock.subscribe(price => this.report(stock.name, price)));
  }
}

const USEconomy = new Economy();
const stock = new Stock("GME", 5.0);
const news = new Newscast();

USEconomy.subscribe(rate => stock.updatePrice(rate));
stock.subscribe(price => news.report(stock.name, price));

USEconomy.updateRate(5); // “Stock GME has price 5.”
USEconomy.updateRate(1); // “Stock GME has price 1.”
