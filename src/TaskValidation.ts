import { Applicative2C, getApplicativeComposition } from 'fp-ts/lib/Applicative'
import { Functor2, getFunctorComposition } from 'fp-ts/lib/Functor'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import * as task from 'fp-ts/lib/Task'
import * as validation from 'fp-ts/lib/Validation'
import { phantom } from 'fp-ts/lib/function'
import { withTimeout } from './Task/withTimeout'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L, A> {
    TaskValidation: TaskValidation<L, A>
  }
}

const taskValidationFunctor = getFunctorComposition(task.task, validation.validation)

export const URI = 'TaskValidation'

export type URI = typeof URI

export class TaskValidation<L, A> {
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: task.Task<validation.Validation<L, A>>) {}
  map<B>(f: (a: A) => B): TaskValidation<L, B> {
    return new TaskValidation(taskValidationFunctor.map(this.value, f))
  }
  fold<R>(failure: (l: L) => R, success: (a: A) => R): task.Task<R> {
    return this.value.map(v => v.fold(failure, success))
  }
  /**
   *  Returns the `TaskValidation` result if it completes within a timeout, or a fallback value instead.
   *
   * @example
   * import { TaskValidation  } from 'fp-ts-contrib/lib/TaskValidation'
   * import { delay } from 'fp-ts/lib/Task'
   * import { success, failure } from 'fp-ts/lib/Validation'
   *
   * const completeAfter2s = new TaskValidation(delay(2000, success('result')))
   *
   * completeAfter2s.withTimeout(failure('timeout'), 3000).value.run() // Promise(success('result'))
   * completeAfter2s.withTimeout(failure('timeout'), 1000).value.run() // Promise(failure('timeout'))
   * completeAfter2s.withTimeout(success('timeout'), 1000).value.run() // Promise(success('timeout'))
   */
  withTimeout(onTimeout: validation.Validation<L, A>, millis: number) {
    return new TaskValidation(withTimeout(this.value, onTimeout, millis))
  }
}

const map = <L, A, B>(fa: TaskValidation<L, A>, f: (a: A) => B): TaskValidation<L, B> => {
  return fa.map(f)
}

export const getApplicative = <L>(S: Semigroup<L>): Applicative2C<URI, L> => {
  const taskValidationApplicative = getApplicativeComposition(task.task, validation.getApplicative(S))

  const of = <A>(a: A): TaskValidation<L, A> => new TaskValidation(taskValidationApplicative.of(a))

  const ap = <A, B>(fab: TaskValidation<L, (a: A) => B>, fa: TaskValidation<L, A>): TaskValidation<L, B> => {
    return new TaskValidation(taskValidationApplicative.ap(fab.value, fa.value))
  }
  return {
    URI,
    _L: phantom,
    map,
    of,
    ap
  }
}

export const taskValidation: Functor2<URI> = {
  URI,
  map
}
