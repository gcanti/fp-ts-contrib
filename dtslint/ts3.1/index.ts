import { time } from '../../src/time'
import * as IO from 'fp-ts/lib/IO'
import * as Task from 'fp-ts/lib/Task'
import * as TaskEither from 'fp-ts/lib/TaskEither'
import * as ReaderTaskEither from 'fp-ts/lib/ReaderTaskEither'
import * as Th from 'fp-ts/lib/These'
import { either, right } from 'fp-ts/lib/Either'
import { Do } from '../../src/Do'
import * as alignRecord from '../../src/Align/Record'

//
// time
//

time(IO.io) // $ExpectType <A>(ma: IO<A>) => IO<[A, number]>
time(Task.task) // $ExpectType <A>(ma: Task<A>) => Task<[A, number]>
time(TaskEither.taskEither) // $ExpectType <L, A>(ma: TaskEither<L, A>) => TaskEither<L, [A, number]>
time(ReaderTaskEither.readerTaskEither) // $ExpectType <U, L, A>(ma: ReaderTaskEither<U, L, A>) => ReaderTaskEither<U, L, [A, number]>

//
// Do
//

// should not allow duplicated keys
Do(either)
  .bind('a', right<string, string>('a'))
  .bind('a', right<string, string>('a')) // $ExpectError

// should not allow different left types
Do(either)
  .bind('a', right<string, string>('a'))
  .bindL('b', () => right<boolean, number>(54)) // $ExpectError

// sequenceS should not allow empty records
Do(Task.task).sequenceS({}) // $ExpectError

// sequenceSL should not allow empty records
Do(Task.task).sequenceSL(() => ({})) // $ExpectError

// sequenceS should not allow duplicated keys
Do(Task.task)
  .bind('a', Task.task.of('a'))
  .sequenceS({
    a: Task.task.of('a') // $ExpectError
  })

// sequenceSL should not allow duplicated keys
Do(Task.task)
  .bind('a', Task.task.of('a'))
  .sequenceSL(() => ({
    a: Task.task.of('a') // $ExpectError
  }))

// sequenceS should add the record to the scope
Do(Task.task)
  .sequenceS({
    a: Task.task.of('a'),
    b: Task.task.of(1)
  })
  .done() // $ExpectType () => Task<{ a: string; b: number; }>

// sequenceSL should add the record to the scope
Do(Task.task)
  .sequenceSL(() => ({
    a: Task.task.of('a'),
    b: Task.task.of(1)
  }))
  .done() // $ExpectType () => Task<{ a: string; b: number; }>

//
// Align/Record
//

declare const d1: { [key: string]: number }
declare const d2: { [key: string]: string }
declare const r1: Record<'a', number>
declare const r2: Record<'b', string>

alignRecord.align(d1, d2) // $ExpectType Record<string, These<number, string>>
alignRecord.align(r1, r2) // $ExpectType Record<"a" | "b", These<number, string>>

alignRecord.alignWith(d1, d2, (x: Th.These<number, string>) => 'Test') // $ExpectType Record<string, string>
alignRecord.alignWith(r1, r2, (x: Th.These<number, string>) => 'Test') // $ExpectType Record<"a" | "b", string>
