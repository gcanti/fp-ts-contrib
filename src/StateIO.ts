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
import { State } from 'fp-ts/lib/State'
import { getStateM } from 'fp-ts/lib/StateT'

import IO = I.IO

const T = getStateM(I.io)

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 0.1.0
 */
export interface StateIO<S, A> {
  (s: S): IO<[A, S]>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 0.1.0
 */
export const get: <S>() => StateIO<S, S> = T.get

/**
 * @category constructors
 * @since 0.1.0
 */
export const put: <S>(s: S) => StateIO<S, void> = T.put

/**
 * @category constructors
 * @since 0.1.0
 */
export const modify: <S>(f: (s: S) => S) => StateIO<S, void> = T.modify

/**
 * @category constructors
 * @since 0.1.0
 */
export const gets: <S, A>(f: (s: S) => A) => StateIO<S, A> = T.gets

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromIO: <S, A>(ma: IO<A>) => StateIO<S, A> = T.fromM

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromState: <S, A>(ma: State<S, A>) => StateIO<S, A> = T.fromState

/**
 * @category constructors
 * @since 0.1.10
 */
export const fromIOK: <A extends Array<unknown>, B>(f: (...a: A) => IO<B>) => <R>(...a: A) => StateIO<R, B> = f => (
  ...a
) => fromIO(f(...a))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 0.1.18
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: StateIO<E, A>) => StateIO<E, B> = f => fa => T.map(fa, f)

/**
 * @category Apply
 * @since 0.1.18
 */
export const ap: <E, A>(fa: StateIO<E, A>) => <B>(fab: StateIO<E, (a: A) => B>) => StateIO<E, B> = fa => fab =>
  T.ap(fab, fa)

/**
 * @category Apply
 * @since 0.1.18
 */
export const apFirst = <E, B>(fb: StateIO<E, B>) => <A>(fa: StateIO<E, A>): StateIO<E, A> =>
  pipe(
    fa,
    map(a => (_: B) => a),
    ap(fb)
  )

/**
 * @category Apply
 * @since 0.1.18
 */
export const apSecond = <E, B>(fb: StateIO<E, B>) => <A>(fa: StateIO<E, A>): StateIO<E, B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @category Applicative
 * @since 0.1.18
 */
export const of: <E, A>(a: A) => StateIO<E, A> = T.of

/**
 * @category Monad
 * @since 0.1.18
 */
export const chain: <E, A, B>(f: (a: A) => StateIO<E, B>) => (ma: StateIO<E, A>) => StateIO<E, B> = f => ma =>
  T.chain(ma, f)

/**
 * @category Monad
 * @since 0.1.18
 */
export const chainFirst: <E, A, B>(f: (a: A) => StateIO<E, B>) => (ma: StateIO<E, A>) => StateIO<E, A> = f => ma =>
  T.chain(ma, a => T.map(f(a), () => a))

/**
 * @category Monad
 * @since 0.1.10
 */
export const chainIOK = <A, B>(f: (a: A) => IO<B>): (<R>(ma: StateIO<R, A>) => StateIO<R, B>) =>
  chain<any, A, B>(fromIOK(f))

/**
 * @category Monad
 * @since 0.1.18
 */
export const flatten: <E, A>(mma: StateIO<E, StateIO<E, A>>) => StateIO<E, A> = mma => T.chain(mma, identity)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 0.1.0
 */
export const URI = 'StateIO'

/**
 * @category instances
 * @since 0.1.0
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    StateIO: StateIO<E, A>
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
export const stateIO: Monad2<URI> = {
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
export const evalState: <S, A>(ma: StateIO<S, A>, s: S) => IO<A> = T.evalState

/**
 * @since 0.1.0
 */
export const execState: <S, A>(ma: StateIO<S, A>, s: S) => IO<S> = T.execState

/**
 * @since 0.1.0
 */
export const run: <S, A>(ma: StateIO<S, A>, s: S) => A = (ma, s) => ma(s)()[0]
