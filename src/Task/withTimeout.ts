import { getRaceMonoid, Task, delay } from 'fp-ts/lib/Task'

/**
 * Returns the task result if it completes within a timeout, or a fallback value instead.
 *
 * @example
 * import { withTimeout } from 'fp-ts-contrib/lib/Task/withTimeout'
 * import { delay } from 'fp-ts/lib/Task'
 *
 * const completeAfter2s = delay(2000, 'result')
 *
 * withTimeout(completeAfter2s, 'timeout', 3000).run() // Promise('result')
 * withTimeout(completeAfter2s, 'timeout', 1000).run() // Promise('timeout')
 *
 * @since 0.0.6
 */
export const withTimeout = <A>(t: Task<A>, onTimeout: A, millis: number): Task<A> => {
  const timeoutTask = delay(millis, onTimeout)
  return getRaceMonoid<A>().concat(t, timeoutTask)
}
