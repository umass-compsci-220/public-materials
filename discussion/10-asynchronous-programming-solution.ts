import fetch from "../include/fetch";

export type ObjsWithName = { name: string; [key: string]: unknown };

export function getObjsWithName(urls: string[]): Promise<ObjsWithName[]> {
  return Promise.allSettled(urls.map((url: string) => fetch(url).then(res => res.json()))).then(resarr =>
    resarr
      .filter((resarr): resarr is PromiseFulfilledResult<(object | ObjsWithName)[]> => resarr.status === "fulfilled")
      .map(resarr => resarr["value"])
      .map(objarr => objarr.filter(obj => "name" in obj) as ObjsWithName[])
      .flat()
  );
}

// Lets try using our function!
const urls: string[] = [
  "https://api.github.com/users/umass-compsci-220/repos",
  "https://api.github.com/users/umass-cs-230/repos",
];

getObjsWithName(urls)
  .then(obs => obs.map(obj => obj["name"]))
  .then(console.log)
  .catch(console.log);

// Below is an alternate solution. We would do this instead if we cannot guarrantee that all our routes will
// return valid json, and that all of it is arrays

export function getObjsWithName2(urls: string[]): Promise<ObjsWithName[]> {
  return Promise.allSettled(
    urls.map((url: string) =>
      fetch(url)
        .then(res => (res.ok ? res.json() : Promise.reject(new Error(`Error: ${res.statusText}`)))) // Error would bubble though.
        .then(res => (Array.isArray(res) ? res : []) as (object | ObjsWithName)[])
    )
  ).then(resarr =>
    resarr
      .filter((resarr): resarr is PromiseFulfilledResult<(object | ObjsWithName)[]> => resarr.status === "fulfilled")
      .map(resarr => resarr["value"])
      .map(objarr => objarr.filter((obj: object) => "name" in obj) as ObjsWithName[])
      .flat()
  );
}

getObjsWithName2(urls)
  .then(obs => obs.map(obj => obj["name"]))
  .then(console.log)
  .catch(console.log);

// composeFunctionsAsync
export function composeFunctionsAsync<T>(asyncFuncArr: ((a: any) => Promise<any>)[]): (a: T) => Promise<any> {
  return (x: T) => {
    return asyncFuncArr.reduce(
      (acc: Promise<any>, f: (a: any) => Promise<any>) => acc.then((x: any) => f(x)),
      Promise.resolve(x) // initial value
    );
  };
}

const getjson = composeFunctionsAsync([
  fetch,
  (res: Response) => (res.ok ? res.json() : Promise.reject(`${res.status} : ${res.statusText}`)),
]);

/* test async function composition */
getjson("https://api.github.com/users/umass-cs-230/repos")
  .then(res => res[0]["owner"])
  .then(console.log)
  .catch(console.log);
