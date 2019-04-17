---
title: batchTraverseM.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [batchSequenceM (function)](#batchsequencem-function)
- [batchTraverseM (function)](#batchtraversem-function)

---

# batchSequenceM (function)

Like `array.sequence` but actions are batched in chunks.
You can use `Array.chunksOf` to provide the `as` argument.

**Signature**

```ts
export function batchSequenceM<M extends URIS3>(
  M: Monad3<M>
): <U, L, A>(as: Array<Array<Type3<M, U, L, A>>>) => Type3<M, U, L, Array<A>>
export function batchSequenceM<M extends URIS3, U, L>(
  M: Monad3C<M, U, L>
): <A>(as: Array<Array<Type3<M, U, L, A>>>) => Type3<M, U, L, Array<A>>
export function batchSequenceM<M extends URIS2>(
  M: Monad2<M>
): <L, A>(as: Array<Array<Type2<M, L, A>>>) => Type2<M, L, Array<A>>
export function batchSequenceM<M extends URIS2, L>(
  M: Monad2C<M, L>
): <A>(as: Array<Array<Type2<M, L, A>>>) => Type2<M, L, Array<A>>
export function batchSequenceM<M extends URIS>(M: Monad1<M>): <A>(as: Array<Array<Type<M, A>>>) => Type<M, Array<A>>
export function batchSequenceM<M>(M: Monad<M>): <A>(as: Array<Array<HKT<M, A>>>) => HKT<M, Array<A>> { ... }
```

# batchTraverseM (function)

Like `array.traverse` but actions are batched in chunks.
You can use `Array.chunksOf` to provide the `as` argument.

**Signature**

```ts
export function batchTraverseM<M extends URIS3>(
  M: Monad3<M>
): <U, L, A, B>(as: Array<Array<A>>, f: (a: A) => Type3<M, U, L, B>) => Type3<M, U, L, Array<B>>
export function batchTraverseM<M extends URIS3, U, L>(
  M: Monad3C<M, U, L>
): <A, B>(as: Array<Array<A>>, f: (a: A) => Type3<M, U, L, B>) => Type3<M, U, L, Array<B>>
export function batchTraverseM<M extends URIS2>(
  M: Monad2<M>
): <L, A, B>(as: Array<Array<A>>, f: (a: A) => Type2<M, L, B>) => Type2<M, L, Array<B>>
export function batchTraverseM<M extends URIS2, L>(
  M: Monad2C<M, L>
): <A, B>(as: Array<Array<A>>, f: (a: A) => Type2<M, L, B>) => Type2<M, L, Array<B>>
export function batchTraverseM<M extends URIS>(
  M: Monad1<M>
): <A, B>(as: Array<Array<A>>, f: (a: A) => Type<M, B>) => Type<M, Array<B>>
export function batchTraverseM<M>(M: Monad<M>): <A, B>(as: Array<Array<A>>, f: (a: A) => HKT<M, B>) => HKT<M, Array<B>> { ... }
```
