/**
 * @since 0.1.0
 */
import { Alternative1 } from 'fp-ts/lib/Alternative'
import { task, of, Task, map as taskMap } from 'fp-ts/lib/Task'
import { Monad1 } from 'fp-ts/lib/Monad'
import {
  Option,
  fromEither as optionFromEither,
  fromNullable as optionFromNullable,
  toUndefined as optionToUndefined,
  toNullable as optionToNullable,
  chain as optionChain,
  mapNullable as optionMapNullable,
  some as optionSome,
  none as optionNone,
  option
} from 'fp-ts/lib/Option'
import { getOptionM } from 'fp-ts/lib/OptionT'
import { pipeable } from 'fp-ts/lib/pipeable'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import { Lazy } from 'fp-ts/lib/function'
import { Filterable1, getFilterableComposition } from 'fp-ts/lib/Filterable'

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
export function fromNullable<A>(a: A): TaskOption<NonNullable<A>> {
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
  return taskMap(optionChain(f))
}

/**
 * @since 0.1.5
 */
export function mapNullable<A, B>(f: (a: A) => B | null | undefined): (ma: TaskOption<A>) => TaskOption<B> {
  return taskMap(optionMapNullable(f))
}

/**
 * @since 0.1.5
 */
export function tryCatch<A>(f: Lazy<Promise<A>>): TaskOption<A> {
  return () =>
    f().then(
      a => optionSome(a),
      () => optionNone
    )
}

/**
 * @since 0.1.10
 */
export function fromOptionK<A extends Array<unknown>, B>(f: (...a: A) => Option<B>): (...a: A) => TaskOption<B> {
  return (...a) => fromOption(f(...a))
}

/**
 * @since 0.1.10
 */
export function chainOptionK<A, B>(f: (a: A) => Option<B>): (ma: TaskOption<A>) => TaskOption<B> {
  return chain(fromOptionK(f))
}

/**
 * @since 0.1.0
 */
export const taskOption: Monad1<URI> & Alternative1<URI> & Filterable1<URI> = {
  URI,
  of: some,
  ap: T.ap,
  chain: T.chain,
  alt: T.alt,
  zero: T.none,
  ...getFilterableComposition(task, option)
}

const {
  alt,
  ap,
  apFirst,
  apSecond,
  chain,
  chainFirst,
  flatten,
  map,
  partition,
  partitionMap,
  filter,
  filterMap,
  compact,
  separate
} = pipeable(taskOption)

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
  map,
  /**
   * @since 0.1.5
   */
  partition,
  /**
   * @since 0.1.5
   */
  partitionMap,
  /**
   * @since 0.1.5
   */
  filter,
  /**
   * @since 0.1.5
   */
  filterMap,
  /**
   * @since 0.1.5
   */
  compact,
  /**
   * @since 0.1.5
   */
  separate
}
