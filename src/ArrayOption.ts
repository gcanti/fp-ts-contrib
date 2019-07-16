import { Alt1 } from 'fp-ts/lib/Alt'
import { array, of } from 'fp-ts/lib/Array'
import { Monad1 } from 'fp-ts/lib/Monad'
import { Option } from 'fp-ts/lib/Option'
import { getOptionM } from 'fp-ts/lib/OptionT'
import { pipeable } from 'fp-ts/lib/pipeable'

const T = getOptionM(array)

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    ArrayOption: ArrayOption<A>
  }
}

/**
 * @since 0.1.0
 */
export const URI = 'ArrayOption'

/**
 * @since 0.1.0
 */
export type URI = typeof URI

/**
 * @since 0.1.0
 */
export interface ArrayOption<A> extends Array<Option<A>> {}

/**
 * @since 0.1.0
 */
export const fromArray: <A>(as: Array<A>) => ArrayOption<A> = T.fromM

/**
 * @since 0.1.0
 */
export const fromOption: <A>(ma: Option<A>) => ArrayOption<A> = of

/**
 * @since 0.1.0
 */
export const none: ArrayOption<never> = T.none()

/**
 * @since 0.1.0
 */
export const some: <A>(a: A) => ArrayOption<A> = T.of

/**
 * @since 0.1.0
 */
export function fold<A, B>(onNone: () => Array<B>, onSome: (a: A) => Array<B>): (as: ArrayOption<A>) => Array<B> {
  return as => T.fold(as, onNone, onSome)
}

/**
 * @since 0.1.0
 */
export function getOrElse<A>(onNone: () => Array<A>): (as: ArrayOption<A>) => Array<A> {
  return as => T.getOrElse(as, onNone)
}

/**
 * @since 0.1.0
 */
export const arrayOption: Monad1<URI> & Alt1<URI> = {
  URI,
  map: T.map,
  of: some,
  ap: T.ap,
  chain: T.chain,
  alt: T.alt
}

const { alt, ap, apFirst, apSecond, chain, chainFirst, flatten, map } = pipeable(arrayOption)

export {
  /**
   * @since 0.1.0
   */
  alt,
  /**
   * @since 0.1.0
   */
  ap,
  /**
   * @since 0.1.0
   */
  apFirst,
  /**
   * @since 0.1.0
   */
  apSecond,
  /**
   * @since 0.1.0
   */
  chain,
  /**
   * @since 0.1.0
   */
  chainFirst,
  /**
   * @since 0.1.0
   */
  flatten,
  /**
   * @since 0.1.0
   */
  map
}
