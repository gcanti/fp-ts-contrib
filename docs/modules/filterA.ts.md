---
title: filterA.ts
nav_order: 9
parent: Modules
---

## filterA overview

Added in v0.1.15

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [filterA](#filtera)

---

# utils

## filterA

This generalizes the array-based `filter` function.

**Signature**

```ts
export declare function filterA<F extends URIS4>(
  F: Applicative4<F>
): <S, R, E, A>(p: (a: A) => Kind4<F, S, R, E, boolean>) => (as: Array<A>) => Kind4<F, S, R, E, Array<A>>
export declare function filterA<F extends URIS3>(
  F: Applicative3<F>
): <R, E, A>(p: (a: A) => Kind3<F, R, E, boolean>) => (as: Array<A>) => Kind3<F, R, E, Array<A>>
export declare function filterA<F extends URIS2>(
  F: Applicative2<F>
): <E, A>(p: (a: A) => Kind2<F, E, boolean>) => (as: Array<A>) => Kind2<F, E, Array<A>>
export declare function filterA<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <A>(p: (a: A) => Kind2<F, E, boolean>) => (as: Array<A>) => Kind2<F, E, Array<A>>
export declare function filterA<F extends URIS>(
  F: Applicative1<F>
): <A>(p: (a: A) => Kind<F, boolean>) => (as: Array<A>) => Kind<F, Array<A>>
export declare function filterA<F>(
  F: Applicative<F>
): <A>(p: (a: A) => HKT<F, boolean>) => (as: Array<A>) => HKT<F, Array<A>>
```

**Example**

```ts
import { io, IO } from 'fp-ts/lib/IO'
import { filterA } from 'fp-ts-contrib/lib/filterA'

const filterAIO = filterA(io)

const p = (n: number): IO<boolean> => io.of(n % 2 === 0)

assert.deepStrictEqual(filterAIO(p)([1, 2, 3, 4, 5])(), [2, 4])
```

Added in v0.1.15
