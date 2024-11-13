import fetch from "../include/fetch";

export function getObjsWithName(urls) {
  return Promise.allSettled(urls.map(url => fetch(url).then(res => res.json()))).then(resarr =>
    resarr
      .filter(resarr => resarr.status === "fulfilled")
      .map(resarr => resarr["value"])
      .map(objarr => objarr.filter(obj => "name" in obj))
      .flat()
  );
}

// Lets try using our function!
const urls = [
  "https://api.github.com/users/umass-compsci-220/repos",
  "https://api.github.com/users/umass-cs-230/repos",
];

getObjsWithName(urls)
  .then(obs => obs.map(obj => obj["name"]))
  .then(console.log)
  .catch(console.log);

// Below is an alternate solution. We would do this instead if we cannot guarrantee that all our routes will
// return valid json, and that all of it is arrays

export function getObjsWithName2(urls) {
  return Promise.allSettled(
    urls.map(url =>
      fetch(url)
        .then(res => (res.ok ? res.json() : Promise.reject(new Error(`Error: ${res.statusText}`)))) // Error would bubble though.
        .then(res => (Array.isArray(res) ? res : []))
    )
  ).then(resarr =>
    resarr
      .filter(resarr => resarr.status === "fulfilled")
      .map(resarr => resarr["value"])
      .map(objarr => objarr.filter(obj => "name" in obj))
      .flat()
  );
}

getObjsWithName2(urls)
  .then(obs => obs.map(obj => obj["name"]))
  .then(console.log)
  .catch(console.log);

// composeFunctionsAsync
export function composeFunctionsAsync(asyncFuncArr) {
  return x => {
    return asyncFuncArr.reduce(
      (acc, f) => acc.then(x => f(x)),
      Promise.resolve(x) // initial value
    );
  };
}

const getjson = composeFunctionsAsync([
  fetch,
  res => (res.ok ? res.json() : Promise.reject(`${res.status} : ${res.statusText}`)),
]);

/* test async function composition */
getjson("https://api.github.com/users/umass-cs-230/repos")
  .then(res => res[0]["owner"])
  .then(console.log)
  .catch(console.log);
