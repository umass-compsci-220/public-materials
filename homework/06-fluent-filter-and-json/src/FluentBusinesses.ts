import type { Business } from "../include/data.js";

export class FluentBusinesses {
  private data: Business[];

  constructor(data: Business[]) {
    this.data = data;
  }

  getData(): Business[] {
    return this.data;
  }

  fromCityInState(city: string, state: string): FluentBusinesses {
    return this;
  }

  hasStarsGeq(stars: number): FluentBusinesses {
    // TODO
    return this;
  }

  inCategory(category: string): FluentBusinesses {
    // TODO
    return this;
  }

  hasHoursOnDays(days: string[]): FluentBusinesses {
    // TODO
    return this;
  }

  hasAmbience(ambience: string): FluentBusinesses {
    // TODO
    return this;
  }

  bestPlace(): Business | undefined {
    // TODO
    return undefined;
  }

  mostReviews(): Business | undefined {
    // TODO
    return undefined;
  }
}
