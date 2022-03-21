import * as _ from '../../src/ReaderIO'

interface R1 {
  foo: string,
}

interface R2 {
  bar: string,
}

//
// asksReaderIOW
//

// $ExpectType ReaderIO<R1 & R2, boolean>
_.asksReaderIOW((r: R1) => _.of<R2, boolean>(true))

//
// asksReaderIO
//

// $ExpectType ReaderIO<R1, boolean>
_.asksReaderIO((r: R1) => _.of<R1, boolean>(true))

// $ExpectError
_.asksReaderIO((r: R1) => _.of<R2, boolean>(true))
