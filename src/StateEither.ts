/**
 * @since 0.1.12
 */
import { Applicative3 } from 'fp-ts/lib/Applicative'
import { Apply3 } from 'fp-ts/lib/Apply'
import * as E from 'fp-ts/lib/Either'
import { identity, Predicate, Refinement } from 'fp-ts/lib/function'
import { Functor3 } from 'fp-ts/lib/Functor'
import { Monad3 } from 'fp-ts/lib/Monad'
import { MonadThrow3 } from 'fp-ts/lib/MonadThrow'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { State } from 'fp-ts/lib/State'
import { getStateM } from 'fp-ts/lib/StateT'

const T = getStateM(E.either)

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 0.1.12
 */
export interface StateEither<S, E, A> {
  (s: S): E.Either<E, [A, S]>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 0.1.12
 */
export const get: <S, E = never>() => StateEither<S, E, S> = T.get

/**
 * @category constructors
 * @since 0.1.12
 */
export const put: <S, E = never>(s: S) => StateEither<S, E, void> = T.put

/**
 * @category constructors
 * @since 0.1.12
 */
export const modify: <S, E = never>(f: (s: S) => S) => StateEither<S, E, void> = T.modify

/**
 * @category constructors
 * @since 0.1.12
 */
export const gets: <S, E = never, A = never>(f: (s: S) => A) => StateEither<S, E, A> = T.gets

/**
 * @category constructors
 * @since 0.1.12
 */
export const left: <S, E, A = never>(e: E) => StateEither<S, E, A> = e => fromEither(E.left(e))

/**
 * @category constructors
 * @since 0.1.12
 */
export const right: <S, E = never, A = never>(a: A) => StateEither<S, E, A> = T.of

/**
 * @category constructors
 * @since 0.1.12
 */
export const leftState: <S, E = never, A = never>(me: State<S, E>) => StateEither<S, E, A> = me => s => E.left(me(s)[0])

/**
 * @category constructors
 * @since 0.1.12
 */
export const rightState: <S, E = never, A = never>(ma: State<S, A>) => StateEither<S, E, A> = T.fromState

/**
 * @category constructors
 * @since 0.1.18
 */
export const fromOption: <E>(onNone: () => E) => <R, A>(ma: Option<A>) => StateEither<R, E, A> = onNone => ma =>
  ma._tag === 'None' ? left(onNone()) : right(ma.value)

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromEither: <S, E, A>(ma: E.Either<E, A>) => StateEither<S, E, A> = T.fromM

/**
 * @category constructors
 * @since 0.1.12
 */
export const fromEitherK: <E, A extends Array<unknown>, B>(
  f: (...a: A) => E.Either<E, B>
) => <S>(...a: A) => StateEither<S, E, B> = f => (...a) => fromEither(f(...a))

/**
 * @category constructors
 * @since 0.1.18
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(a: A) => StateEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => StateEither<R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => <R>(a: A): StateEither<R, E, A> =>
  predicate(a) ? right(a) : left(onFalse(a))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 0.1.18
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: StateEither<R, E, A>) => StateEither<R, E, B> = f => fa =>
  T.map(fa, f)

/**
 * @category Apply
 * @since 0.1.18
 */
export const ap: <R, E, A>(
  fa: StateEither<R, E, A>
) => <B>(fab: StateEither<R, E, (a: A) => B>) => StateEither<R, E, B> = fa => fab => T.ap(fab, fa)

/**
 * @category Apply
 * @since 0.1.18
 */
export const apFirst = <R, E, B>(fb: StateEither<R, E, B>) => <A>(fa: StateEither<R, E, A>): StateEither<R, E, A> =>
  pipe(
    fa,
    map(a => (_: B) => a),
    ap(fb)
  )

/**
 * @category Apply
 * @since 0.1.18
 */
export const apSecond = <R, E, B>(fb: StateEither<R, E, B>) => <A>(fa: StateEither<R, E, A>): StateEither<R, E, B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @category Applicative
 * @since 0.1.18
 */
export const of: <R, E, A>(a: A) => StateEither<R, E, A> = right

/**
 * @category Monad
 * @since 0.1.18
 */
export const chain: <R, E, A, B>(
  f: (a: A) => StateEither<R, E, B>
) => (ma: StateEither<R, E, A>) => StateEither<R, E, B> = f => ma => T.chain(ma, f)

/**
 * @category Monad
 * @since 0.1.18
 */
export const chainFirst: <R, E, A, B>(
  f: (a: A) => StateEither<R, E, B>
) => (ma: StateEither<R, E, A>) => StateEither<R, E, A> = f => ma => T.chain(ma, a => T.map(f(a), () => a))

/**
 * @since 0.1.12
 */
export const chainEitherK = <E, A, B>(
  f: (a: A) => E.Either<E, B>
): (<S>(ma: StateEither<S, E, A>) => StateEither<S, E, B>) => chain<any, E, A, B>(fromEitherK(f))

/**
 * @category Monad
 * @since 0.1.18
 */
export const flatten: <R, E, A>(mma: StateEither<R, E, StateEither<R, E, A>>) => StateEither<R, E, A> = mma =>
  T.chain(mma, identity)

export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: StateEither<R, E, A>
  ) => StateEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: StateEither<R, E, A>) => StateEither<R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => <R>(ma: StateEither<R, E, A>) =>
  T.chain(ma, a => (predicate(a) ? right(a) : left(onFalse(a))))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 0.1.12
 */
export const URI = 'StateEither'

/**
 * @category instances
 * @since 0.1.12
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind3<R, E, A> {
    StateEither: StateEither<R, E, A>
  }
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Functor: Functor3<URI> = {
  URI,
  map: T.map
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Applicative: Applicative3<URI> = {
  URI,
  map: T.map,
  ap: T.ap,
  of
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Apply: Apply3<URI> = {
  URI,
  map: T.map,
  ap: T.ap
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Monad: Monad3<URI> = {
  URI,
  map: T.map,
  ap: T.ap,
  chain: T.chain,
  of
}

/**
 * @category instances
 * @since 0.1.18
 */
export const MonadThrow: MonadThrow3<URI> = {
  URI,
  map: T.map,
  ap: T.ap,
  chain: T.chain,
  of,
  throwError: left
}

/**
 * @category instances
 * @since 0.1.12
 */
export const stateEither: Monad3<URI> & MonadThrow3<URI> = {
  URI,
  map: T.map,
  of: right,
  ap: T.ap,
  chain: T.chain,
  throwError: left
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 0.1.12
 */
export const evalState: <S, E, A>(ma: StateEither<S, E, A>, s: S) => E.Either<E, A> = T.evalState

/**
 * @since 0.1.12
 */
export const execState: <S, E, A>(ma: StateEither<S, E, A>, s: S) => E.Either<E, S> = T.execState
