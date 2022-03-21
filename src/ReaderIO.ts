/**
 * @since 0.1.0
 */
import { Applicative2 } from 'fp-ts/lib/Applicative'
import { Apply2 } from 'fp-ts/lib/Apply'
import { identity } from 'fp-ts/lib/function'
import { Functor2 } from 'fp-ts/lib/Functor'
import * as I from 'fp-ts/lib/IO'
import { Monad2 } from 'fp-ts/lib/Monad'
import { pipe } from 'fp-ts/lib/pipeable'
import { Reader } from 'fp-ts/lib/Reader'
import { getReaderM } from 'fp-ts/lib/ReaderT'

import IO = I.IO

const T = getReaderM(I.io)

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 0.1.0
 */
export interface ReaderIO<R, A> {
  (r: R): IO<A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromIO: <R, A>(ma: IO<A>) => ReaderIO<R, A> = T.fromM

/**
 * @category constructors
 * @since 0.1.10
 */
export const fromIOK: <A extends Array<unknown>, B>(f: (...a: A) => IO<B>) => <R>(...a: A) => ReaderIO<R, B> = (f) => (
  ...a
) => fromIO(f(...a))

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromReader: <R, A>(ma: Reader<R, A>) => ReaderIO<R, A> = T.fromReader

/**
 * @category constructors
 * @since 0.1.0
 */
export const ask: <R>() => ReaderIO<R, R> = T.ask

/**
 * @category constructors
 * @since 0.1.0
 */
export const asks: <R, A>(f: (r: R) => A) => ReaderIO<R, A> = T.asks

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 0.1.0
 */
export const local: <Q, R>(f: (f: Q) => R) => <A>(ma: ReaderIO<R, A>) => ReaderIO<Q, A> = (f) => (ma) => T.local(ma, f)

/**
 * Less strict version of [`asksReaderIO`](#asksreaderio).
 *
 * @category combinators
 * @since 0.1.27
 */
// TODO: use R.asksReaderW when fp-ts version >= 2.11.0
export const asksReaderIOW: <R1, R2, A>(f: (r1: R1) => ReaderIO<R2, A>) => ReaderIO<R1 & R2, A> = (f) => (r) => f(r)(r)

/**
 * Effectfully accesses the environment.
 *
 * @category combinators
 * @since 0.1.27
 */
export const asksReaderIO: <R, A>(f: (r: R) => ReaderIO<R, A>) => ReaderIO<R, A> = asksReaderIOW

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 0.1.18
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: ReaderIO<E, A>) => ReaderIO<E, B> = (f) => (fa) => T.map(fa, f)

/**
 * @category Apply
 * @since 0.1.18
 */
export const ap: <E, A>(fa: ReaderIO<E, A>) => <B>(fab: ReaderIO<E, (a: A) => B>) => ReaderIO<E, B> = (fa) => (fab) =>
  T.ap(fab, fa)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 0.1.28
 */
export const apW: <R2, A>(
  fa: ReaderIO<R2, A>
) => <R1, B>(fab: ReaderIO<R1, (a: A) => B>) => ReaderIO<R1 & R2, B> = ap as any

/**
 * @category Apply
 * @since 0.1.18
 */
export const apFirst = <E, B>(fb: ReaderIO<E, B>) => <A>(fa: ReaderIO<E, A>): ReaderIO<E, A> =>
  pipe(
    fa,
    map((a) => (_: B) => a),
    ap(fb)
  )

/**
 * @category Apply
 * @since 0.1.18
 */
export const apSecond = <E, B>(fb: ReaderIO<E, B>) => <A>(fa: ReaderIO<E, A>): ReaderIO<E, B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @category Applicative
 * @since 0.1.18
 */
export const of: <E, A>(a: A) => ReaderIO<E, A> = T.of

/**
 * @category Monad
 * @since 0.1.18
 */
export const chain: <E, A, B>(f: (a: A) => ReaderIO<E, B>) => (ma: ReaderIO<E, A>) => ReaderIO<E, B> = (f) => (ma) =>
  T.chain(ma, f)

/**
 * Less strict version of  [`chain`](#chain).
 *
 * @category Monad
 * @since 0.1.28
 */
export const chainW: <R2, A, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, B> = chain as any

/**
 * @category Monad
 * @since 0.1.18
 */
export const chainFirst: <E, A, B>(f: (a: A) => ReaderIO<E, B>) => (ma: ReaderIO<E, A>) => ReaderIO<E, A> = (f) => (
  ma
) => T.chain(ma, (a) => T.map(f(a), () => a))

/**
 * Less strict version of [`chainFirst`](#chainfirst).
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 0.1.28
 */
export const chainFirstW: <R2, A, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, A> = chainFirst as any

/**
 * @category Monad
 * @since 0.1.10
 */
export const chainIOK = <A, B>(f: (a: A) => IO<B>): (<R>(ma: ReaderIO<R, A>) => ReaderIO<R, B>) =>
  chain<any, A, B>(fromIOK(f))

/**
 * Less strict version of [`flatten`](#flatten).
 *
 * @category Monad
 * @since 0.1.28
 */
export const flattenW: <R1, R2, A>(mma: ReaderIO<R1, ReaderIO<R2, A>>) => ReaderIO<R1 & R2, A> = chainW(identity)

/**
 * @category Monad
 * @since 0.1.18
 */
export const flatten: <E, A>(mma: ReaderIO<E, ReaderIO<E, A>>) => ReaderIO<E, A> = flattenW

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 0.1.0
 */
export const URI = 'ReaderIO'

/**
 * @category instances
 * @since 0.1.0
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    ReaderIO: ReaderIO<E, A>
  }
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Functor: Functor2<URI> = {
  URI,
  map: T.map
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Applicative: Applicative2<URI> = {
  URI,
  map: T.map,
  ap: T.ap,
  of
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Apply: Apply2<URI> = {
  URI,
  map: T.map,
  ap: T.ap
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Monad: Monad2<URI> = {
  URI,
  map: T.map,
  ap: T.ap,
  chain: T.chain,
  of
}

/**
 * @category instances
 * @since 0.1.0
 */
export const readerIO: Monad2<URI> = {
  URI,
  map: T.map,
  of: T.of,
  ap: T.ap,
  chain: T.chain
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 0.1.0
 */
export const run: <R, A>(ma: ReaderIO<R, A>, r: R) => A = (ma, r) => ma(r)()
