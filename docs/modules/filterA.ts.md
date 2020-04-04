---
title: filterA.ts
nav_order: 9
parent: Modules
---

# filterA overview

Added in TODO

---

<h2 class="text-delta">Table of contents</h2>

- [filterA](#filterA)

---

# filterA

TODO describe here

**Signature**

```ts
export function filterA<F extends URIS4>(
  F: Applicative4<F>
): <M, U, L, A>(p: (a: A) => Kind4<F, M, U, L, boolean>) => (as: Array<A>) => Kind4<F, M, U, L, Array<A>>
export function filterA<F extends URIS3>(
  F: Applicative3<F>
): <U, L, A>(p: (a: A) => Kind3<F, U, L, boolean>) => (as: Array<A>) => Kind3<F, U, L, Array<A>>
export function filterA<F extends URIS2>(
  F: Applicative2<F>
): <L, A>(p: (a: A) => Kind2<F, L, boolean>) => (as: Array<A>) => Kind2<F, L, Array<A>>
export function filterA<F extends URIS>(
  F: Applicative1<F>
): <A>(p: (a: A) => Kind<F, boolean>) => (as: Array<A>) => Kind<F, Array<A>>
export function filterA<F>(
    F: Applicative<F>
): <A>(p: (a: A) => HKT<F, boolean>) => (as: Array<A>) => HKT<F, Array<A>> 
```

**Example**

```ts
import { io, IO } from 'fp-ts/lib/IO'
import { filterA } from 'fp-ts-contrib/lib/filterA'

const filterAIO = filterA(io)

const p = (n: number): IO<boolean> => io.of(n % 2 === 0)

filterAIO(p)([1, 2, 3, 4, 5])() // [2, 4]
```

Added in TODO
