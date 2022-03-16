import { pipe } from 'fp-ts/lib/function'
import * as _ from '../../src/ReaderTask'
import * as RT from 'fp-ts/lib/ReaderTask'
import * as RIO from '../../src/ReaderIO'

interface R1 {
  foo: string,
}

interface R2 {
  bar: string,
}

//
// fromReaderIO
//

// $ExpectType ReaderTask<R1, boolean>
_.fromReaderIO(RIO.of<R1, boolean>(true))

//
// fromReaderIOK
//

// $ExpectType (a: boolean) => ReaderTask<R1, boolean>
_.fromReaderIOK((a: boolean) => RIO.of<R1, boolean>(a))

//
// chainReaderIOKW
//

// $ExpectType ReaderTask<R1 & R2, boolean>
pipe(
  RT.of<R1, number>(1),
  _.chainReaderIOKW(() => RIO.of<R2, boolean>(true))
)

//
// chainReaderIOK
//

// $ExpectType ReaderTask<R1, number>
pipe(
  RT.of<R1, number>(1),
  _.chainReaderIOK(() => RIO.of(1))
)

pipe(
  RT.of<R1, number>(1), // $ExpectError
  _.chainReaderIOK(() => RIO.of<R2, boolean>(true))
)

//
// chainFirstReaderIOKW
//

// $ExpectType ReaderTask<R1 & R2, number>
pipe(
  RT.of<R1, number>(1),
  _.chainFirstReaderIOKW(() => RIO.of<R2, boolean>(true)),
)

//
// chainFirstReaderIOK
//

// $ExpectType ReaderTask<R1, number>
pipe(
  RT.of<R1, number>(1),
  _.chainFirstReaderIOK(() => RIO.of(true))
)

pipe(
  RT.of<R1, number>(1), // $ExpectError
  _.chainFirstReaderIOK(() => RIO.of<R2, boolean>(true)),
)
