import { Monad1 } from 'fp-ts/lib/Monad'
import { Option, fromEither, none as optionNone, some as optionSome } from 'fp-ts/lib/Option'
import * as optionT from 'fp-ts/lib/OptionT'
import { Task, task, tryCatch as tryCatchTask } from 'fp-ts/lib/Task'
import { Lazy, identity } from 'fp-ts/lib/function'
import { withTimeout } from './Task/withTimeout'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    TaskOption: TaskOption<A>
  }
}

export const URI = 'TaskOption'

export type URI = typeof URI

const T = optionT.getOptionT2v(task)
const foldT = optionT.fold(task)

export class TaskOption<A> {
  readonly _A!: A
  readonly _URI!: URI
  constructor(readonly value: Task<Option<A>>) {}
  run(): Promise<Option<A>> {
    return this.value.run()
  }
  map<B>(f: (a: A) => B): TaskOption<B> {
    return new TaskOption(T.map(this.value, f))
  }
  ap<B>(fab: TaskOption<(a: A) => B>): TaskOption<B> {
    return new TaskOption(T.ap(fab.value, this.value))
  }
  ap_<B, C>(this: TaskOption<(b: B) => C>, fb: TaskOption<B>): TaskOption<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => TaskOption<B>): TaskOption<B> {
    return new TaskOption(T.chain(this.value, a => f(a).value))
  }
  fold<R>(onNone: R, onSome: (a: A) => R): Task<R> {
    return foldT(onNone, onSome, this.value)
  }
  getOrElse(a: A): Task<A> {
    return this.fold(a, identity)
  }
  /**
   *  Returns the `TaskOption` result if it completes within a timeout, or a fallback value instead.
   *
   * @example
   * import { TaskOption  } from 'fp-ts-contrib/lib/TaskOption'
   * import { delay } from 'fp-ts/lib/Task'
   * import { some, none } from 'fp-ts/lib/Option'
   *
   * const completeAfter2s = new TaskOption(delay(2000, some('result')))
   *
   * completeAfter2s.withTimeout(some('timeout'), 3000).run() // Promise(some('result'))
   * completeAfter2s.withTimeout(none, 1000).run()            // Promise(none)
   * completeAfter2s.withTimeout(some('timeout'), 1000).run() // Promise(some('timeout'))
   */
  withTimeout(onTimeout: Option<A>, millis: number) {
    return new TaskOption(withTimeout(this.value, onTimeout, millis))
  }
}

const map = <A, B>(fa: TaskOption<A>, f: (a: A) => B): TaskOption<B> => fa.map(f)

const of = <A>(a: A): TaskOption<A> => new TaskOption(T.of(a))

const ap = <A, B>(fab: TaskOption<(a: A) => B>, fa: TaskOption<A>): TaskOption<B> => fa.ap(fab)

const chain = <A, B>(fa: TaskOption<A>, f: (a: A) => TaskOption<B>): TaskOption<B> => fa.chain(f)

export const some = of

export const none = new TaskOption(task.of(optionNone))

export const fromOption = <A>(ma: Option<A>): TaskOption<A> => new TaskOption(task.of(ma))

export const fromTask = <A>(ma: Task<A>): TaskOption<A> => new TaskOption(ma.map(optionSome))

export const tryCatch = <A>(f: Lazy<Promise<A>>): TaskOption<A> =>
  new TaskOption(tryCatchTask(f, () => undefined).map(fromEither))

export const taskOption: Monad1<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
