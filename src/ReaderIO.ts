import * as I from 'fp-ts/lib/IO'
import { Monad2 } from 'fp-ts/lib/Monad'
import { pipeable } from 'fp-ts/lib/pipeable'
import { Reader } from 'fp-ts/lib/Reader'
import { getReaderM } from 'fp-ts/lib/ReaderT'

import IO = I.IO

const T = getReaderM(I.io)

declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    ReaderIO: ReaderIO<E, A>
  }
}

/**
 * @since 0.1.0
 */
export const URI = 'ReaderIO'

/**
 * @since 0.1.0
 */
export type URI = typeof URI

/**
 * @since 0.1.0
 */
export interface ReaderIO<R, A> {
  (r: R): IO<A>
}

/**
 * @since 0.1.0
 */
export function run<R, A>(ma: ReaderIO<R, A>, r: R): A {
  return ma(r)()
}

/**
 * @since 0.1.0
 */
export const fromReader: <R, A>(ma: Reader<R, A>) => ReaderIO<R, A> = T.fromReader

/**
 * @since 0.1.0
 */
export const fromIO: <R, A>(ma: IO<A>) => ReaderIO<R, A> = T.fromM

/**
 * @since 0.1.0
 */
export const ask: <R>() => ReaderIO<R, R> = T.ask

/**
 * @since 0.1.0
 */
export const asks: <R, A>(f: (r: R) => A) => ReaderIO<R, A> = T.asks

/**
 * @since 0.1.0
 */
export function local<Q, R>(f: (f: Q) => R): <A>(ma: ReaderIO<R, A>) => ReaderIO<Q, A> {
  return ma => T.local(ma, f)
}

/**
 * @since 0.1.0
 */
export const readerIO: Monad2<URI> = {
  URI,
  map: T.map,
  of: T.of,
  ap: T.ap,
  chain: T.chain
}

const { ap, apFirst, apSecond, chain, chainFirst, flatten, map } = pipeable(readerIO)

export { ap, apFirst, apSecond, chain, chainFirst, flatten, map }
