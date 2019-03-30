import { time } from '../../src/time'
import * as IO from 'fp-ts/lib/IO'
import * as Task from 'fp-ts/lib/Task'
import * as TaskEither from 'fp-ts/lib/TaskEither'
import * as ReaderTaskEither from 'fp-ts/lib/ReaderTaskEither'
import * as Th from 'fp-ts/lib/These'
import { either, right } from 'fp-ts/lib/Either'
import { Do } from '../../src/Do'
import * as Sa from '../../src/Semialign'

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
// Semialign
//

declare const d1: { [key: string]: number }
declare const d2: Record<string, string>
declare const r2: Record<'a', number>
declare const r3: Record<'b', string>
Sa.record.align(d1, d2) // $ExpectType Record<string, These<number, string>>
Sa.record.align(r2, r3) // $ExpectType Record<"a" | "b", These<number, string>>

Sa.record.alignWith(d1, d2, (x: Th.These<number, string>) => 'Test') // $ExpectType Record<string, string>
Sa.record.alignWith(r2, r3, (x: Th.These<number, string>) => 'Test') // $ExpectType Record<"a" | "b", string>
