import { Observable, Observer } from "../include/observable.js";
import { classifyObservables } from "./observables.js";

const strObs1: Observable<string> = new Observable();
const strObs2: Observable<string> = new Observable();
const numObs1: Observable<number> = new Observable();
const numObs2: Observable<number> = new Observable();
const boolObs1: Observable<boolean> = new Observable();
const boolObs2: Observable<boolean> = new Observable();

let { string, number, boolean } = classifyObservables([strObs1, strObs2, numObs1, numObs2, boolObs1, boolObs2]);

string.subscribe(val => console.log(`STR: ${val}`));
number.subscribe(val => console.log(`NUM: ${val}`));
boolean.subscribe(val => console.log(`BOOL: ${val}`));

strObs1.update("Hello World");
numObs1.update(1);
boolObs1.update(true);
boolObs2.update(false);
numObs2.update(2);
strObs2.update("Bye.");
