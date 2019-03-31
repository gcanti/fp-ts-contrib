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

const time1 = time(IO.io) // $ExpectType <A>(ma: IO<A>) => IO<[A, number]>
const time2 = time(Task.task) // $ExpectType <A>(ma: Task<A>) => Task<[A, number]>
const time3 = time(TaskEither.taskEither) // $ExpectType <L, A>(ma: TaskEither<L, A>) => TaskEither<L, [A, number]>
const time4 = time(ReaderTaskEither.readerTaskEither) // $ExpectType <U, L, A>(ma: ReaderTaskEither<U, L, A>) => ReaderTaskEither<U, L, [A, number]>

Do(either)
  .bind('name', right<string, string>('bob'))
  .bindL('bad', () => right<boolean, number>(54)) // $ExpectError

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
