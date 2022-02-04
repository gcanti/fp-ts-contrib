/**
 * @since 0.1.14
 */
import { Alt1 } from 'fp-ts/lib/Alt'
import { Applicative1 } from 'fp-ts/lib/Applicative'
import { Apply1 } from 'fp-ts/lib/Apply'
import { Alternative1 } from 'fp-ts/lib/Alternative'
import { Separated, Compactable1 } from 'fp-ts/lib/Compactable'
import { Either } from 'fp-ts/lib/Either'
import { Functor1 } from 'fp-ts/lib/Functor'
import * as O from 'fp-ts/lib/Option'
import { getOptionM } from 'fp-ts/lib/OptionT'
import { getFilterableComposition, Filterable1 } from 'fp-ts/lib/Filterable'
import { identity, Predicate, Refinement } from 'fp-ts/lib/function'
import { getSemigroup as getIOSemigroup, io, of as ioOf, map as ioMap, IO } from 'fp-ts/lib/IO'
import { IOEither } from 'fp-ts/lib/IOEither'
import { Monad1 } from 'fp-ts/lib/Monad'
import { MonadIO1 } from 'fp-ts/lib/MonadIO'
import { Monoid } from 'fp-ts/lib/Monoid'
import { pipe } from 'fp-ts/lib/pipeable'
import { Semigroup } from 'fp-ts/lib/Semigroup'

import Option = O.Option

const T = getOptionM(io)
const F = getFilterableComposition(io, O.option)

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 0.1.14
 */
export interface IOOption<A> extends IO<Option<A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 0.1.14
 */
export const none: IOOption<never> = T.none()

/**
 * @category constructors
 * @since 0.1.14
 */
export const some: <A = never>(a: A) => IOOption<A> = T.of

/**
 * @category constructors
 * @since 0.1.14
 */
export const fromIO: <A = never>(ma: IO<A>) => IOOption<A> = T.fromM

/**
 * @category constructors
 * @since 0.1.14
 */
export const fromOption: <A = never>(ma: Option<A>) => IOOption<A> = ioOf

/**
 * @category constructors
 * @since 0.1.14
 */
export const fromOptionK: <A extends Array<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => IOOption<B> = (
  f
) => (...a) => fromOption(f(...a))

/**
 * @category constructors
 * @since 0.1.14
 */
export const fromNullable: <A>(a: A) => IOOption<NonNullable<A>> = (a) => fromOption(O.fromNullable(a))

/**
 * @category constructors
 * @since 0.1.14
 */
export const fromIOEither: <A>(ma: IOEither<any, A>) => IOOption<A> = (ma) => io.map(ma, O.fromEither)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 0.1.14
 */
export const fold: <A, B>(onNone: () => IO<B>, onSome: (a: A) => IO<B>) => (ma: IOOption<A>) => IO<B> = (
  onNone,
  onSome
) => (ma) => T.fold(ma, onNone, onSome)

/**
 * @category destructors
 * @since 0.1.14
 */
export const getOrElse: <A>(onNone: () => IO<A>) => (ma: IOOption<A>) => IO<A> = (onNone) => (ma) =>
  T.getOrElse(ma, onNone)

/**
 * @category destructors
 * @since 0.1.14
 */
export const toUndefined: <A>(ma: IOOption<A>) => IO<A | undefined> = (ma) => io.map(ma, O.toUndefined)

/**
 * @category destructors
 * @since 0.1.14
 */
export const toNullable: <A>(ma: IOOption<A>) => IO<A | null> = (ma) => io.map(ma, O.toNullable)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 0.1.14
 */
export const mapNullable: <A, B>(f: (a: A) => B | null | undefined) => (ma: IOOption<A>) => IOOption<B> = (f) =>
  ioMap(O.mapNullable(f))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 0.1.18
 */
export const map: <A, B>(f: (a: A) => B) => (fa: IOOption<A>) => IOOption<B> = (f) => (fa) => T.map(fa, f)

/**
 * @category Apply
 * @since 0.1.18
 */
export const ap: <A>(fa: IOOption<A>) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B> = (fa) => (fab) => T.ap(fab, fa)

/**
 * @category Apply
 * @since 0.1.18
 */
export const apFirst = <B>(fb: IOOption<B>) => <A>(fa: IOOption<A>): IOOption<A> =>
  pipe(
    fa,
    map((a) => (_: B) => a),
    ap(fb)
  )

/**
 * @category Apply
 * @since 0.1.18
 */
export const apSecond = <B>(fb: IOOption<B>) => <A>(fa: IOOption<A>): IOOption<B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @category Applicative
 * @since 0.1.18
 */
export const of: <A>(a: A) => IOOption<A> = some

/**
 * @category Monad
 * @since 0.1.18
 */
export const chain: <A, B>(f: (a: A) => IOOption<B>) => (ma: IOOption<A>) => IOOption<B> = (f) => (ma) => T.chain(ma, f)

