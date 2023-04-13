import { createRandomData, loadYelpData } from "../include/data.js";
import { FluentBusinesses } from "./FluentBusinesses.js";

const yelp = loadYelpData();

// Find some great doctors in Santa Barbara, CA
const doctors = new FluentBusinesses(yelp)
  .inCategory("Doctors")
  .fromCityInState("Santa Barbara", "CA")
  .hasStarsGeq(4.5)
  .getData();

console.log("Great doctor in Santa Barbara, CA: " + doctors[0].name);

const greatRestaurant = new FluentBusinesses(yelp)
  .hasStarsGeq(5)
  .inCategory("Restaurants")
  .fromCityInState("Tampa", "FL")
  .mostReviews();

if (greatRestaurant !== undefined) console.log("Best restaurant in Tampa, FL: " + greatRestaurant.name);
else console.log(`No "best restaurant" found in Tampa FL`);

console.log(createRandomData(10));
