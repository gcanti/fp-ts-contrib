import { Option, some, none, option, URI, isSome, isNone } from 'fp-ts/lib/Option'
import { These, left, right, both } from 'fp-ts/lib/These'
import { identity } from 'fp-ts/lib/function'

import { Align1 } from './'

/**
 * `Align` instance for `Option`.
 *
 * @since 0.1.0
 */
export const alignOption: Align1<URI> = {
  URI,
  map: option.map,
  /**
   * Unit value in regards to `align`
   *
   * @since 0.1.0
   */
  nil: <A>(): Option<A> => none,
  /**
   * Apply a function to the values of two Option's, returning an Option with the result. Uses the `These` data type
   * to handle the possibility of non existing values.
   *
   * @example
   * import { some, none } from 'fp-ts/lib/Option'
   * import { These } from 'fp-ts/lib/These'
   * import { identity } from 'fp-ts/lib/function'
   * import { alignOption } from 'fp-ts-contrib/lib/Align/Option'
   *
   * const f = (x: These<number, string>) => x.fold(a => a.toString(), identity, (a, b) => a + b)
   *
   * assert.deepStrictEqual(alignOption.alignWith(some(1), some('a'), f), some('1a'))
   * assert.deepStrictEqual(alignOption.alignWith(some(1), none, f), some('1'))
   * assert.deepStrictEqual(alignOption.alignWith(none, some('a'), f), some('a'))
   * assert.deepStrictEqual(alignOption.alignWith(none, none, f), none)
   *
   * @since 0.1.0
   */
  alignWith: <A, B, C>(fa: Option<A>, fb: Option<B>, f: (x: These<A, B>) => C): Option<C> => {
    if (isSome(fa) && isSome(fb)) {
      return some(f(both(fa.value, fb.value)))
    } else if (isNone(fa) && isSome(fb)) {
      return some(f(right(fb.value)))
    } else if (isSome(fa) && isNone(fb)) {
      return some(f(left(fa.value)))
    } else {
      return none
    }
  },
  /**
   * Takes two Option's and returns an Option with a value corresponding to the inputs combined using the `These` data type.
   *
   * @example
   * import { some, none } from 'fp-ts/lib/Option'
   * import { both, left, right } from 'fp-ts/lib/These'
   * import { alignOption } from 'fp-ts-contrib/lib/Align/Option'
   *
   * assert.deepStrictEqual(alignOption.align(some(1), some('a')), some(both(1, 'a')))
   * assert.deepStrictEqual(alignOption.align(some(1, none), some(left(1)))
   * assert.deepStrictEqual(alignOption.align(none, some('a')), some(right('a')))
   * assert.deepStrictEqual(alignOption.align(none, none), none)
   *
   * @since 0.1.0
   */
  align: <A, B>(fa: Option<A>, fb: Option<B>): Option<These<A, B>> => alignOption.alignWith(fa, fb, identity)
}
