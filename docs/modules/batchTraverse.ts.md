---
title: batchTraverse.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [batchTraverse (function)](#batchtraverse-function)

---

# batchTraverse (function)

Like `array.traverse` but actions are batched in chunks.
You can use `Array.chunksOf` to provide the `as` argument.

**Signature**

```ts
export function batchTraverse<M extends URIS3>(
  M: Monad3<M>
): <U, L, A, B>(as: Array<Array<A>>, f: (a: A) => Kind3<M, U, L, B>) => Kind3<M, U, L, Array<B>>
export function batchTraverse<M extends URIS2>(
  M: Monad2<M>
): <L, A, B>(as: Array<Array<A>>, f: (a: A) => Kind2<M, L, B>) => Kind2<M, L, Array<B>>
export function batchTraverse<M extends URIS2, L>(
  M: Monad2C<M, L>
): <A, B>(as: Array<Array<A>>, f: (a: A) => Kind2<M, L, B>) => Kind2<M, L, Array<B>>
export function batchTraverse<M extends URIS>(
  M: Monad1<M>
): <A, B>(as: Array<Array<A>>, f: (a: A) => Kind<M, B>) => Kind<M, Array<B>>
export function batchTraverse<M>(M: Monad<M>): <A, B>(as: Array<Array<A>>, f: (a: A) => HKT<M, B>) => HKT<M, Array<B>> { ... }
```
