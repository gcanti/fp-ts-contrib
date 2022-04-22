import { pipe } from 'fp-ts/lib/function'
import * as _ from '../../src/ReaderIO'

declare const f1: (v: string) => boolean

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

//
// ap
//

// $ExpectType ReaderIO<R1, boolean>
pipe(_.of<R1, typeof f1>(f1), _.ap(_.of<R1, string>('')))

// $ExpectError
pipe(_.of<R1, typeof f1>(f1), _.ap(_.of<R2, string>('')))

//
// apW
//

// $ExpectType ReaderIO<R1 & R2, boolean>
pipe(_.of<R1, typeof f1>(f1), _.apW(_.of<R2, string>('')))

//
// chain
//

// $ExpectType ReaderIO<R1, string>
pipe(_.of<R1, boolean>(true), _.chain((a: boolean) => _.of<R1, string>('')))

// $ExpectError
pipe(_.of<R1, boolean>(true), _.chain((a: boolean) => _.of<R2, string>('')))

//
// chainW
//

// $ExpectType ReaderIO<R1 & R2, string>
pipe(_.of<R1, boolean>(true), _.chainW((a: boolean) => _.of<R2, string>('')))

//
// chainFirst
//

// $ExpectType ReaderIO<R1, boolean>
pipe(_.of<R1, boolean>(true), _.chainFirst((a: boolean) => _.of<R1, string>('')))

// $ExpectError
pipe(_.of<R1, boolean>(true), _.chainFirst((a: boolean) => _.of<R2, string>('')))

//
// chainFirstW
//

// $ExpectType ReaderIO<R1 & R2, boolean>
pipe(_.of<R1, boolean>(true), _.chainFirstW((a: boolean) => _.of<R2, string>('')))

//
// flatten
//

// $ExpectType ReaderIO<R1, boolean>
_.flatten(_.of<R1, _.ReaderIO<R1, boolean>>(_.of(true)))

// $ExpectError
_.flatten(_.of<R1, _.ReaderIO<R2, boolean>>(_.of(true)))

//
// flattenW
//

// $ExpectType ReaderIO<R1 & R2, boolean>
_.flattenW(_.of<R1, _.ReaderIO<R2, boolean>>(_.of(true)))
