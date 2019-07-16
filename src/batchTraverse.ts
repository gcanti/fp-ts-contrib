import { array } from 'fp-ts/lib/Array'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3 } from 'fp-ts/lib/Monad'

/**
 * Like `array.traverse` but actions are batched in chunks.
 * You can use `Array.chunksOf` to provide the `as` argument.
 *
 * @since 0.1.0
 */
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
export function batchTraverse<M>(M: Monad<M>): <A, B>(as: Array<Array<A>>, f: (a: A) => HKT<M, B>) => HKT<M, Array<B>>
export function batchTraverse<M>(M: Monad<M>): <A, B>(as: Array<Array<A>>, f: (a: A) => HKT<M, B>) => HKT<M, Array<B>> {
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
