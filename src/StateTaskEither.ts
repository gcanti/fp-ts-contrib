/**
 * @since 0.1.0
 */
import { Applicative3 } from 'fp-ts/lib/Applicative'
import { Apply3 } from 'fp-ts/lib/Apply'
import { Either } from 'fp-ts/lib/Either'
import { identity, Predicate, Refinement } from 'fp-ts/lib/function'
import { Functor3 } from 'fp-ts/lib/Functor'
import { IO } from 'fp-ts/lib/IO'
import { IOEither } from 'fp-ts/lib/IOEither'
import { Monad3 } from 'fp-ts/lib/Monad'
import { MonadThrow3 } from 'fp-ts/lib/MonadThrow'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { State } from 'fp-ts/lib/State'
import { getStateM } from 'fp-ts/lib/StateT'
import { Task } from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'

import TaskEither = TE.TaskEither

const T = getStateM(TE.taskEither)

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 0.1.0
 */
export interface StateTaskEither<S, E, A> {
  (s: S): TaskEither<E, [A, S]>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 0.1.0
 */
export const get: <S>() => StateTaskEither<S, never, S> = T.get

/**
 * @category constructors
 * @since 0.1.0
 */
export const put: <S>(s: S) => StateTaskEither<S, never, void> = T.put

/**
 * @category constructors
 * @since 0.1.0
 */
export const modify: <S>(f: (s: S) => S) => StateTaskEither<S, never, void> = T.modify

/**
 * @category constructors
 * @since 0.1.0
 */
export const gets: <S, A>(f: (s: S) => A) => StateTaskEither<S, never, A> = T.gets

/**
 * @category constructors
 * @since 0.1.0
 */
export const left: <S, E>(e: E) => StateTaskEither<S, E, never> = (e) => fromTaskEither(TE.left(e))

/**
 * @category constructors
 * @since 0.1.0
 */
export const right: <S, A>(a: A) => StateTaskEither<S, never, A> = T.of

/**
 * @category constructors
 * @since 0.1.0
 */
export const leftIO: <S, E>(me: IO<E>) => StateTaskEither<S, E, never> = (me) => fromTaskEither(TE.leftIO(me))

/**
 * @category constructors
 * @since 0.1.0
 */
export const rightIO: <S, A>(ma: IO<A>) => StateTaskEither<S, never, A> = (ma) => fromTaskEither(TE.rightIO(ma))

/**
 * @category constructors
 * @since 0.1.0
 */
export const leftTask: <S, E>(me: Task<E>) => StateTaskEither<S, E, never> = (me) => fromTaskEither(TE.leftTask(me))

/**
 * @category constructors
 * @since 0.1.0
 */
export const rightTask: <S, A>(ma: Task<A>) => StateTaskEither<S, never, A> = (ma) => fromTaskEither(TE.rightTask(ma))

/**
 * @category constructors
 * @since 0.1.0
 */
export const leftState: <S, E>(me: State<S, E>) => StateTaskEither<S, E, never> = (me) => (s) => TE.left(me(s)[0])

/**
 * @category constructors
 * @since 0.1.0
 */
export const rightState: <S, A>(ma: State<S, A>) => StateTaskEither<S, never, A> = T.fromState

/**
 * @category constructors
 * @since 0.1.18
 */
export const fromOption: <E>(onNone: () => E) => <R, A>(ma: Option<A>) => StateTaskEither<R, E, A> = (onNone) => (ma) =>
  ma._tag === 'None' ? left(onNone()) : right(ma.value)

/**
 * @category constructors
 * @since 0.1.18
 */
export const fromEither: <R, E, A>(ma: Either<E, A>) => StateTaskEither<R, E, A> = (ma) =>
  ma._tag === 'Left' ? left(ma.left) : right(ma.right)

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromIOEither: <S, E, A>(ma: IOEither<E, A>) => StateTaskEither<S, E, A> = (ma) =>
  fromTaskEither(TE.fromIOEither(ma))

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromTaskEither: <S, E, A>(ma: TaskEither<E, A>) => StateTaskEither<S, E, A> = T.fromM

/**
 * @category constructors
 * @since 0.1.10
 */
export const fromEitherK: <E, A extends Array<unknown>, B>(
  f: (...a: A) => Either<E, B>
) => <S>(...a: A) => StateTaskEither<S, E, B> = (f) => (...a) => fromEither(f(...a))

/**
 * @category constructors
 * @since 0.1.10
 */
export const fromIOEitherK: <E, A extends Array<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
) => <S>(...a: A) => StateTaskEither<S, E, B> = (f) => (...a) => fromIOEither(f(...a))

/**
 * @category constructors
 * @since 0.1.10
 */
export const fromTaskEitherK: <E, A extends Array<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
) => <S>(...a: A) => StateTaskEither<S, E, B> = (f) => (...a) => fromTaskEither(f(...a))

/**
 * @category constructors
 * @since 0.1.18
 */
