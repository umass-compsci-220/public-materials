import assert from "assert";
import { Observable, Observer } from "../include/observable.js";
import {
  classifyObservables,
  obsStrCond,
  statefulObserver,
  mergeMax,
  merge,
  GreaterAvgObservable,
  SignChangeObservable,
  usingSignChange,
} from "./observables.js";