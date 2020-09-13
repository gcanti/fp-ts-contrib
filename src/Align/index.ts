/**
 * The `Align` type class extends the `Semialign` type class with a value `nil`, which
 * acts as a unit in regards to `align`.
 *
 * `Align` instances must satisfy the following laws in addition to the `Semialign` laws:
 *
 * 1. Right identity: `F.align(fa, nil) = F.map(fa, this_)`
 * 2. Left identity: `F.align(nil, fa) = F.map(fa, that)`
 *
 * Adapted from http://hackage.haskell.org/package/these-0.8/docs/Data-Align.html
 *
 * @since 0.1.0
 */
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { identity, tuple } from 'fp-ts/lib/function'
import { Option, some, none } from 'fp-ts/lib/Option'
import { Semialign, Semialign1, Semialign2, Semialign2C, Semialign3 } from '../Semialign'
import { fold, bimap } from 'fp-ts/lib/These'
import { pipe } from 'fp-ts/lib/pipeable'

/**
 * @since 0.1.0
 */
export interface Align<F> extends Semialign<F> {
  readonly nil: <A>() => HKT<F, A>
}

/**
 * @since 0.1.0
 */
export interface Align1<F extends URIS> extends Semialign1<F> {
  readonly nil: <A>() => Kind<F, A>
}

/**
 * @since 0.1.0
 */
export interface Align2<F extends URIS2> extends Semialign2<F> {
  readonly nil: <L, A>() => Kind2<F, L, A>
}

/**
 * @since 0.1.0
 */
export interface Align2C<F extends URIS2, L> extends Semialign2C<F, L> {
  readonly nil: <A>() => Kind2<F, L, A>
}

/**
 * @since 0.1.0
 */
export interface Align3<F extends URIS3> extends Semialign3<F> {
  readonly nil: <U, L, A>() => Kind3<F, U, L, A>
}

/**
 * Align two structures, using a semigroup for combining values.
 *
 * @example
 * import { semigroupSum } from 'fp-ts/Semigroup'
 * import { salign } from 'fp-ts-contrib/Align'
 * import { alignArray } from 'fp-ts-contrib/Align/Array'
 *
 * assert.deepStrictEqual(salign(alignArray, semigroupSum)([1, 2, 3], [4, 5]), [5, 7, 3])
 *
 * @since 0.1.0
 */
export function salign<F extends URIS3, A, L>(
  F: Align3<F>,
  S: Semigroup<A>
): <U, L>(fx: Kind3<F, U, L, A>, fy: Kind3<F, U, L, A>) => Kind3<F, U, L, A>
export function salign<F extends URIS2, A>(
  F: Align2<F>,
  S: Semigroup<A>
): <L>(fx: Kind2<F, L, A>, fy: Kind2<F, L, A>) => Kind2<F, L, A>
export function salign<F extends URIS2, A, L>(
  F: Align2C<F, L>,
  S: Semigroup<A>
): (fx: Kind2<F, L, A>, fy: Kind2<F, L, A>) => Kind2<F, L, A>
export function salign<F extends URIS, A>(F: Align1<F>, S: Semigroup<A>): (fx: Kind<F, A>, fy: Kind<F, A>) => Kind<F, A>
export function salign<F, A>(F: Align<F>, S: Semigroup<A>): (fx: HKT<F, A>, fy: HKT<F, A>) => HKT<F, A>
export function salign<F, A>(F: Align<F>, S: Semigroup<A>): (fx: HKT<F, A>, fy: HKT<F, A>) => HKT<F, A> {
  return (fx, fy) => F.alignWith(fx, fy, fold(identity, identity, S.concat))
}

/**
 * Align two structures, using `none` to fill blanks.
 *
 * It is similar to `zip`, but it doesn't discard elements.
 *
 * @example
 * import { some, none } from 'fp-ts/Option'
 * import { padZip } from 'fp-ts-contrib/Align'
 * import { alignArray } from 'fp-ts-contrib/Align/Array'
 *
 * assert.deepStrictEqual(padZip(alignArray)([1, 2, 3], [4, 5]), [[some(1), some(4)], [some(2), some(5)], [some(3), none]])
 *
 * @since 0.1.0
 */
