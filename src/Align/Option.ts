import { Option, some, none, option, URI } from 'fp-ts/lib/Option'
import { These, this_, that, both } from 'fp-ts/lib/These'
import { identity } from 'fp-ts/lib/function'

import { Align1 } from './'

/**
 * `Align` instance for `Option`.
 *
 * @since 0.0.3
 */
export const alignOption: Align1<URI> = {
  URI,
  map: option.map,
  /**
   * Unit value in regards to `align`
   *
   * @since 0.0.3
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
   * @since 0.0.3
   */
  alignWith: <A, B, C>(fa: Option<A>, fb: Option<B>, f: (x: These<A, B>) => C): Option<C> => {
    if (fa.isSome() && fb.isSome()) {
      return some(f(both(fa.value, fb.value)))
    } else if (fa.isNone() && fb.isSome()) {
      return some(f(that(fb.value)))
    } else if (fa.isSome() && fb.isNone()) {
      return some(f(this_(fa.value)))
    } else {
      return none
    }
  },
  /**
   * Takes two Option's and returns an Option with a value corresponding to the inputs combined using the `These` data type.
   *
   * @example
   * import { some, none } from 'fp-ts/lib/Option'
   * import { both, this_, that } from 'fp-ts/lib/These'
   * import { alignOption } from 'fp-ts-contrib/lib/Align/Option'
   *
   * assert.deepStrictEqual(alignOption.align(some(1), some('a')), some(both(1, 'a')))
   * assert.deepStrictEqual(alignOption.align(some(1, none), some(this_(1)))
   * assert.deepStrictEqual(alignOption.align(none, some('a')), some(that('a')))
   * assert.deepStrictEqual(alignOption.align(none, none), none)
   *
   * @since 0.0.3
   */
  align: <A, B>(fa: Option<A>, fb: Option<B>): Option<These<A, B>> => alignOption.alignWith(fa, fb, identity)
}
