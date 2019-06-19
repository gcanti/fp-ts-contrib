import { getRaceMonoid, Task, delay, of } from 'fp-ts/lib/Task'

/**
 * Returns the task result if it completes within a timeout, or a fallback value instead.
 *
 * @example
 * import { withTimeout } from 'fp-ts-contrib/lib/Task/withTimeout'
 * import { delay, of } from 'fp-ts/lib/Task'
 *
 * const completeAfter2s = delay(2000)(of('result'))
 *
 * async function f() {
 *   const a1 = await withTimeout('timeout', 3000)(completeAfter2s)()
 *   assert.strictEqual(a1, 'result')
 *   const a2 = await withTimeout('timeout', 1000)(completeAfter2s)()
 *   assert.strictEqual(a2, 'timeout')
 * }
 *
 * f()
 *
 * @since 0.1.0
 */
export function withTimeout<A>(onTimeout: A, millis: number): (ma: Task<A>) => Task<A> {
  const M = getRaceMonoid<A>()
  const fallback = delay(millis)(of(onTimeout))
  return ma => M.concat(ma, fallback)
}