/**
 * @category Monad
 * @since 0.1.27
 */
export const chainIOK: <A, B>(f: (a: A) => IO<B>) => (ma: IOOption<A>) => IOOption<B> = (f) => (ma) =>
  T.chain(ma, (a) => T.fromM(f(a)))

/**
 * @category Monad
 * @since 0.1.18
 */
export const chainFirst: <A, B>(f: (a: A) => IOOption<B>) => (ma: IOOption<A>) => IOOption<A> = (f) => (ma) =>
  T.chain(ma, (a) => T.map(f(a), () => a))

/**
 * @category Monad
 * @since 0.1.27
 */
export const chainFirstIOK: <A, B>(f: (a: A) => IO<B>) => (ma: IOOption<A>) => IOOption<A> = (f) => (ma) =>
  T.chain(ma, (a) => T.map(T.fromM(f(a)), () => a))

/**
 * @category Monad
 * @since 0.1.14
 */
export const chainOptionK: <A, B>(f: (a: A) => Option<B>) => (ma: IOOption<A>) => IOOption<B> = (f) =>
  chain(fromOptionK(f))

/**
 * @category Monad
 * @since 0.1.18
 */
export const flatten: <A>(mma: IOOption<IOOption<A>>) => IOOption<A> = (mma) => T.chain(mma, identity)

/**
 * @category Alt
 * @since 0.1.18
 */
export const alt: <A>(that: () => IOOption<A>) => (fa: IOOption<A>) => IOOption<A> = (that) => (fa) => T.alt(fa, that)

/**
 * @category Alternative
 * @since 0.1.18
 */
export const zero: Alternative1<URI>['zero'] = () => () => O.none

/**
 * @category Compactable
 * @since 0.1.18
 */
export const compact: <A>(fa: IOOption<O.Option<A>>) => IOOption<A> = F.compact

/**
 * @category Compactable
 * @since 0.1.18
 */
export const separate: <A, B>(fa: IOOption<Either<A, B>>) => Separated<IOOption<A>, IOOption<B>> = F.separate

/**
 * @category Filterable
 * @since 0.1.18
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: IOOption<A>) => IOOption<B>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => IOOption<A>
} = <A>(predicate: Predicate<A>) => (fa: IOOption<A>) => F.filter(fa, predicate)

/**
 * @category Filterable
 * @since 0.1.18
 */
export const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fa: IOOption<A>) => IOOption<B> = (f) => (fa) =>
  F.filterMap(fa, f)

/**
 * @category Filterable
 * @since 0.1.18
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: IOOption<A>) => Separated<IOOption<A>, IOOption<B>>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => Separated<IOOption<A>, IOOption<A>>
} = <A>(predicate: Predicate<A>) => (fa: IOOption<A>) => F.partition(fa, predicate)

/**
 * @category Filterable
 * @since 0.1.18
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: IOOption<A>) => Separated<IOOption<B>, IOOption<C>> = (f) => (fa) => F.partitionMap(fa, f)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 0.1.14
 */
export const URI = 'IOOption'

/**
 * @category instances
 * @since 0.1.14
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    IOOption: IOOption<A>
  }
}

/**
 * @category instances
 * @since 0.1.14
 */
export const getApplySemigroup = <A>(S: Semigroup<A>): Semigroup<IOOption<A>> =>
  getIOSemigroup(O.getApplySemigroup<A>(S))

/**
 * @category instances
 * @since 0.1.14
 */
export const getApplyMonoid = <A>(M: Monoid<A>): Monoid<IOOption<A>> => ({
  concat: getApplySemigroup<A>(M).concat,
  empty: some(M.empty)
})

/**
 * @category instances
 * @since 0.1.18
 */
export const Functor: Functor1<URI> = {
  URI,
  map: T.map
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Applicative: Applicative1<URI> = {
  URI,
  map: T.map,
  ap: T.ap,
  of
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Apply: Apply1<URI> = {
  URI,
  map: T.map,
  ap: T.ap
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Monad: Monad1<URI> = {
  URI,
  map: T.map,
  ap: T.ap,
  of,
  chain: T.chain
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Alt: Alt1<URI> = {
  URI,
  map: T.map,
  alt: T.alt
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Alternative: Alternative1<URI> = {
  URI,
  map: T.map,
  ap: T.ap,
  of,
  alt: T.alt,
  zero
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Compactable: Compactable1<URI> = {
  URI,
  compact,
  separate
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Filterable: Filterable1<URI> = {
  URI,
  map: T.map,
  compact,
  separate,
  filter: F.filter,
  filterMap: F.filterMap,
  partition: F.partition,
  partitionMap: F.partitionMap
}

/**
 * @since 0.1.14
 */
export const ioOption: Monad1<URI> & Alt1<URI> & MonadIO1<URI> & Filterable1<URI> = {
  URI,
  of: some,
  ap: T.ap,
  chain: T.chain,
  alt: T.alt,
  fromIO,
  ...F
}
