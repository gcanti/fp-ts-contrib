---
title: batchTraverseM.ts
nav_order: 2
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [batchSequenceM](#batchsequencem)
- [batchTraverseM](#batchtraversem)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# batchSequenceM

Like `array.sequence` but actions are batched in chunks.
You can use `Array.chunksOf` to provide the `as` argument.

**Signature** (function)

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
export function batchSequenceM<M>(M: Monad<M>): <A>(as: Array<Array<HKT<M, A>>>) => HKT<M, Array<A>>
export function batchSequenceM<M>(M: Monad<M>): <A>(as: Array<Array<HKT<M, A>>>) => HKT<M, Array<A>> { ... }
```

# batchTraverseM

Like `array.traverse` but actions are batched in chunks.
You can use `Array.chunksOf` to provide the `as` argument.

**Signature** (function)

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
export function batchTraverseM<M>(M: Monad<M>): <A, B>(as: Array<Array<A>>, f: (a: A) => HKT<M, B>) => HKT<M, Array<B>>
export function batchTraverseM<M>(
  M: Monad<M>
): <A, B>(as: Array<Array<A>>, f: (a: A) => HKT<M, B>) => HKT<M, Array<B>> { ... }
```
