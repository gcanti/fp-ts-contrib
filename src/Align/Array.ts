import { These, this_, that, both } from 'fp-ts/lib/These'
import { array, URI, catOptions } from 'fp-ts/lib/Array'
import { Option } from 'fp-ts/lib/Option'
import { identity, tuple } from 'fp-ts/lib/function'

import { Align1, padZipWith } from './'

/**
 * `Align` instance for `Array`.
 *
 * @since 0.0.3
 */
export const alignArray: Align1<URI> = {
  URI,
  map: array.map,
  /**
   * Unit value in regards to `align`
   */
  nil: <A>(): Array<A> => [],
  /**
   * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array.
   * Uses the `These` data type to handle arrays of different lengths.
   *
   * @example
   * import { These } from 'fp-ts/lib/These'
   * import { identity } from 'fp-ts/lib/function'
   * import { alignArray } from 'fp-ts-contrib/lib/Align/Array'
   *
   * const f = (x: These<number, string>) => x.fold(a => a.toString(), identity, (a, b) => a + b)
   *
   * assert.deepStrictEqual(alignArray.alignWith([1, 2], ['a', 'b'], f), ['1a', '2b'])
   * assert.deepStrictEqual(alignArray.alignWith([1, 2], ['a'], f), ['1a', '2'])
   * assert.deepStrictEqual(alignArray.alignWith([1], ['a' 'b'], f), ['1a', 'b'])
   *
   * @since 0.0.3
   */
  alignWith: <A, B, C>(fa: Array<A>, fb: Array<B>, f: (x: These<A, B>) => C): Array<C> => {
    const fc = []
    const aLen = fa.length
    const bLen = fb.length
    const len = Math.min(aLen, bLen)
    for (let i = 0; i < len; i++) {
      fc[i] = f(both(fa[i], fb[i]))
    }
    if (aLen > bLen) {
      for (let i = bLen; i < aLen; i++) {
        fc[i] = f(this_<A, B>(fa[i]))
      }
    } else {
      for (let i = aLen; i < bLen; i++) {
        fc[i] = f(that<A, B>(fb[i]))
      }
    }
    return fc
  },
  /**
   * Takes two arrays and returns an array of corresponding pairs combined using the `These` data type.
   *
   * @example
   * import { These } from 'fp-ts/lib/These'
   * import { identity } from 'fp-ts/lib/function'
   * import { alignArray } from 'fp-ts-contrib/lib/Align/Array'
   *
   * assert.deepStrictEqual(alignArray.align([1, 2], ['a', 'b']), [both(1, 'a'), both(2, 'b')])
   * assert.deepStrictEqual(alignArray.align([1, 2], ['a']), [both(1, 'a'), this_(2)])
   * assert.deepStrictEqual(alignArray.align([1], ['a' 'b']), [both(1, 'a'), that('b')])
   *
   * @since 0.0.3
   */
  align: <A, B>(fa: Array<A>, fb: Array<B>): Array<These<A, B>> => {
    return alignArray.alignWith<A, B, These<A, B>>(fa, fb, identity)
  }
}

/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If the
 * left input array is short, it will be padded using `none`.
 *
 * It is similar to `zipWith`, but it doesn't discard elements when the left input array is shorter than the right.
 *
 * @example
 * import { Option } from 'fp-ts/lib/Option'
 * import { lpadZipWith } from 'fp-ts-contrib/lib/Align/Array'
 *
 * const f = (ma: Option<number>, b: string) => ma.fold('*', a => a.toString()) + b
 * assert.deepStrictEqual(lpadZipWith([1, 2, 3], ['a', 'b', 'c', 'd'], f), ['1a', '2b', '3c', '*d'])
 * assert.deepStrictEqual(lpadZipWith([1, 2, 3, 4], ['a', 'b', 'c'], f), ['1a', '2b', '3c'])
 *
 * @since 0.0.3
 */
export function lpadZipWith<A, B, C>(xs: Array<A>, ys: Array<B>, f: (a: Option<A>, b: B) => C): Array<C> {
  return catOptions(padZipWith(alignArray)(xs, ys, (ma, mb) => mb.map(b => f(ma, b))))
}

/**
 * Takes two arrays and returns an array of corresponding pairs. If the left input array is short, it will be
 * padded using `none`.
 *
 * It is similar to `zip`, but it doesn't discard elements when the left input array is shorter than the right.
 *
 * @example
 * import { some, none } from 'fp-ts/lib/Option'
 * import { lpadZip } from 'fp-ts-contrib/lib/Align/Array'
 *
 * assert.deepStrictEqual(lpadZip([1, 2], ['a', 'b', 'c']), [[some(1), 'a'], [some(2), 'b'], [none, 'c']])
 * assert.deepStrictEqual(lpadZip([1, 2, 3], ['a', 'b']), [[some(1), 'a'], [some(2), 'b']])
 *
 * @since 0.0.3
 */
export function lpadZip<A, B>(xs: Array<A>, ys: Array<B>): Array<[Option<A>, B]> {
  return lpadZipWith(xs, ys, (a, b) => tuple(a, b))
}

/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If the
 * right input array is short, it will be padded using `none`.
 *
 * It is similar to `zipWith`, but it doesn't discard elements when the right input array is shorter than the left.
 *
 * @example
 * import { Option } from 'fp-ts/lib/Option'
 * import { rpadZipWith } from 'fp-ts-contrib/lib/Align/Array'
 *
 * const f = (a: number, mb: Option<string>) => a.toString() + mb.getOrElse('*')
 * assert.deepStrictEqual(rpadZipWith([1, 2, 3, 4], ['a', 'b', 'c'], f), ['1a', '2b', '3c', '4*'])
 * assert.deepStrictEqual(rpadZipWith([1, 2, 3], ['a', 'b', 'c', 'd'], f), ['1a', '2b', '3c'])
 *
 * @since 0.0.3
 */
export function rpadZipWith<A, B, C>(xs: Array<A>, ys: Array<B>, f: (a: A, b: Option<B>) => C): Array<C> {
  return lpadZipWith(ys, xs, (a, b) => f(b, a))
}

/**
 * Takes two arrays and returns an array of corresponding pairs. If the right input array is short, it will be
 * padded using `none`.
 *
 * It is similar to `zip`, but it doesn't discard elements when the right input array is shorter than the left.
 *
 * @example
 * import { some, none } from 'fp-ts/lib/Option'
 * import { rpadZip } from 'fp-ts-contrib/lib/Align/Array'
 *
 * assert.deepStrictEqual(rpadZip([1, 2, 3], ['a', 'b']), [[1, some('a')], [2, some('b')], [3, none]])
 * assert.deepStrictEqual(rpadZip([1, 2], ['a', 'b', 'c']), [[1, some('a')], [2, some('b')]])
 *
 * @since 0.0.3
 */
export function rpadZip<A, B>(xs: Array<A>, ys: Array<B>): Array<[A, Option<B>]> {
  return rpadZipWith(xs, ys, (a, b) => tuple(a, b))
}
