---
title: Align/Array.ts
nav_order: 1
parent: Modules
---

## Array overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [alignArray](#alignarray)
  - [lpadZip](#lpadzip)
  - [lpadZipWith](#lpadzipwith)
  - [rpadZip](#rpadzip)
  - [rpadZipWith](#rpadzipwith)

---

# utils

## alignArray

`Align` instance for `Array`.

**Signature**

```ts
export declare const alignArray: Align1<'Array'>
```

Added in v0.1.0

## lpadZip

Takes two arrays and returns an array of corresponding pairs. If the left input array is short, it will be
padded using `none`.

It is similar to `zip`, but it doesn't discard elements when the left input array is shorter than the right.

**Signature**

```ts
export declare const lpadZip: <A, B>(xs: A[], ys: B[]) => [Option<A>, B][]
```

**Example**

```ts
import { some, none } from 'fp-ts/Option'
import { lpadZip } from 'fp-ts-contrib/Align/Array'

assert.deepStrictEqual(lpadZip([1, 2], ['a', 'b', 'c']), [
  [some(1), 'a'],
  [some(2), 'b'],
  [none, 'c'],
])
assert.deepStrictEqual(lpadZip([1, 2, 3], ['a', 'b']), [
  [some(1), 'a'],
  [some(2), 'b'],
])
```

Added in v0.1.0

## lpadZipWith

Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If the
left input array is short, it will be padded using `none`.

It is similar to `zipWith`, but it doesn't discard elements when the left input array is shorter than the right.

**Signature**

```ts
export declare const lpadZipWith: <A, B, C>(xs: A[], ys: B[], f: (a: Option<A>, b: B) => C) => C[]
```

**Example**

```ts
import * as O from 'fp-ts/Option'
import { lpadZipWith } from 'fp-ts-contrib/Align/Array'
import { pipe } from 'fp-ts/function'

const f = (ma: O.Option<number>, b: string) =>
  pipe(
    ma,
    O.fold(
      () => '*',
      (a) => a.toString()
    )
  ) + b
assert.deepStrictEqual(lpadZipWith([1, 2, 3], ['a', 'b', 'c', 'd'], f), ['1a', '2b', '3c', '*d'])
assert.deepStrictEqual(lpadZipWith([1, 2, 3, 4], ['a', 'b', 'c'], f), ['1a', '2b', '3c'])
```

Added in v0.1.0

## rpadZip

Takes two arrays and returns an array of corresponding pairs. If the right input array is short, it will be
padded using `none`.

It is similar to `zip`, but it doesn't discard elements when the right input array is shorter than the left.

**Signature**

```ts
export declare const rpadZip: <A, B>(xs: A[], ys: B[]) => [A, Option<B>][]
```

**Example**

```ts
import { some, none } from 'fp-ts/Option'
import { rpadZip } from 'fp-ts-contrib/Align/Array'

assert.deepStrictEqual(rpadZip([1, 2, 3], ['a', 'b']), [
  [1, some('a')],
  [2, some('b')],
  [3, none],
])
assert.deepStrictEqual(rpadZip([1, 2], ['a', 'b', 'c']), [
  [1, some('a')],
  [2, some('b')],
])
```

Added in v0.1.0

## rpadZipWith

Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If the
right input array is short, it will be padded using `none`.

It is similar to `zipWith`, but it doesn't discard elements when the right input array is shorter than the left.

**Signature**

```ts
export declare const rpadZipWith: <A, B, C>(xs: A[], ys: B[], f: (a: A, b: Option<B>) => C) => C[]
```

**Example**

```ts
import { Option, getOrElse } from 'fp-ts/Option'
import { rpadZipWith } from 'fp-ts-contrib/Align/Array'

const f = (a: number, mb: Option<string>) => a.toString() + getOrElse(() => '*')(mb)
assert.deepStrictEqual(rpadZipWith([1, 2, 3, 4], ['a', 'b', 'c'], f), ['1a', '2b', '3c', '4*'])
assert.deepStrictEqual(rpadZipWith([1, 2, 3], ['a', 'b', 'c', 'd'], f), ['1a', '2b', '3c'])
```

Added in v0.1.0
