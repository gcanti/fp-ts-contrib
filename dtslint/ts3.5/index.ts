import * as E from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { Kind, URIS } from 'fp-ts/lib/HKT'
import * as IO from 'fp-ts/lib/IO'
import { Monad1 } from 'fp-ts/lib/Monad'
import * as RTE from 'fp-ts/lib/ReaderTaskEither'
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import * as TH from 'fp-ts/lib/These'
import * as alignRecord from '../../src/Align/Record'
import { Do } from '../../src/Do'
import * as TO from '../../src/TaskOption'
import { time } from '../../src/time'

//
// time
//

time(IO.io) // $ExpectType <A>(ma: IO<A>) => IO<[A, number]>
time(T.task) // $ExpectType <A>(ma: Task<A>) => Task<[A, number]>
time(TE.taskEither) // $ExpectType <E, A>(ma: TaskEither<E, A>) => TaskEither<E, [A, number]>
time(RTE.readerTaskEither) // $ExpectType <R, E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, [A, number]>

//
// Do
//

// should not allow duplicated keys
Do(E.either)
  .bind('a', E.right('a'))
  .bind('a', E.right('a')) // $ExpectError

// should not allow different left types
Do(E.either)
  .bind('a', E.right('a'))
  .bindL('b', () => E.right<boolean, number>(54)) // $ExpectError

// sequenceS should not allow empty records
Do(T.task).sequenceS({}) // $ExpectError

// sequenceSL should not allow empty records
Do(T.task).sequenceSL(() => ({})) // $ExpectError

// sequenceS should not allow duplicated keys
Do(T.task)
  .bind('a', T.of('a'))
  .sequenceS({
    a: T.of('a') // $ExpectError
  })

// sequenceSL should not allow duplicated keys
Do(T.task)
  .bind('a', T.of('a'))
  .sequenceSL(() => ({
    a: T.of('a') // $ExpectError
  }))

// sequenceS should add the record to the scope
Do(T.task)
  .sequenceS({
    a: T.of('a'),
    b: T.of(1)
  })
  .done() // $ExpectType () => Task<{ a: string; b: number; }>

// sequenceSL should add the record to the scope
Do(T.task)
  .sequenceSL(() => ({
    a: T.of('a'),
    b: T.of(1)
  }))
  .done() // $ExpectType () => Task<{ a: string; b: number; }>

// issue #38

export function repro38<F extends URIS>(
  F: Monad1<F> & {
    f: Kind<F, void>
  }
) {
  Do(F).do(F.f)
}

//
// Align/Record
//

declare const d1: { [key: string]: number }
declare const d2: { [key: string]: string }
declare const r1: Record<'a', number>
declare const r2: Record<'b', string>

alignRecord.align(d1, d2) // $ExpectType Record<string, These<number, string>>
alignRecord.align(r1, r2) // $ExpectType Record<"a" | "b", These<number, string>>

alignRecord.alignWith(d1, d2, (x: TH.These<number, string>) => 'Test') // $ExpectType Record<string, string>
alignRecord.alignWith(r1, r2, (x: TH.These<number, string>) => 'Test') // $ExpectType Record<"a" | "b", string>

//
// TaskOption
//

// fromNullable
declare const fromNullableTest1: number | null | undefined
TO.fromNullable(fromNullableTest1) // $ExpectType TaskOption<number>

interface fromNullableTest2 {
  foo: number | undefined
}
declare const fromNullableTest3: <Key extends keyof fromNullableTest2>(key: Key) => fromNullableTest2[Key]
// $ExpectType TaskOption<number>
flow(fromNullableTest3, TO.fromNullable)('foo')
