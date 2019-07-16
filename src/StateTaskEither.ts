import { Either } from 'fp-ts/lib/Either'
import { IO } from 'fp-ts/lib/IO'
import { IOEither } from 'fp-ts/lib/IOEither'
import { Monad3 } from 'fp-ts/lib/Monad'
import { MonadThrow3 } from 'fp-ts/lib/MonadThrow'
import { State } from 'fp-ts/lib/State'
import { getStateM } from 'fp-ts/lib/StateT'
import { Task } from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import TaskEither = TE.TaskEither
import { pipeable } from 'fp-ts/lib/pipeable'

const T = getStateM(TE.taskEither)

declare module 'fp-ts/lib/HKT' {
  interface URItoKind3<R, E, A> {
    StateTaskEither: StateTaskEither<R, E, A>
  }
}

/**
 * @since 0.1.0
 */
export const URI = 'StateTaskEither'

/**
 * @since 0.1.0
 */
export type URI = typeof URI

/**
 * @since 0.1.0
 */
export interface StateTaskEither<S, E, A> {
  (s: S): TaskEither<E, [A, S]>
}

/**
 * @since 0.1.0
 */
export function run<S, E, A>(ma: StateTaskEither<S, E, A>, s: S): Promise<Either<E, [A, S]>> {
  return ma(s)()
}

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
export function left<S, E>(e: E): StateTaskEither<S, E, never> {
  return fromTaskEither(TE.left(e))
}

/**
 * @since 0.1.0
 */
export const right: <S, A>(a: A) => StateTaskEither<S, never, A> = T.of

/**
 * @since 0.1.0
 */
export function rightTask<S, A>(ma: Task<A>): StateTaskEither<S, never, A> {
  return fromTaskEither(TE.rightTask(ma))
}

/**
 * @since 0.1.0
 */
export function leftTask<S, E>(me: Task<E>): StateTaskEither<S, E, never> {
  return fromTaskEither(TE.leftTask(me))
}

/**
 * @since 0.1.0
 */
export const fromTaskEither: <S, E, A>(ma: TaskEither<E, A>) => StateTaskEither<S, E, A> = T.fromM

/**
 * @since 0.1.0
 */
export function fromIOEither<S, E, A>(ma: IOEither<E, A>): StateTaskEither<S, E, A> {
  return fromTaskEither(TE.fromIOEither(ma))
}

/**
 * @since 0.1.0
 */
export function rightIO<S, A>(ma: IO<A>): StateTaskEither<S, never, A> {
  return fromTaskEither(TE.rightIO(ma))
}

/**
 * @since 0.1.0
 */
export function leftIO<S, E>(me: IO<E>): StateTaskEither<S, E, never> {
  return fromTaskEither(TE.leftIO(me))
}

/**
 * @since 0.1.0
 */
export const rightState: <S, A>(ma: State<S, A>) => StateTaskEither<S, never, A> = T.fromState

/**
 * @since 0.1.0
 */
export function leftState<S, E>(me: State<S, E>): StateTaskEither<S, E, never> {
  return s => TE.left(me(s)[0])
}

/**
 * @since 0.1.0
 */
export const get: <S>() => StateTaskEither<S, never, S> = T.get

/**
 * @since 0.1.0
 */
export const put: <S>(s: S) => StateTaskEither<S, never, void> = T.put

/**
 * @since 0.1.0
 */
export const modify: <S>(f: (s: S) => S) => StateTaskEither<S, never, void> = T.modify

/**
 * @since 0.1.0
 */
export const gets: <S, A>(f: (s: S) => A) => StateTaskEither<S, never, A> = T.gets

/**
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
 * @since 0.1.0
 */
export const stateTaskEitherSeq: typeof stateTaskEither = {
  ...stateTaskEither,
  ap: (mab, ma) => T.chain(mab, f => T.map(ma, f))
}

const {
  ap,
  apFirst,
  apSecond,
  chain,
  chainFirst,
  flatten,
  map,
  filterOrElse,
  fromEither,
  fromOption,
  fromPredicate
} = pipeable(stateTaskEither)

export {
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
  map,
  /**
   * @since 0.1.0
   */
  filterOrElse,
  /**
   * @since 0.1.0
   */
  fromEither,
  /**
   * @since 0.1.0
   */
  fromOption,
  /**
   * @since 0.1.0
   */
  fromPredicate
}
