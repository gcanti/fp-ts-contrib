import { time } from '../../src/time'
import * as IO from 'fp-ts/lib/IO'
import * as Task from 'fp-ts/lib/Task'
import * as TaskEither from 'fp-ts/lib/TaskEither'
import * as ReaderTaskEither from 'fp-ts/lib/ReaderTaskEither'

//
// time
//

const time1 = time(IO.io) // $ExpectType <A>(ma: IO<A>) => IO<[A, number]>
const time2 = time(Task.task) // $ExpectType <A>(ma: Task<A>) => Task<[A, number]>
const time3 = time(TaskEither.taskEither) // $ExpectType <L, A>(ma: TaskEither<L, A>) => TaskEither<L, [A, number]>
const time4 = time(ReaderTaskEither.readerTaskEither) // $ExpectType <U, L, A>(ma: ReaderTaskEither<U, L, A>) => ReaderTaskEither<U, L, [A, number]>
