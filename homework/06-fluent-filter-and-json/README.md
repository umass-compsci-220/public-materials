# Fluent Filter and JSON

- Please download the project [here](../archives/06-fluent-filter-and-json.zip)

## Overview

During this project, you will implement a _fluent filter_ for a list of businesses. You will be given a large set of business data and you are tasked with implementing a class that will filter the data on various conditions.

### Learning Objectives

- Practice writing class-based TypeScript
- Learn about JavaScript Object Notation (JSON)

### Student Expectations

Students will be graded on their ability to:

- Correctly implement the functions [specified below](#programming-tasks)
- Resolve all linter warnings
- Follow the [coding](../../guidelines/CODING.md), [bad practice](../../guidelines/BAD_PRACTICES.md) and [testing](../../guidelines/TESTING.md) guidelines
- Design full-coverage [unit-tests](#testing) for the methods they implement

## Testing

You must write tests for all your functions, following the principles used so far.

## Getting Started

### JSON

JavaScript Object Notation (JSON) is a syntax for representing JavaScript objects, arrays, numbers, strings, booleans, and `null` as a complete (single) string. With this format, we can store runtime data on the disk or send it over a network.

Below is a JavaScript object,

```js
const sandwichOrders = {
  orders: [
    {
      orderId: 1234,
      sandwiches: [
        {
          bread: "whole wheat",
          vegetables: ["lettuce", "onion", "tomato", "hot peppers"],
          meat: ["prosciutto", "salami"],
          cheese: ["provolone"],
          condiments: ["mayonnaise", "vinegar"],
          isToasted: false,
        },
        {
          bread: "white",
          vegetables: null,
          meat: ["bologna"],
          cheese: null,
          condiments: null,
          isToasted: false,
        },
      ],
      total: 13.4,
    },
  ],
};
```

and its JSON representation:

```js
const str = JSON.stringify(sandwichOrders);
console.log(str);
// {"orders":[{"orderId":1234,"sandwiches":[{"bread":"whole wheat","vegetables":["lettuce","onion","tomato","hot peppers"],"meat":["prosciutto","salami"],"cheese":["provolone"],"condiments":["mayonnaise","vinegar"],"isToasted":false},{"bread":"white","vegetables":null,"meat":["bologna"],"cheese":null,"condiments":null,"isToasted":false}],"total":13.4}]}
```

We used the `JSON.stringify` function to convert our object into a string. All fields and values were placed into this string in a format that is readable:

```jsonc
{
  "orders": [
    {
      "orderId": 1234,
      "sandwiches": [
        {
          "bread": "whole wheat",
          "vegetables": ["lettuce", "onion", "tomato", "hot peppers"],
          "meat": ["prosciutto", "salami"],
          "cheese": ["provolone"],
          "condiments": ["mayonnaise", "vinegar"],
          "isToasted": false
        },
        {
          "bread": "white",
          "vegetables": null,
          "meat": ["bologna"],
          "cheese": null,
          "condiments": null,
          "isToasted": false
        }
      ],
      "total": 13.4
    }
  ]
}
```

Notice how all fields have been surrounded by double quotes. The quotes can be dropped in JS/TS - but JSON format indicates that fields are surrounded with double quotes. We can then transform this string back into an object using the `JSON.parse` function:

```js
// JSON.parse(s: string): any
const other = JSON.parse(str);
console.log(other); // { orders: [Object] }
// `other` is an entirely different object than `obj`
```

### Type Safety with JSON

The return type of `JSON.parse` is `any`. The `any` type is a special type that allows _any_ operation to occur on it - without a compiler error.

```ts
const obj = JSON.parse("{}");

// No error
const y = obj.x + 1;
```

As you can see, behavior is dangerous. `obj.x` clearly is not a value and we are attempting to do arithmetic with it. If you run this code you will get `NaN`, which is a special number value short for Not-A-Number. Yet the compiler does not warn us that `obj.x` is possibly `undefined`.

To aid the compiler and enable type safety, we need to construct a type that dictates what the result of `JSON.parse` may be. In this project, you will interacting with `Business` objects, typed as so:

```ts
interface BusinessAttributes {
  Ambience?: Record<string, boolean>;
}

export interface Business {
  business_id: string;
  name?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  stars?: number;
  review_count?: number;
  attributes?: BusinessAttributes;
  categories?: string[];
  hours?: Record<string, string>;
}
```

Notice how each field ends with a `?`. This means that the field _may or may not_ be present inside the object. It is similar to writing the field as `business_id: string | undefined`. However, make note that we are assuming that as long as the fields are present the types are as expected.

The `Record<T, U>` type, see documentation [here](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type), is an object type that has keys of type `T`, which map to values of type `U`. A `Record` is just an object, so we can do normal object operations on it, such as checking if a `string` value exists inside the record:

```ts
const b: Business = {
  /* ... */
};
const hasMondaySchedule = b.hours !== undefined && "Monday" in b.hours;

const dayOfTheWeek = "Wednesday";
const hasWednesdaySchedule = b.hours !== undefined && dayOfTheWeek in b.hours;
```

To ensure that a field is safe to work with, we should check to make sure it is not undefined:

```ts
if (b.stars !== undefined) {
  // OK
}
```

Why wouldn't we just use something shorter? Like:

```ts
if (b.stars) {
  // OK... but missing something
}
```

Careful! `0` is a [falsy value](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) in JavaScript. Which means that the above if-statement protects us from undefined, but does not allow the value `0` to pass through.

### Avoiding Code Duplication

You may need to write helper functions/methods that take in a key of a `Business` as a parameter. That type is `keyof Business`. You can construct a function that takes in a `Business`, a key of a `Business`, and an operation that works on that field. Example:

```ts
// keyof Business is the type `business_id | name | city | ... | hours`
// K is generic for this function, but must be one of `keyof Business`
// Business[K] is the type of the value at the key K
function doWorkOnField<K extends keyof Business>(b: Business, key: K, f: (x: Business[K]) => void): void {
  f(b[key]);
}

// Works, compiler will assume that x is `string | undefined`
doWork(b, "city", x => console.log(`The city is ${x}!`));

// Complier error, "dog" is not a field on a Business
doWork(b, "dog", x => console.log(`I love dogs!`));
```

This syntax may be useful in constructing your own helper functions/methods.

### The Yelp Dataset

The business review site Yelp releases a large dataset of businesses in a JSON format. In this assignment, you will use this dataset to answer vital questions such as _“What is the most popular business in California?"_

Each entry in the dataset JSON object, and looks something like this:

```json
[
  {
    "business_id": "Pns2l4eNsfO8kk83dixA6A",
    "name": "Abby Rappoport, LAC, CMQ",
    "address": "1616 Chapala St, Ste 2",
    "city": "Santa Barbara",
    "state": "CA",
    "postal_code": "93101",
    "latitude": 34.4266787,
    "longitude": -119.7111968,
    "stars": 5.0,
    "review_count": 7,
    "is_open": 0,
    "categories": [
      "Doctors",
      "Traditional Chinese Medicine",
      "Naturopathic/Holistic",
      "Acupuncture",
      "Health & Medical",
      "Nutritionists"
    ]
  },
  {
    "business_id": "mpf3x-BjTdTEA3yCZrAYPw",
    "name": "The UPS Store",
    "address": "87 Grasso Plaza Shopping Center",
    "city": "Affton",
    "state": "MO",
    "postal_code": "63123",
    "latitude": 38.551126,
    "longitude": -90.335695,
    "stars": 3.0,
    "review_count": 15,
    "is_open": 1,
    "attributes": { "BusinessAcceptsCreditCards": true },
    "categories": ["Shipping Centers", "Local Services", "Notaries", "Mailbox Centers", "Printing Services"],
    "hours": {
      "Monday": "0:0-0:0",
      "Tuesday": "8:0-18:30",
      "Wednesday": "8:0-18:30",
      "Thursday": "8:0-18:30",
      "Friday": "8:0-18:30",
      "Saturday": "8:0-14:0"
    }
  }
  // ...thousands of other entries
]
```

Notice how unorganized and "dirty" the data is. As examples,

- the `attributes` field is absent in the first object, but present with data in the second
- the `hours` field is absent in the first object, but present with data in the second

With thousands of other data entries, it is not hard to imagine there are dozens of other abnormalities in the data.

Provided to you is a version of the Yelp dataset, you may load it memory by using the `loadYelpData()` function (see the examples in `./src/main.ts`). There are other functions implemented inside of `./include/data.ts` that could be useful. Such as creating randomized Businesses with `loadRandomBusinesses(n: number)`, or creating a dataset with a name, but reusing results from previous runs (`loadOrCreate(datasetName: string, createDataset: () => Business[])`).

Examine the results of these two functions - look at the fields on each entry and the types they typically hold.

## Programming Tasks

Create and implement the following methods in the `FluentBusinesses` class (in `./src/FluentBusinesses.ts`).

**You may not:**

- Use any `for`, `while`, `do-while`, or `.forEach(...)` loops
- Use duplicate code across numerous methods (you will need to define a helper methods)
- Assume anything about the structure of an object in the data set (fields may, or may not, be present)

### `fromCityInState`

Implement the following method:

```ts
fromCityInState(city: string, state: string): FluentBusinesses {
  // TODO
}
```

It takes two strings, `city` and `state`, and returns a new `FluentBusinesses` object in which all businesses are located in the given `city` and `state`.

Use the `city` and `state` fields.

### `hasStarsGeq`

Implement the following method:

```ts
hasStarsGeq(stars: number): FluentBusinesses {
  // TODO
}
```

It takes a number, `stars`, and returns a new `FluentBusinesses` object that holds businesses with star ratings that are greater than or equal to `stars`.

Use the `stars` field.

### `inCategory`

Implement the following method:

```ts
inCategory(category: string): FluentBusinesses {
  // TODO
}
```

It takes a string, `category`, and produces a new `FluentBusinesses` object that holds only those businesses that have the provided category, `category`.

Use the `categories` field.

### `isOpenOnDays`

Implement the following method:

```ts
hasHoursOnDays(days: string[]): FluentBusinesses {
  // TODO
}
```

It takes in an array of strings, `days`, and produces a new `FluentBusinesses` object that holds only those businesses that have hours during all of those days. You do not need to check if those hours are anything valid.

Use the `hours` field.

### `hasAmbience`

Implement the following method:

```ts
hasAmbience(ambience: string): FluentBusinesses
```

It takes a string, `ambience`, and produces a new `FluentBusinesses` object with businesses that have the provided ambience, `ambience`. A given business has an ambience if the field is present **and** the value is `true`.

Use the `Ambience` field of object in the `attributes` field.

### `bestPlace`

Implement the following method:

```ts
bestPlace(): Business | undefined {
  // TODO
}
```

It returns the “best” business. The “best” business has the highest star rating. If there is a tie, pick the one with the most reviews. If there’s a tie with the most reviews, pick the first business. **If there is no matching result, it should return an empty `undefined`.**

Use the `stars` and `review_count` fields.

### `mostReviews`

Implement the following method:

```ts
mostReviews(): Business | undefined {
  // TODO
}
```

It returns the "most reviewed" business. If there is a tie, pick the one with the most stars. If there is still a tie, pick the first business. **If there is no matching result, it should return `undefined`.**

Use the `stars` and `review_count` fields.
