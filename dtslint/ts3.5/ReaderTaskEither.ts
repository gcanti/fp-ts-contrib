import { pipe } from 'fp-ts/lib/function'
import * as _ from '../../src/ReaderTaskEither'
import * as RTE from 'fp-ts/lib/ReaderTaskEither'
import * as RIO from '../../src/ReaderIO'

interface R1 {
  foo: string,
}

interface R2 {
  bar: string,
}

//
// rightReaderIO
//

// $ExpectType ReaderTaskEither<R1, never, boolean>
_.rightReaderIO(RIO.of<R1, boolean>(true))

//
// leftReaderIO
//

// $ExpectType ReaderTaskEither<R1, boolean, never>
_.leftReaderIO(RIO.of<R1, boolean>(true))

//
// fromReaderIOK
//

// $ExpectType <E = never>(a: boolean) => ReaderTaskEither<R1, E, boolean>
_.fromReaderIOK((a: boolean) => RIO.of<R1, boolean>(a))

//
// chainReaderIOKW
//

// $ExpectType ReaderTaskEither<R1 & R2, string, boolean>
pipe(
  RTE.right<R1, string, number>(1),
  _.chainReaderIOKW(() => RIO.of<R2, boolean>(true))
)

//
// chainReaderIOK
//

// $ExpectType ReaderTaskEither<R1, string, number>
pipe(
  RTE.right<R1, string, number>(1),
  _.chainReaderIOK(() => RIO.of(1))
)

pipe(
  RTE.right<R1, string, number>(1),
  _.chainReaderIOK(() => RIO.of<R2, boolean>(true)) // $ExpectError
)

//
// chainFirstReaderIOKW
//

// $ExpectType ReaderTaskEither<R1 & R2, string, number>
pipe(
  RTE.right<R1, string, number>(1),
  _.chainFirstReaderIOKW(() => RIO.of<R2, boolean>(true)),
)

//
// chainFirstReaderIOK
//

// $ExpectType ReaderTaskEither<R1, string, number>
pipe(
  RTE.right<R1, string, number>(1),
  _.chainFirstReaderIOK(() => RIO.of(true))
)

pipe(
  RTE.right<R1, string, number>(1),
  _.chainFirstReaderIOK(() => RIO.of<R2, boolean>(true)) // $ExpectError
)
