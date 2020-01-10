import * as I from 'fp-ts/lib/IO'
import { Monad2 } from 'fp-ts/lib/Monad'
import { State } from 'fp-ts/lib/State'
import { getStateM } from 'fp-ts/lib/StateT'
import IO = I.IO
import { pipeable } from 'fp-ts/lib/pipeable'

const T = getStateM(I.io)

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    StateIO: StateIO<E, A>
  }
}

/**
 * @since 0.1.0
 */
export const URI = 'StateIO'

/**
 * @since 0.1.0
 */
export type URI = typeof URI

/**
 * @since 0.1.0
 */
export interface StateIO<S, A> {
  (s: S): IO<[A, S]>
}

/**
 * @since 0.1.0
 */
export function run<S, A>(ma: StateIO<S, A>, s: S): A {
  return ma(s)()[0]
}

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
export const fromIO: <S, A>(ma: IO<A>) => StateIO<S, A> = T.fromM

/**
 * @since 0.1.0
 */
export const fromState: <S, A>(ma: State<S, A>) => StateIO<S, A> = T.fromState

/**
 * @since 0.1.0
 */
export const get: <S>() => StateIO<S, S> = T.get

/**
 * @since 0.1.0
 */
export const put: <S>(s: S) => StateIO<S, void> = T.put

/**
 * @since 0.1.0
 */
export const modify: <S>(f: (s: S) => S) => StateIO<S, void> = T.modify

/**
 * @since 0.1.0
 */
export const gets: <S, A>(f: (s: S) => A) => StateIO<S, A> = T.gets

/**
 * @since 0.1.10
 */
export function fromIOK<A extends Array<unknown>, B>(f: (...a: A) => IO<B>): <R>(...a: A) => StateIO<R, B> {
  return (...a) => fromIO(f(...a))
}

/**
 * @since 0.1.10
 */
export function chainIOK<A, B>(f: (a: A) => IO<B>): <R>(ma: StateIO<R, A>) => StateIO<R, B> {
  return chain<any, A, B>(fromIOK(f))
}

/**
 * @since 0.1.0
 */
export const stateIO: Monad2<URI> = {
  URI,
  map: T.map,
  of: T.of,
  ap: T.ap,
  chain: T.chain
}

const { ap, apFirst, apSecond, chain, chainFirst, flatten, map } = pipeable(stateIO)

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
  map
}
