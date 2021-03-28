---
title: batchTraverse.ts
nav_order: 6
parent: Modules
---

## batchTraverse overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [batchTraverse](#batchtraverse)

---

# utils

## batchTraverse

Like `array.traverse` but actions are batched in chunks.
You can use `Array.chunksOf` to provide the `as` argument.

**Signature**

```ts
export declare function batchTraverse<M extends URIS3>(
  M: Monad3<M>
): <U, L, A, B>(as: Array<Array<A>>, f: (a: A) => Kind3<M, U, L, B>) => Kind3<M, U, L, Array<B>>
export declare function batchTraverse<M extends URIS2>(
  M: Monad2<M>
): <L, A, B>(as: Array<Array<A>>, f: (a: A) => Kind2<M, L, B>) => Kind2<M, L, Array<B>>
export declare function batchTraverse<M extends URIS2, L>(
  M: Monad2C<M, L>
): <A, B>(as: Array<Array<A>>, f: (a: A) => Kind2<M, L, B>) => Kind2<M, L, Array<B>>
export declare function batchTraverse<M extends URIS>(
  M: Monad1<M>
): <A, B>(as: Array<Array<A>>, f: (a: A) => Kind<M, B>) => Kind<M, Array<B>>
export declare function batchTraverse<M>(
  M: Monad<M>
): <A, B>(as: Array<Array<A>>, f: (a: A) => HKT<M, B>) => HKT<M, Array<B>>
```

**Example**

```ts
import * as T from 'fp-ts/Task'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { batchTraverse } from 'fp-ts-contrib/batchTraverse'

async function processInStrictSequence() {
  const numbers = [1, 2, 3, 4]
  const asyncTransform = (n: number): T.Task<number> => T.of(n + 1)
  const result = await pipe(
    numbers,
    A.chunksOf(2),
    // process asyncTransform in strict sequence with chunkSize 2:
    // next asyncTransform only starts after previous is finished
    (chunks) => batchTraverse(T.task)(chunks, asyncTransform)
  )()
  assert.deepStrictEqual(result, [2, 3, 4, 5])
}

processInStrictSequence()
```

Added in v0.1.0
