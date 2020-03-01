/**
 * @since 0.1.14
 */
import { Alt1 } from 'fp-ts/lib/Alt'
import * as O from 'fp-ts/lib/Option'
import { getOptionM } from 'fp-ts/lib/OptionT'
import { getFilterableComposition, Filterable1 } from 'fp-ts/lib/Filterable'
import { getSemigroup as getIOSemigroup, IO, io, of, map as ioMap } from 'fp-ts/lib/IO'
import { Monad1 } from 'fp-ts/lib/Monad'
import { MonadIO1 } from 'fp-ts/lib/MonadIO'
import { Monoid } from 'fp-ts/lib/Monoid'
import { pipeable } from 'fp-ts/lib/pipeable'
import { Semigroup } from 'fp-ts/lib/Semigroup'

import Option = O.Option
import { IOEither } from 'fp-ts/lib/IOEither'

const T = getOptionM(io)

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    IOOption: IOOption<A>
  }
}

/**
 * @since 0.1.14
 */
export const URI = 'IOOption'

/**
 * @since 0.1.14
 */
export type URI = typeof URI

/**
 * @since 0.1.14
 */
export interface IOOption<A> extends IO<Option<A>> {}

/**
 * @since 0.1.14
 */
export const none: IOOption<never> = T.none()

/**
 * @since 0.1.14
 */
export const some: <A = never>(a: A) => IOOption<A> = T.of

/**
 * @since 0.1.14
 */
export const fromIO: <A = never>(ma: IO<A>) => IOOption<A> = T.fromM

/**
 * @since 0.1.14
 */
export const fromOption: <A = never>(ma: Option<A>) => IOOption<A> = of

/**
 * @since 0.1.14
 */
export function fold<A, B>(onNone: () => IO<B>, onSome: (a: A) => IO<B>): (ma: IOOption<A>) => IO<B> {
  return ma => T.fold(ma, onNone, onSome)
}

/**
 * @since 0.1.14
 */
export function fromNullable<A>(a: A): IOOption<NonNullable<A>> {
  return fromOption(O.fromNullable(a))
}

/**
 * @since 0.1.14
 */
export function getOrElse<A>(onNone: () => IO<A>): (ma: IOOption<A>) => IO<A> {
  return ma => T.getOrElse(ma, onNone)
}

/**
 * @since 0.1.14
 */
export function fromIOEither<A>(ma: IOEither<any, A>): IOOption<A> {
  return io.map(ma, O.fromEither)
}

/**
 * @since 0.1.14
 */
export function toUndefined<A>(ma: IOOption<A>): IO<A | undefined> {
  return io.map(ma, O.toUndefined)
}

/**
 * @since 0.1.14
 */
export function toNullable<A>(ma: IOOption<A>): IO<A | null> {
  return io.map(ma, O.toNullable)
}

/**
 * @since 0.1.14
 */
export function mapNullable<A, B>(f: (a: A) => B | null | undefined): (ma: IOOption<A>) => IOOption<B> {
  return ioMap(O.mapNullable(f))
}

/**
 * @since 0.1.14
 */
export function getApplySemigroup<A>(S: Semigroup<A>): Semigroup<IOOption<A>> {
  return getIOSemigroup(O.getApplySemigroup<A>(S))
}

/**
 * @since 0.1.14
 */
export function getApplyMonoid<A>(M: Monoid<A>): Monoid<IOOption<A>> {
  return {
    concat: getApplySemigroup<A>(M).concat,
    empty: some(M.empty)
  }
}

/**
 * @since 0.1.14
 */
export function fromOptionK<A extends Array<unknown>, B>(f: (...a: A) => Option<B>): (...a: A) => IOOption<B> {
  return (...a) => fromOption(f(...a))
}

/**
 * @since 0.1.14
 */
export function chainOptionK<A, B>(f: (a: A) => Option<B>): (ma: IOOption<A>) => IOOption<B> {
  return chain(fromOptionK(f))
}

/**
 * @since 0.1.14
 */
export const ioOption: Monad1<URI> & Alt1<URI> & MonadIO1<URI> & Filterable1<URI> = {
  URI,
  map: T.map,
  of: some,
  ap: T.ap,
  chain: T.chain,
  alt: T.alt,
  fromIO,
  ...getFilterableComposition(io, O.option)
}

const {
  alt,
  ap,
  apFirst,
  apSecond,
  chain,
  chainFirst,
  flatten,
  map,
  partition,
  partitionMap,
  filter,
  filterMap,
  compact,
  separate
} = pipeable(ioOption)

export {
  /**
   * @since 0.1.14
   */
  alt,
  /**
   * @since 0.1.14
   */
  ap,
  /**
   * @since 0.1.14
   */
  apFirst,
  /**
   * @since 0.1.14
   */
  apSecond,
  /**
   * @since 0.1.14
   */
  chain,
  /**
   * @since 0.1.14
   */
  chainFirst,
  /**
   * @since 0.1.14
   */
  flatten,
  /**
   * @since 0.1.14
   */
  map,
  /**
   * @since 0.1.14
   */
  partition,
  /**
   * @since 0.1.14
   */
  partitionMap,
  /**
   * @since 0.1.14
   */
  filter,
  /**
   * @since 0.1.14
   */
  filterMap,
  /**
   * @since 0.1.14
   */
  compact,
  /**
   * @since 0.1.14
   */
  separate
}
