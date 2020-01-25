---
title: Align/Array.ts
nav_order: 1
parent: Modules
---

# Array overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [alignArray (constant)](#alignarray-constant)
- [lpadZip (function)](#lpadzip-function)
- [lpadZipWith (function)](#lpadzipwith-function)
- [rpadZip (function)](#rpadzip-function)
- [rpadZipWith (function)](#rpadzipwith-function)

---

# alignArray (constant)

`Align` instance for `Array`.

**Signature**

```ts
export const alignArray: Align1<URI> = ...
```

Added in v0.1.0

# lpadZip (function)

Takes two arrays and returns an array of corresponding pairs. If the left input array is short, it will be
padded using `none`.

It is similar to `zip`, but it doesn't discard elements when the left input array is shorter than the right.

**Signature**

```ts
export function lpadZip<A, B>(xs: Array<A>, ys: Array<B>): Array<[Option<A>, B]> { ... }
```

**Example**

```ts
import { some, none } from 'fp-ts/lib/Option'
import { lpadZip } from 'fp-ts-contrib/lib/Align/Array'

assert.deepStrictEqual(lpadZip([1, 2], ['a', 'b', 'c']), [
  [some(1), 'a'],
  [some(2), 'b'],
  [none, 'c']
])
assert.deepStrictEqual(lpadZip([1, 2, 3], ['a', 'b']), [
  [some(1), 'a'],
  [some(2), 'b']
])
```

Added in v0.1.0

# lpadZipWith (function)

Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If the
left input array is short, it will be padded using `none`.

It is similar to `zipWith`, but it doesn't discard elements when the left input array is shorter than the right.

**Signature**

```ts
export function lpadZipWith<A, B, C>(xs: Array<A>, ys: Array<B>, f: (a: Option<A>, b: B) => C): Array<C> { ... }
```

**Example**

```ts
import * as O from 'fp-ts/lib/Option'
import { lpadZipWith } from 'fp-ts-contrib/lib/Align/Array'
import { pipe } from 'fp-ts/lib/pipeable'

const f = (ma: O.Option<number>, b: string) =>
  pipe(
    ma,
    O.fold(
      () => '*',
      a => a.toString()
    )
  ) + b
assert.deepStrictEqual(lpadZipWith([1, 2, 3], ['a', 'b', 'c', 'd'], f), ['1a', '2b', '3c', '*d'])
assert.deepStrictEqual(lpadZipWith([1, 2, 3, 4], ['a', 'b', 'c'], f), ['1a', '2b', '3c'])
```

Added in v0.1.0

# rpadZip (function)

Takes two arrays and returns an array of corresponding pairs. If the right input array is short, it will be
padded using `none`.

It is similar to `zip`, but it doesn't discard elements when the right input array is shorter than the left.

**Signature**

```ts
export function rpadZip<A, B>(xs: Array<A>, ys: Array<B>): Array<[A, Option<B>]> { ... }
```

**Example**

```ts
import { some, none } from 'fp-ts/lib/Option'
import { rpadZip } from 'fp-ts-contrib/lib/Align/Array'

assert.deepStrictEqual(rpadZip([1, 2, 3], ['a', 'b']), [
  [1, some('a')],
  [2, some('b')],
  [3, none]
])
assert.deepStrictEqual(rpadZip([1, 2], ['a', 'b', 'c']), [
  [1, some('a')],
  [2, some('b')]
])
```

Added in v0.1.0

# rpadZipWith (function)

Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If the
right input array is short, it will be padded using `none`.

It is similar to `zipWith`, but it doesn't discard elements when the right input array is shorter than the left.

**Signature**

```ts
export function rpadZipWith<A, B, C>(xs: Array<A>, ys: Array<B>, f: (a: A, b: Option<B>) => C): Array<C> { ... }
```

**Example**

```ts
import { Option, getOrElse } from 'fp-ts/lib/Option'
import { rpadZipWith } from 'fp-ts-contrib/lib/Align/Array'

const f = (a: number, mb: Option<string>) => a.toString() + getOrElse(() => '*')(mb)
assert.deepStrictEqual(rpadZipWith([1, 2, 3, 4], ['a', 'b', 'c'], f), ['1a', '2b', '3c', '4*'])
assert.deepStrictEqual(rpadZipWith([1, 2, 3], ['a', 'b', 'c', 'd'], f), ['1a', '2b', '3c'])
```

Added in v0.1.0
