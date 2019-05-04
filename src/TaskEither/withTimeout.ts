import { TaskEither } from 'fp-ts/lib/TaskEither'
import { Either } from 'fp-ts/lib/Either'
import { withTimeout as withTimeoutTask } from '../Task/withTimeout'

/**
 * Returns the `TaskEither` result if it completes within a timeout, or a fallback value instead.
 *
 * @example
 * import { withTimeout } from 'fp-ts-contrib/lib/TaskEither/withTimeout'
 * import { TaskEither } from 'fp-ts/lib/TaskEither'
 * import { delay } from 'fp-ts/lib/Task'
 * import { right, left } from 'fp-ts/lib/Either'
 *
 * const completeAfter2s = new TaskEither(delay(2000, right('result')))
 *
 * withTimeout(completeAfter2s, left('timeout'), 3000).run() // Promise(right('result'))
 * withTimeout(completeAfter2s, left('timeout'), 1000).run() // Promise(left('timeout'))
 * withTimeout(completeAfter2s, right('timeout'), 1000).run() // Promise(right('timeout'))
 *
 * @since 0.0.6
 */
export const withTimeout = <A, L>(t: TaskEither<L, A>, onTimeout: Either<L, A>, millis: number): TaskEither<L, A> => {
  return new TaskEither(withTimeoutTask(t.value, onTimeout, millis))
}
