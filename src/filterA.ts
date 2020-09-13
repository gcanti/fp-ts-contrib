/**
 * @since 0.1.15
 */
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from 'fp-ts/lib/HKT'
import {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative3,
  Applicative4,
  Applicative2C
} from 'fp-ts/lib/Applicative'
import * as A from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'

/**
 * This generalizes the array-based `filter` function.
 *
 * @example
 * import { io, IO } from 'fp-ts/IO'
 * import { filterA } from 'fp-ts-contrib/filterA'
 *
 * const filterAIO = filterA(io)
 *
 * const p = (n: number): IO<boolean> => io.of(n % 2 === 0)
 *
 * assert.deepStrictEqual(filterAIO(p)([1, 2, 3, 4, 5])(), [2, 4])
 *
 * @since 0.1.15
 */
export function filterA<F extends URIS4>(
  F: Applicative4<F>
): <S, R, E, A>(p: (a: A) => Kind4<F, S, R, E, boolean>) => (as: Array<A>) => Kind4<F, S, R, E, Array<A>>
export function filterA<F extends URIS3>(
  F: Applicative3<F>
): <R, E, A>(p: (a: A) => Kind3<F, R, E, boolean>) => (as: Array<A>) => Kind3<F, R, E, Array<A>>
export function filterA<F extends URIS2>(
  F: Applicative2<F>
): <E, A>(p: (a: A) => Kind2<F, E, boolean>) => (as: Array<A>) => Kind2<F, E, Array<A>>
export function filterA<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <A>(p: (a: A) => Kind2<F, E, boolean>) => (as: Array<A>) => Kind2<F, E, Array<A>>
export function filterA<F extends URIS>(
  F: Applicative1<F>
): <A>(p: (a: A) => Kind<F, boolean>) => (as: Array<A>) => Kind<F, Array<A>>
export function filterA<F>(F: Applicative<F>): <A>(p: (a: A) => HKT<F, boolean>) => (as: Array<A>) => HKT<F, Array<A>>
export function filterA<F>(F: Applicative<F>): <A>(p: (a: A) => HKT<F, boolean>) => (as: Array<A>) => HKT<F, Array<A>> {
  const wither = A.array.wither(F)
  return (p) => (as) => wither(as, (a) => F.map(p(a), (b) => (b ? O.some(a) : O.none)))
}
