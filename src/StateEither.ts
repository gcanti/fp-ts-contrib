/**
 * @since 2.4.4
 */
import * as E from 'fp-ts/lib/Either'
import { Monad3 } from 'fp-ts/lib/Monad'
import { MonadThrow3 } from 'fp-ts/lib/MonadThrow'
import { State } from 'fp-ts/lib/State'
import { getStateM } from 'fp-ts/lib/StateT'
import { pipeable } from 'fp-ts/lib/pipeable'

const T = getStateM(E.either)

declare module 'fp-ts/lib/HKT' {
  interface URItoKind3<R, E, A> {
    StateEither: StateEither<R, E, A>
  }
}

/**
 * @since 0.1.12
 */
export const URI = 'StateEither'

/**
 * @since 0.1.12
 */
export type URI = typeof URI

/**
 * @since 0.1.12
 */
export interface StateEither<S, E, A> {
  (s: S): E.Either<E, [A, S]>
}

/**
 * @since 0.1.12
 */
export const evalState: <S, E, A>(ma: StateEither<S, E, A>, s: S) => E.Either<E, A> = T.evalState

/**
 * @since 0.1.12
 */
export const execState: <S, E, A>(ma: StateEither<S, E, A>, s: S) => E.Either<E, S> = T.execState

/**
 * @since 0.1.12
 */
export function left<S, E = never, A = never>(e: E): StateEither<S, E, A> {
  return fromEither(E.left(e))
}

/**
 * @since 0.1.12
 */
export const right: <S, E = never, A = never>(a: A) => StateEither<S, E, A> = T.of

/**
 * @since 0.1.12
 */
export const rightState: <S, E = never, A = never>(ma: State<S, A>) => StateEither<S, E, A> = T.fromState

/**
 * @since 0.1.12
 */
export function leftState<S, E = never, A = never>(me: State<S, E>): StateEither<S, E, A> {
  return s => E.left(me(s)[0])
}

/**
 * @since 0.1.12
 */
export const get: <S, E = never>() => StateEither<S, E, S> = T.get

/**
 * @since 0.1.12
 */
export const put: <S, E = never>(s: S) => StateEither<S, E, void> = T.put

/**
 * @since 0.1.12
 */
export const modify: <S, E = never>(f: (s: S) => S) => StateEither<S, E, void> = T.modify

/**
 * @since 0.1.12
 */
export const gets: <S, E = never, A = never>(f: (s: S) => A) => StateEither<S, E, A> = T.gets

/**
 * @since 0.1.0
 */
export const fromEither: <S, E, A>(ma: E.Either<E, A>) => StateEither<S, E, A> = T.fromM

/**
 * @since 0.1.12
 */
export function fromEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => E.Either<E, B>
): <S>(...a: A) => StateEither<S, E, B> {
  return (...a) => fromEither(f(...a))
}

/**
 * @since 0.1.12
 */
export function chainEitherK<E, A, B>(
  f: (a: A) => E.Either<E, B>
): <S>(ma: StateEither<S, E, A>) => StateEither<S, E, B> {
  return chain<any, E, A, B>(fromEitherK(f))
}

/**
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

const { ap, apFirst, apSecond, chain, chainFirst, flatten, map, filterOrElse, fromOption, fromPredicate } = pipeable(
  stateEither
)

export {
  /**
   * @since 0.1.12
   */
  ap,
  /**
   * @since 0.1.12
   */
  apFirst,
  /**
   * @since 0.1.12
   */
  apSecond,
  /**
   * @since 0.1.12
   */
  chain,
  /**
   * @since 0.1.12
   */
  chainFirst,
  /**
   * @since 0.1.12
   */
  flatten,
  /**
   * @since 0.1.12
   */
  map,
  /**
   * @since 0.1.12
   */
  filterOrElse,
  /**
   * @since 0.1.12
   */
  fromOption,
  /**
   * @since 0.1.12
   */
  fromPredicate
}
