/**
 * @since 0.1.0
 */
import { NonEmptyArray, nonEmptyArray, URI, cons, head, tail } from 'fp-ts/lib/NonEmptyArray'
import { These, both } from 'fp-ts/lib/These'
import { alignArray } from '../Align/Array'
import { Semialign1 } from './'

/**
 * `Semialign` instance for `NonEmptyArray`.
 *
 * @since 0.1.0
 */
export const semialignNonEmptyArray: Semialign1<URI> = {
  URI,
  map: nonEmptyArray.map,
  /**
   * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array.
   * Uses the `These` data type to handle arrays of different lengths.
   *
   * @example
   * import { These } from 'fp-ts/lib/These'
   * import { identity } from 'fp-ts/lib/function'
   * import { alignNonEmptyArray } from 'fp-ts-contrib/lib/Semialign/NonEmptyArray'
   *
   * const f = (x: These<number, string>) => x.fold(a => a.toString(), identity, (a, b) => a + b)
   *
   * assert.deepStrictEqual(semialignNonEmptyArray.alignWith(new NonEmptyArray(1, [2, 3]), new NonEmptyArray('a', ['b', 'c']), f), new NonEmptyArray('1a', ['2b', '3c']))
   * assert.deepStrictEqual(semialignNonEmptyArray.alignWith(new NonEmptyArray(1, [2, 3]), new NonEmptyArray('a', ['b']), f), new NonEmptyArray('1a', ['2b', '3']))
   * assert.deepStrictEqual(semialignNonEmptyArray.alignWith(new NonEmptyArray(1, [2]), new NonEmptyArray('a', ['b', 'c']), f), new NonEmptyArray('1a', ['2b', 'c']))
   *
   * @since 0.1.0
   */
  alignWith: <A, B, C>(fa: NonEmptyArray<A>, fb: NonEmptyArray<B>, f: (x: These<A, B>) => C): NonEmptyArray<C> => {
    return cons(f(both(head(fa), head(fb))), alignArray.alignWith(tail(fa), tail(fb), f))
  },
  /**
   * Takes two arrays and returns an array of corresponding pairs combined using the `These` data type.
   *
   * @example
   * import { These } from 'fp-ts/lib/These'
   * import { identity } from 'fp-ts/lib/function'
   * import { alignNonEmptyArray } from 'fp-ts-contrib/lib/Semialign/NonEmptyArray'
   *
   * assert.deepStrictEqual(semialignNonEmptyArray.align(new NonEmptyArray(1, [2, 3]), new NonEmptyArray('a', ['b', 'c']), new NonEmptyArray(both(1, 'a'), [both(2, 'b'), both(3, 'c')]))
   * assert.deepStrictEqual(semialignNonEmptyArray.align(new NonEmptyArray(1, [2, 3]), new NonEmptyArray('a', ['b']), new NonEmptyArray(both(1, 'a'), [both(2, 'b'), this_(3)])
   * assert.deepStrictEqual(semialignNonEmptyArray.align(new NonEmptyArray(1, [2]), new NonEmptyArray('a', ['b', 'c']), new NonEmptyArray(both(1, 'a'), [both(2, 'b'), that('c')]))
   *
   * @since 0.1.0
   */
  align: <A, B>(fa: NonEmptyArray<A>, fb: NonEmptyArray<B>): NonEmptyArray<These<A, B>> => {
    return cons(both(head(fa), head(fb)), alignArray.align(tail(fa), tail(fb)))
  }
}
