---
title: time.ts
nav_order: 26
parent: Modules
---

## time overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [time](#time)

---

# utils

## time

Mimics the analogous Unix command: given an action `HKT<M, A>`, we can derive an action `HKT<M, [A, number]>` that
returns the elapsed time along with the computed value

**Signature**

```ts
export declare function time<M extends URIS3>(
  M: MonadIO3<M>
): <R, E, A>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, [A, number]>
export declare function time<M extends URIS2>(M: MonadIO2<M>): <E, A>(ma: Kind2<M, E, A>) => Kind2<M, E, [A, number]>
export declare function time<M extends URIS2, E>(
  M: MonadIO2C<M, E>
): <A>(ma: Kind2<M, E, A>) => Kind2<M, E, [A, number]>
export declare function time<M extends URIS>(M: MonadIO1<M>): <A>(ma: Kind<M, A>) => Kind<M, [A, number]>
export declare function time<M>(M: MonadIO<M>): <A>(ma: HKT<M, A>) => HKT<M, [A, number]>
```

**Example**

```ts
import { io } from 'fp-ts/IO'
import { randomInt } from 'fp-ts/Random'
import { time } from 'fp-ts-contrib/time'

const timeIO = time(io)

function fib(n: number): number {
  return n <= 1 ? 1 : fib(n - 1) + fib(n - 2)
}

timeIO(io.map(randomInt(30, 35), fib))() // [ 14930352, 127 ]
```

Added in v0.1.0