export const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(a: A) => StateTaskEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => StateTaskEither<R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => <R>(a: A): StateTaskEither<R, E, A> =>
  predicate(a) ? right(a) : left(onFalse(a))

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 0.1.18
 */
export const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: StateTaskEither<R, E, A>
  ) => StateTaskEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: StateTaskEither<R, E, A>) => StateTaskEither<R, E, A>
} = <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E) => <R>(
  ma: StateTaskEither<R, E, A>
): StateTaskEither<R, E, A> => T.chain(ma, (a) => (predicate(a) ? right(a) : left(onFalse(a))))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 0.1.18
 */
export const map: <A, B>(f: (a: A) => B) => <R, E>(fa: StateTaskEither<R, E, A>) => StateTaskEither<R, E, B> = (f) => (
  fa
) => T.map(fa, f)

/**
 * @category Apply
 * @since 0.1.18
 */
export const ap: <R, E, A>(
  fa: StateTaskEither<R, E, A>
) => <B>(fab: StateTaskEither<R, E, (a: A) => B>) => StateTaskEither<R, E, B> = (fa) => (fab) => T.ap(fab, fa)

/**
 * @category Apply
 * @since 0.1.18
 */
export const apFirst = <R, E, B>(fb: StateTaskEither<R, E, B>) => <A>(
  fa: StateTaskEither<R, E, A>
): StateTaskEither<R, E, A> =>
  pipe(
    fa,
    map((a) => (_: B) => a),
    ap(fb)
  )

/**
 * @category Apply
 * @since 0.1.18
 */
export const apSecond = <R, E, B>(fb: StateTaskEither<R, E, B>) => <A>(
  fa: StateTaskEither<R, E, A>
): StateTaskEither<R, E, B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @category Applicative
 * @since 0.1.18
 */
export const of: <R, E, A>(a: A) => StateTaskEither<R, E, A> = right

/**
 * @category Monad
 * @since 0.1.18
 */
export const chain: <R, E, A, B>(
  f: (a: A) => StateTaskEither<R, E, B>
) => (ma: StateTaskEither<R, E, A>) => StateTaskEither<R, E, B> = (f) => (ma) => T.chain(ma, f)

/**
 * @category Monad
 * @since 0.1.18
 */
export const chainFirst: <R, E, A, B>(
  f: (a: A) => StateTaskEither<R, E, B>
) => (ma: StateTaskEither<R, E, A>) => StateTaskEither<R, E, A> = (f) => (ma) =>
  T.chain(ma, (a) => T.map(f(a), () => a))

/**
 * @category Monad
 * @since 0.1.10
 */
export const chainEitherK = <E, A, B>(
  f: (a: A) => Either<E, B>
): (<S>(ma: StateTaskEither<S, E, A>) => StateTaskEither<S, E, B>) => chain<any, E, A, B>(fromEitherK(f))

/**
 * @category Monad
 * @since 0.1.10
 */
export const chainIOEitherK = <E, A, B>(
  f: (a: A) => IOEither<E, B>
): (<S>(ma: StateTaskEither<S, E, A>) => StateTaskEither<S, E, B>) => chain<any, E, A, B>(fromIOEitherK(f))

/**
 * @category Monad
 * @since 0.1.10
 */
export const chainTaskEitherK = <E, A, B>(
  f: (a: A) => TaskEither<E, B>
): (<S>(ma: StateTaskEither<S, E, A>) => StateTaskEither<S, E, B>) => chain<any, E, A, B>(fromTaskEitherK(f))

/**
 * @category Monad
 * @since 0.1.18
 */
export const flatten: <R, E, A>(mma: StateTaskEither<R, E, StateTaskEither<R, E, A>>) => StateTaskEither<R, E, A> = (
  mma
) => T.chain(mma, identity)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 0.1.0
 */
export const URI = 'StateTaskEither'

/**
 * @category instances
 * @since 0.1.0
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind3<R, E, A> {
    StateTaskEither: StateTaskEither<R, E, A>
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
 * @since 0.1.0
 */
export const stateTaskEither: Monad3<URI> & MonadThrow3<URI> = {
  URI,
  map: T.map,
  of: right,
  ap: T.ap,
  chain: T.chain,
  throwError: left
}

/**
 * Like `stateTaskEither` but `ap` is sequential
 *
 * @category instances
 * @since 0.1.0
 */
export const stateTaskEitherSeq: typeof stateTaskEither = {
  ...stateTaskEither,
  ap: (mab, ma) => T.chain(mab, (f) => T.map(ma, f))
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 0.1.0
 */
export const evalState: <S, E, A>(ma: StateTaskEither<S, E, A>, s: S) => TaskEither<E, A> = T.evalState

/**
 * @since 0.1.0
 */
export const execState: <S, E, A>(ma: StateTaskEither<S, E, A>, s: S) => TaskEither<E, S> = T.execState

/**
 * @since 0.1.0
 */
export const run: <S, E, A>(ma: StateTaskEither<S, E, A>, s: S) => Promise<Either<E, [A, S]>> = (ma, s) => ma(s)()
