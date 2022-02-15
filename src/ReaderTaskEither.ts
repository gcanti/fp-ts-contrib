/**
 * @since 0.1.27
 */
import { flow } from 'fp-ts/lib/function'
import * as RTE from 'fp-ts/lib/ReaderTaskEither'
import * as TE from 'fp-ts/lib/TaskEither'
import * as RIO from './ReaderIO'

import ReaderIO = RIO.ReaderIO
import ReaderTaskEither = RTE.ReaderTaskEither

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 0.1.27
 */
export const leftReaderIO: <R, E = never, A = never>(me: ReaderIO<R, E>) => ReaderTaskEither<R, E, A> = (me) =>
  flow(me, TE.leftIO)

/**
 * @category constructors
 * @since 0.1.27
 */
export const rightReaderIO: <R, E = never, A = never>(ma: ReaderIO<R, A>) => ReaderTaskEither<R, E, A> = (ma) =>
  flow(ma, TE.rightIO)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 0.1.27
 */
export const fromReaderIOK = <A extends ReadonlyArray<unknown>, R, B>(
  f: (...a: A) => ReaderIO<R, B>
): (<E = never>(...a: A) => ReaderTaskEither<R, E, B>) => (...a) => rightReaderIO(f(...a))

/**
 * Less strict version of [`chainReaderIOK`](#chainreaderiok).
 *
 * @category combinators
 * @since 0.1.27
 */
export const chainReaderIOKW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1, E = never>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B> = (f) =>
  RTE.chainW(fromReaderIOK(f))

/**
 * @category combinators
 * @since 0.1.27
 */
export const chainReaderIOK: <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
) => <E = never>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainReaderIOKW

/**
 * Less strict version of [`chainFirstReaderIOK`](#chainfirstreaderiok).
 *
 * @category combinators
 * @since 0.1.27
 */
export const chainFirstReaderIOKW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1, E = never>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, A> = (f) =>
  RTE.chainFirstW(fromReaderIOK(f))

/**
 * @category combinators
 * @since 0.1.27
 */
export const chainFirstReaderIOK: <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
) => <E = never>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A> = chainFirstReaderIOKW
