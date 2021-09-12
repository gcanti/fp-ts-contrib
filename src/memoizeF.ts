/**
 * @since 0.1.27
 */
import { URIS2, Kind2, URIS, Kind, URIS3, Kind3, HKT, Kind4, URIS4 } from 'fp-ts/lib/HKT'
import { Eq } from 'fp-ts/lib/Eq'
import * as M from 'fp-ts/lib/Map'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/function'
import { Functor4, Functor1, Functor2, Functor3, Functor, Functor2C, Functor3C } from 'fp-ts/lib/Functor'

/**
 * Memoizes the result of a function that returns a computation.
 *
 * @example
 * import * as IO from 'fp-ts/lib/IO'
 * import * as EQ from 'fp-ts/lib/Eq'
 * import { pipe } from 'fp-ts/lib/function'
 * import { memoizeF } from 'fp-ts-contrib/lib/memoizeF'
 *
 * interface A {
 *   readonly n: number
 * }
 * let invocations = 0
 * const f = (a: A): IO.IO<number> => {
 *   ++invocations
 *   return () => a.n ** 2
 * }
 * const eq: EQ.Eq<A> = pipe(
 *   EQ.eqNumber,
 *   EQ.contramap((_) => _.n)
 * )
 * const fa = memoizeF(IO.Functor, eq)(f)
 * const a: A = { n: 2 }
 *
 * assert.strictEqual(fa(a)(), 4)
 * assert.strictEqual(fa({ n: 42 })(), 1764)
 * assert.strictEqual(fa(a)(), 4)
 * assert.strictEqual(fa({ ...a })(), 4)
 * assert.strictEqual(invocations, 2)
 *
 * @since 0.1.27
 */
export function memoizeF<F extends URIS4, A>(
  F: Functor4<F>,
  E: Eq<A>
): <S, R, E, B>(f: (a: A) => Kind4<F, S, R, E, B>) => (a: A) => Kind4<F, S, R, E, B>
export function memoizeF<F extends URIS3, A>(
  F: Functor3<F>,
  E: Eq<A>
): <R, E, B>(f: (a: A) => Kind3<F, R, E, B>) => (a: A) => Kind3<F, R, E, B>
export function memoizeF<F extends URIS3, E, A>(
  F: Functor3C<F, E>,
  E: Eq<A>
): <R, B>(f: (a: A) => Kind3<F, R, E, B>) => (a: A) => Kind3<F, R, E, B>
export function memoizeF<F extends URIS2, A>(
  F: Functor2<F>,
  E: Eq<A>
): <E, B>(f: (a: A) => Kind2<F, E, B>) => (a: A) => Kind2<F, E, B>
export function memoizeF<F extends URIS2, E, A>(
  F: Functor2C<F, E>,
  E: Eq<A>
): <B>(f: (a: A) => Kind2<F, E, B>) => (a: A) => Kind2<F, E, B>
export function memoizeF<F extends URIS, A>(
  F: Functor1<F>,
  E: Eq<A>
): <B>(f: (a: A) => Kind<F, B>) => (a: A) => Kind<F, B>
export function memoizeF<F, A>(_: Functor<F>, E: Eq<A>): <B>(f: (a: A) => HKT<F, B>) => (a: A) => HKT<F, B> {
  return <B>(f: (a: A) => HKT<F, B>): ((a: A) => HKT<F, B>) => {
    const cache: Map<A, HKT<F, B>> = new Map()
    const lookupE = M.lookup(E)
    return (a) =>
      pipe(
        cache,
        lookupE(a),
        O.getOrElse(() => {
          const fb = f(a)
          cache.set(a, fb)
          return fb
        })
      )
  }
}