export function padZip<F extends URIS3, L>(
  F: Align3<F>
): <U, L, A, B>(fa: Kind3<F, U, L, A>, fb: Kind3<F, U, L, B>) => Kind3<F, U, L, [Option<A>, Option<B>]>
export function padZip<F extends URIS2>(
  F: Align2<F>
): <L, A, B>(fa: Kind2<F, L, A>, fb: Kind2<F, L, B>) => Kind2<F, L, [Option<A>, Option<B>]>
export function padZip<F extends URIS2, L>(
  F: Align2C<F, L>
): <A, B>(fa: Kind2<F, L, A>, fb: Kind2<F, L, B>) => Kind2<F, L, [Option<A>, Option<B>]>
export function padZip<F extends URIS>(
  F: Align1<F>
): <A, B>(fa: Kind<F, A>, fb: Kind<F, B>) => Kind<F, [Option<A>, Option<B>]>
export function padZip<F>(F: Align<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, [Option<A>, Option<B>]>
export function padZip<F>(F: Align<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, [Option<A>, Option<B>]> {
  return (fa, fb) => padZipWith(F)(fa, fb, (a, b) => tuple(a, b))
}

/**
 * Align two structures by applying a function to each pair of aligned elements, using `none` to fill blanks.
 *
 * It is similar to `zipWith`, but it doesn't discard elements.
 *
 * @example
 * import { Option, fold, getOrElse } from 'fp-ts/Option'
 * import { padZipWith } from 'fp-ts-contrib/Align'
 * import { alignArray } from 'fp-ts-contrib/Align/Array'
 * import { pipe } from 'fp-ts/function'
 *
 * const f = (ma: Option<number>, mb: Option<string>) =>
 *   pipe(
 *     ma,
 *     fold(() => '*', a => a.toString())
 *   ) +
 *   pipe(
 *     mb,
 *     getOrElse(() => '#')
 *   )
 *
 * assert.deepStrictEqual(padZipWith(alignArray)([1, 2], ['a'], f), ['1a', '2#'])
 * assert.deepStrictEqual(padZipWith(alignArray)([1], ['a', 'b'], f), ['1a', '*b'])
 *
 * @since 0.1.0
 */
export function padZipWith<F extends URIS3, L>(
  F: Align3<F>
): <U, L, A, B, C>(
  fa: Kind3<F, U, L, A>,
  fb: Kind3<F, U, L, B>,
  f: (a: Option<A>, b: Option<B>) => C
) => Kind3<F, U, L, C>
export function padZipWith<F extends URIS2>(
  F: Align2<F>
): <L, A, B, C>(fa: Kind2<F, L, A>, fb: Kind2<F, L, B>, f: (a: Option<A>, b: Option<B>) => C) => Kind2<F, L, C>
export function padZipWith<F extends URIS2, L>(
  F: Align2C<F, L>
): <A, B, C>(fa: Kind2<F, L, A>, fb: Kind2<F, L, B>, f: (a: Option<A>, b: Option<B>) => C) => Kind2<F, L, C>
export function padZipWith<F extends URIS>(
  F: Align1<F>
): <A, B, C>(fa: Kind<F, A>, fb: Kind<F, B>, f: (a: Option<A>, b: Option<B>) => C) => Kind<F, C>
export function padZipWith<F>(
  F: Align<F>
): <A, B, C>(fa: HKT<F, A>, fb: HKT<F, B>, f: (a: Option<A>, b: Option<B>) => C) => HKT<F, C>
export function padZipWith<F>(
  F: Align<F>
): <A, B, C>(fa: HKT<F, A>, fb: HKT<F, B>, f: (a: Option<A>, b: Option<B>) => C) => HKT<F, C> {
  return (fa, fb, f) =>
    F.alignWith(fa, fb, (ab) =>
      pipe(
        ab,
        bimap(some, some),
        fold(
          (a) => f(a, none),
          (b) => f(none, b),
          (a, b) => f(a, b)
        )
      )
    )
}
