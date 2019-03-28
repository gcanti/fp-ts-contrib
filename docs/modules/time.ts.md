---
title: time.ts
nav_order: 13
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
export function time<M extends URIS3>(M: MonadIO3<M>): <U, L, A>(ma: Type3<M, U, L, A>) => Type3<M, U, L, [A, number]>
export function time<M extends URIS3, U, L>(
  M: MonadIO3C<M, U, L>
): <A>(ma: Type3<M, U, L, A>) => Type3<M, U, L, [A, number]>
export function time<M extends URIS2>(M: MonadIO2<M>): <L, A>(ma: Type2<M, L, A>) => Type2<M, L, [A, number]>
export function time<M extends URIS2, L>(M: MonadIO2C<M, L>): <A>(ma: Type2<M, L, A>) => Type2<M, L, [A, number]>
export function time<M extends URIS>(M: MonadIO1<M>): <A>(ma: Type<M, A>) => Type<M, [A, number]>
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

timeIO(randomInt(30, 35).map(fib)).run() // [ 14930352, 127 ]
```

Added in v0.0.1
