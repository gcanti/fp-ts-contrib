import { array } from 'fp-ts/lib/Array'
import { identity } from 'fp-ts/lib/function'
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C } from 'fp-ts/lib/Monad'

/**
 * Like `array.traverse` but actions are batched in chunks.
 * You can use `Array.chunksOf` to provide the `as` argument.
 */
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
): <A, B>(as: Array<Array<A>>, f: (a: A) => HKT<M, B>) => HKT<M, Array<B>> {
  const traverseM = array.traverse(M)
  return <A, B>(as: Array<Array<A>>, f: (a: A) => HKT<M, B>) =>
    as.reduce(
      (mbs: HKT<M, Array<B>>, chunk: Array<A>) =>
        M.chain(mbs, bs =>
          M.map(traverseM(chunk, f), chunk => {
            bs.push(...chunk)
            return bs
          })
        ),
      M.of([])
    )
}

/**
 * Like `array.sequence` but actions are batched in chunks.
 * You can use `Array.chunksOf` to provide the `as` argument.
 */
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
export function batchSequenceM<M>(M: Monad<M>): <A>(as: Array<Array<HKT<M, A>>>) => HKT<M, Array<A>> {
  const batchTraverseMM = batchTraverseM(M)
  return fas => batchTraverseMM(fas, identity)
}
