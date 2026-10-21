/**
 *  Exercise: Observer Pattern
 */

export interface Reader {
  // alert reader with news headline
  alert(headline: string): void;
}

export interface NewsOutlet {
  // add a Reader to the set of subscribers
  subscribe(reader: Reader): void;

  // remove a Reader from the set of subscribers
  unsubscribe(reader: Reader): void;
}

export class NewspaperApp implements NewsOutlet {
  private _subscribers: Set<Reader> = new Set<Reader>();
  private _techSubscribers: Set<Reader> = new Set<Reader>();

  // subscribe a Reader to the appropriate headline feed(s)
  subscribe(reader: Reader, techOptIn: boolean = false): void {
    this._subscribers.add(reader);
    if (techOptIn) {
      this._techSubscribers.add(reader);
    }
  }

  // unsubscribe a Reader from all headline feeds
  unsubscribe(reader: Reader): void {
    this._subscribers.delete(reader);
    this._techSubscribers.delete(reader);
  }

  // unsubscribe a Reader from the technology news headline feed
  unsubscribeFromTechNews(reader: Reader): void {
    this._techSubscribers.delete(reader);
  }

  // notify all subscribers of a breaking news headline
  private _notifyBreakingNews(headline: string): void {
    for (const reader of this._subscribers) {
      reader.alert(headline);
    }
  }

  // notify all opted-in subscribers of a technology news headline
  private _notifyTechNews(headline: string): void {
    for (const reader of this._techSubscribers) {
      reader.alert(headline);
    }
  }

  // create a new headline in a given category
  newHeadline(headline: string, category: string): void {
    switch (category) {
      case "breaking":
        this._notifyBreakingNews(headline);
        break;
      case "technology":
        this._notifyTechNews(headline);
        break;
      default:
        console.log(`Unknown headline category`);
    }
  }
}

// Example usage

class CasualReader implements Reader {
  constructor(public name: string) { }

  alert(headline: string): void {
    console.log(`${this.name} will read "${headline}" for fun`);
  }
}

class MarketAnalyst implements Reader {
  static getNextID: () => number = (() => {
    let id = 1;
    return () => id++;
  })();

  public id: number = MarketAnalyst.getNextID();

  alert(headline: string): void {
    console.log(`Market Analyst ${this.id} will analyze "${headline}" for economic implications`);
  }
}

// Create a news outlet
const CICSNews = new NewspaperApp();

// Create readers
const alice = new CasualReader("Alice");
const bob = new CasualReader("Bob");
const ma1 = new MarketAnalyst();
const ma2 = new MarketAnalyst();

// Subscribe readers to the news outlet
CICSNews.subscribe(alice, true);      // Alice opts in for technology news
CICSNews.subscribe(bob, false);       // Bob does not opt in for technology news
CICSNews.subscribe(ma1, true);        // Market Analyst 1 opts in for technology news
CICSNews.subscribe(ma2, true);        // Market Analyst 2 opts in for technology news

// Notify subscribers of technology news
CICSNews.newHeadline("Tech News: Robot Dog Learns New Trick", "technology");
console.log("");

// Unsubscribe Market Analyst 1 from the news outlet
CICSNews.unsubscribe(ma1);
console.log("Market Analyst 1 has unsubscribed from the news outlet.\n");

// Notify subscribers of breaking news
CICSNews.newHeadline(
  "Breaking News: Snack Overflow Runs Out of Egg & Cheese Croissants",
  "breaking"
);
console.log("");

// Unsubscribe Alice from technology news
CICSNews.unsubscribeFromTechNews(alice);
console.log("Alice has unsubscribed from technology news.\n");

// Notify subscribers of another technology news headline
CICSNews.newHeadline(
  "Tech News: Alice Unsubscribes from Technology News, So She Won't See This Headline :P",
  "technology"
);