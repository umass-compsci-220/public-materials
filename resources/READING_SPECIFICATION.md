# Reading Spcefication

## Common Questions

**Can I use language feature F?**

- If F is a built-in feature of JavaScript/TypeScript then you may use it, unless otherwise specifed ("Use _function name_", "Do not use loops")
- You may not use any packages other than the ones listed in `package.json`

**Can I assume that the input has property P?**

- You may assume that input is of the valid type (we would get a compiler error otherwise) nothing else, unless specified ("Assumed to be", "You may assume")
- Objects cannot be `null` or `undefined` unless the type permits it (see [this example](https://www.typescriptlang.org/play?#code/MYGwhgzhAECyCeBhcVoG8BQGC+WBmArgHbAAuAlgPZHR6UBOARuQCYByBIIAgkSwKp8ApnnJEhLABQAPAFxwkKCAEp0WXBkIkK1aGC6UA7hy4z5CZJBgAfaEU4hVmaC+g58xMlRr6QRwSwiYhJmCpaotsSBouIsThiubhqaDMzsDrwCwjEh9lzKANzQAPTF0ACi9PQM8tz0AOYEALZCRKTQlHjQpPAADkLQAOR5IIPQ5DBElO1W5PVEYIwgA6SU0L1g9GAtpEL0HV09-UMWSoMAdClMrCY8fAFBsZJRjxKFJWWV1fS1Dc2t7U63T6A0GLxyLDGEzs0z0UDmCyWKzWGy2Oz2B2Bx0GpysFwwviMt0kI3epWgAAVNtshLt9kcBk0CBB2hB+sByHh4N0ABZgdojcYwQmGCQEgyGB4Q57ZYJxIrkqlo2kYhnQJks6BsoQcrm8-nQcFyoV6CUSIA))

**Should I throw an error if event E happens?**

- If the specification says so, then you should. Otherwise, do not.

**Should I return value V if the input has property P?**

- If the specification says so, then you should. Otherwise, return what the specification asks
  - "Return a new image" means you should always return a new image, regardless of what the other parameters are
  - "Return a new array" means you should always return a new array, even if given array is empty
