---
title: time.ts
nav_order: 20
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [time (function)](#time-function)

---

# time (function)

Mimics the analogous Unix command: given an action `HKT<M, A>`, we can derive an action `HKT<M, [A, number]>` that
returns the elapsed time along with the computed value

**Signature**

```ts
export function time<M extends URIS3>(M: MonadIO3<M>): <U, L, A>(ma: Kind3<M, U, L, A>) => Kind3<M, U, L, [A, number]>
export function time<M extends URIS2>(M: MonadIO2<M>): <L, A>(ma: Kind2<M, L, A>) => Kind2<M, L, [A, number]>
export function time<M extends URIS2, L>(M: MonadIO2C<M, L>): <A>(ma: Kind2<M, L, A>) => Kind2<M, L, [A, number]>
export function time<M extends URIS>(M: MonadIO1<M>): <A>(ma: Kind<M, A>) => Kind<M, [A, number]>
export function time<M>(M: MonadIO<M>): <A>(ma: HKT<M, A>) => HKT<M, [A, number]> { ... }
```

**Example**

```ts
import { io } from 'fp-ts/lib/IO'
import { randomInt } from 'fp-ts/lib/Random'
import { time } from 'fp-ts-contrib/lib/time'

const timeIO = time(io)

function fib(n: number): number {
  return n <= 1 ? 1 : fib(n - 1) + fib(n - 2)
}

timeIO(io.map(randomInt(30, 35), fib))() // [ 14930352, 127 ]
```

Added in v0.1.0
