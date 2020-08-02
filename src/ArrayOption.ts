/**
 * @since 0.1.0
 */
import { Alt1 } from 'fp-ts/lib/Alt'
import { Alternative1 } from 'fp-ts/lib/Alternative'
import { Applicative1 } from 'fp-ts/lib/Applicative'
import { Apply1 } from 'fp-ts/lib/Apply'
import { array, empty, of as arrayOf } from 'fp-ts/lib/Array'
import { identity } from 'fp-ts/lib/function'
import { Functor1 } from 'fp-ts/lib/Functor'
import { Monad1 } from 'fp-ts/lib/Monad'
import { Option } from 'fp-ts/lib/Option'
import { getOptionM } from 'fp-ts/lib/OptionT'
import { pipe } from 'fp-ts/lib/pipeable'

const T = getOptionM(array)

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 0.1.0
 */
export interface ArrayOption<A> extends Array<Option<A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromArray: <A>(as: Array<A>) => ArrayOption<A> = T.fromM

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromOption: <A>(ma: Option<A>) => ArrayOption<A> = arrayOf

/**
 * @category constructors
 * @since 0.1.10
 */
export const fromOptionK: <A extends Array<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => ArrayOption<B> = f => (...a) => fromOption(f(...a))

/**
 * @category constructors
 * @since 0.1.0
 */
export const none: ArrayOption<never> = T.none()

/**
 * @category constructors
 * @since 0.1.0
 */
export const some: <A>(a: A) => ArrayOption<A> = T.of

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 0.1.0
 */
export const fold: <A, B>(onNone: () => Array<B>, onSome: (a: A) => Array<B>) => (as: ArrayOption<A>) => Array<B> = (
  onNone,
  onSome
) => as => T.fold(as, onNone, onSome)

/**
 * @category destructors
 * @since 0.1.0
 */
export const getOrElse: <A>(onNone: () => Array<A>) => (as: ArrayOption<A>) => Array<A> = onNone => as =>
  T.getOrElse(as, onNone)

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 0.1.18
 */
export const map: <A, B>(f: (a: A) => B) => (fa: ArrayOption<A>) => ArrayOption<B> = f => fa => T.map(fa, f)

/**
 * @category Apply
 * @since 0.1.18
 */
export const ap: <A>(fa: ArrayOption<A>) => <B>(fab: ArrayOption<(a: A) => B>) => ArrayOption<B> = fa => fab =>
  T.ap(fab, fa)

/**
 * @category Apply
 * @since 0.1.18
 */
export const apFirst = <B>(fb: ArrayOption<B>) => <A>(fa: ArrayOption<A>): ArrayOption<A> =>
  pipe(
    fa,
    map(a => (_: B) => a),
    ap(fb)
  )

/**
 * @category Apply
 * @since 0.1.18
 */
export const apSecond = <B>(fb: ArrayOption<B>) => <A>(fa: ArrayOption<A>): ArrayOption<B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @category Applicative
 * @since 0.1.18
 */
export const of: <A>(a: A) => ArrayOption<A> = T.of

/**
 * @category Monad
 * @since 0.1.10
 */
export const chainOptionK: <A, B>(f: (a: A) => Option<B>) => (ma: ArrayOption<A>) => ArrayOption<B> = f =>
  chain(fromOptionK(f))

/**
 * @category Monad
 * @since 0.1.18
 */
export const chain: <A, B>(f: (a: A) => ArrayOption<B>) => (fa: ArrayOption<A>) => ArrayOption<B> = f => fa =>
  T.chain(fa, f)

/**
 * @category Monad
 * @since 0.1.18
 */
export const chainFirst: <A, B>(f: (a: A) => ArrayOption<B>) => (ma: ArrayOption<A>) => ArrayOption<A> = f => ma =>
  T.chain(ma, a => T.map(f(a), () => a))

/**
 * @category Monad
 * @since 0.1.18
 */
export const flatten: <A>(mma: ArrayOption<ArrayOption<A>>) => ArrayOption<A> = mma => T.chain(mma, identity)

/**
 * @category Alternative
 * @since 0.1.18
 */
export const alt: <A>(that: () => ArrayOption<A>) => (fa: ArrayOption<A>) => ArrayOption<A> = that => fa =>
  T.alt(fa, that)

/**
 * @category Alternative
 * @since 0.1.18
 */
export const zero: Alternative1<URI>['zero'] = () => empty

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 0.1.0
 */
export const URI = 'ArrayOption'

/**
 * @category instances
 * @since 0.1.0
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    ArrayOption: ArrayOption<A>
  }
}

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
 * @since 2.7.0
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
  ap: T.ap,
  map: T.map
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Monad: Monad1<URI> = {
  URI,
  ap: T.ap,
  chain: T.chain,
  map: T.map,
  of: T.of
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Alt: Alt1<URI> = {
  URI,
  alt: T.alt,
  map: T.map
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Alternative: Alternative1<URI> = {
  URI,
  alt: T.alt,
  ap: T.ap,
  map: T.map,
  of: T.of,
  zero
}

/**
 * @category
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
