import { Alt1 } from 'fp-ts/lib/Alt'
import { task, of, Task } from 'fp-ts/lib/Task'
import { Monad1 } from 'fp-ts/lib/Monad'
import {
  Option,
  fromEither as optionFromEither,
  fromNullable as optionFromNullable,
  toUndefined as optionToUndefined,
  toNullable as optionToNullable,
  chain as optionChain
} from 'fp-ts/lib/Option'
import { getOptionM } from 'fp-ts/lib/OptionT'
import { pipeable } from 'fp-ts/lib/pipeable'
import { TaskEither } from 'fp-ts/lib/TaskEither'

const T = getOptionM(task)

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    TaskOption: TaskOption<A>
  }
}

/**
 * @since 0.1.0
 */
export const URI = 'TaskOption'

/**
 * @since 0.1.0
 */
export type URI = typeof URI

/**
 * @since 0.1.0
 */
export interface TaskOption<A> extends Task<Option<A>> {}

/**
 * @since 0.1.0
 */
export const fromTask: <A>(as: Task<A>) => TaskOption<A> = T.fromM

/**
 * @since 0.1.0
 */
export const fromOption: <A>(ma: Option<A>) => TaskOption<A> = of

/**
 * @since 0.1.0
 */
export const none: TaskOption<never> = T.none()

/**
 * @since 0.1.0
 */
export const some: <A>(a: A) => TaskOption<A> = T.of

/**
 * @since 0.1.0
 */
export function fold<A, B>(onNone: () => Task<B>, onSome: (a: A) => Task<B>): (as: TaskOption<A>) => Task<B> {
  return as => T.fold(as, onNone, onSome)
}

/**
 * @since 0.1.0
 */
export function getOrElse<A>(onNone: () => Task<A>): (as: TaskOption<A>) => Task<A> {
  return as => T.getOrElse(as, onNone)
}

/**
 * @since 0.1.4
 */
export function fromNullable<A>(a: A | null | undefined): TaskOption<A> {
  return fromOption(optionFromNullable(a))
}

/**
 * @since 0.1.4
 */
export function fromTaskEither<A>(ma: TaskEither<any, A>): TaskOption<A> {
  return task.map(ma, optionFromEither)
}

/**
 * @since 0.1.4
 */
export function toUndefined<A>(ma: TaskOption<A>): Task<A | undefined> {
  return task.map(ma, optionToUndefined)
}

/**
 * @since 0.1.4
 */
export function toNullable<A>(ma: TaskOption<A>): Task<A | null> {
  return task.map(ma, optionToNullable)
}

/**
 * @since 0.1.4
 */
export function chainTask<A, B>(f: (a: A) => Task<B>): (ma: TaskOption<A>) => TaskOption<B> {
  return ma => T.chain(ma, a => fromTask(f(a)))
}

/**
 * @since 0.1.4
 */
export function chainOption<A, B>(f: (a: A) => Option<B>): (ma: TaskOption<A>) => TaskOption<B> {
  return ma => task.map(ma, optionChain(f))
}

/**
 * @since 0.1.0
 */
export const taskOption: Monad1<URI> & Alt1<URI> = {
  URI,
  map: T.map,
  of: some,
  ap: T.ap,
  chain: T.chain,
  alt: T.alt
}

const { alt, ap, apFirst, apSecond, chain, chainFirst, flatten, map } = pipeable(taskOption)

export {
  /**
   * @since 0.1.0
   */
  alt,
  /**
   * @since 0.1.0
   */
  ap,
  /**
   * @since 0.1.0
   */
  apFirst,
  /**
   * @since 0.1.0
   */
  apSecond,
  /**
   * @since 0.1.0
   */
  chain,
  /**
   * @since 0.1.0
   */
  chainFirst,
  /**
   * @since 0.1.0
   */
  flatten,
  /**
   * @since 0.1.0
   */
  map
}
