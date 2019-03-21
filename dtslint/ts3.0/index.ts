import { time } from '../../src/time'
import * as IO from 'fp-ts/lib/IO'
import * as Task from 'fp-ts/lib/Task'
import * as TaskEither from 'fp-ts/lib/TaskEither'
import * as ReaderTaskEither from 'fp-ts/lib/ReaderTaskEither'
import { either, right } from 'fp-ts/lib/Either'
import { Do } from '../../src/Do'

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
