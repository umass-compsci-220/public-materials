import { Statement, BinaryOperator, Expression } from "../include/parser.js";

/**
 * Exercise 1
 * Scoping
 */
export function printDecls(program: Statement[], level: number) {
  function doDecl(s: Statement, scope: { [key: string]: any }) {
    switch (s.kind) {
      case "let": {
        if (s.name in scope) {
          // or: scope.hasOwnProperty(name)
          console.log("duplicate declaration: " + s.name);
        } else {
          Object.defineProperty(scope, s.name, {}); // scope[s.name] = {}
        }
        return;
      }
      case "if":
        printDecls(s.truePart, level + 1);
        printDecls(s.falsePart, level + 1);
        return;
      case "while":
        printDecls(s.body, level + 1);
        return;
      default:
        return;
    }
  }

  const scope = {};
  program.forEach(s => doDecl(s, scope));
  const names = Object.getOwnPropertyNames(scope); // or Object.keys(scope);
  names.forEach(n => console.log(level.toString() + ": " + n));
}

/**
 * Exercise 2
 * Async & Interpreters
 */
type State = { [key: string]: boolean};
type AsyncExpression = { kind: "boolean"; value: boolean } | { kind: "variable"; name: string } | { kind: "operator"; operator: "&&" | "||"; left: AsyncExpression; right:AsyncExpression };

export function interpExpressionAsync(s: State, e: AsyncExpression): Promise<boolean>{
  switch(e.kind){
    case "boolean" : return Promise.resolve(e.value);
    case "variable" : return e.name in s ? Promise.resolve(s[e.name]): Promise.reject("undefined variable");
    case "operator" : return interpExpressionAsync(s, e.left).then( b1=>
                                              e.operator === "&&" ? b1 ? interpExpressionAsync(s, e.right) : false
                                                                  : b1 ? true : interpExpressionAsync(s, e.right));
  }
}

/**
 * Bonus Exercise
 * Type Inference
 */
type Type = string;
interface TypeMap {
  [key: string]: Type;
}
interface BinExp {
  operator: BinaryOperator;
  left: Expression;
  right: Expression;
}
const boolOp = (s: string) => s === "&&" || s === "||";
const cmpOp = (s: string) => s === "<" || s === ">";
const mathOp = (s: string) => s === "+" || s === "-" || s === "*" || s === "/";

const checkEq = (v: any, oldT: Type, newT: Type) => {
  if (newT !== "any" && oldT !== newT) {
    throw new Error(`type mismatch for ${v}: is ${oldT}, should be ${newT}`);
  }
};

export function typeCheck(e: Expression, expected: Type, env: TypeMap): Type {
  function checkBoth(e: BinExp, operandType: Type, resultType: Type) {
    typeCheck(e.left, operandType, env);
    typeCheck(e.right, operandType, env);
    checkEq(e.operator, resultType, expected);
    return resultType;
  }

  switch (e.kind) {
    case "boolean":
    case "number":
      checkEq(e.value, e.kind, expected);
      return e.kind;
    case "variable":
      if (!(e.name in env) || env[e.name] === "any") {
        env[e.name] = expected;
      }
      checkEq(e.name, env[e.name], expected);
      return env[e.name];
    case "operator": {
      if (boolOp(e.operator)) {
        return checkBoth(e, "boolean", "boolean");
      } else if (cmpOp(e.operator)) {
        return checkBoth(e, "number", "boolean");
      } else if (mathOp(e.operator)) {
        return checkBoth(e, "number", "number");
      } else if (e.operator === "===") {
        return checkBoth(e, "any", "boolean");
      } else {
        throw new Error(`Unsupported operator ${e.operator}`);
      }
    }
    default:
      return expected;
  }
}



// Alternate Solution for Exercise 1
export function printDecls2(program: Statement[]) {
  function printDeclsHelper(s: Statement, level: number): void {
    switch (s.kind) {
      case "let":
        if (level in scope && s.name in scope[level]) {
          console.log("duplicate declaration " + s.name);
        } else {
          level in scope ? scope[level].push(s.name) : (scope[level] = [s.name]);
        }
        break;
      case "if":
        s.truePart.forEach(s => printDeclsHelper(s, level + 1));
        s.falsePart.forEach(s => printDeclsHelper(s, level + 1));
        break;
      case "while":
        s.body.forEach(s => printDeclsHelper(s, level + 1));
        break;
      default:
        break;
    }
  }

  const scope: { [key: number]: string[] } = {};
  program.forEach(s => printDeclsHelper(s, 0));
  const names = Object.keys(scope).reverse();
  names.forEach((n: string) => scope[Number(n)].forEach(v => console.log(n + ": " + v)));
}
