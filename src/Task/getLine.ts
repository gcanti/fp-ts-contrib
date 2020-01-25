/**
 * @since 0.1.8
 */
import { createInterface } from 'readline'
import { Task } from 'fp-ts/lib/Task'

/**
 * @since 0.1.8
 */
export function getLine(question: string): Task<string> {
  return () =>
    new Promise(resolve => {
      const rl = createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.question(question, answer => {
        rl.close()
        resolve(answer)
      })
    })
}
