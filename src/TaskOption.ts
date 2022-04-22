/**
 * @since 0.1.0
 * @deprecated 0.1.27
 */
import { Alternative1 } from 'fp-ts/lib/Alternative'
import { Applicative1 } from 'fp-ts/lib/Applicative'
import { Apply1 } from 'fp-ts/lib/Apply'
import { Separated, Compactable1 } from 'fp-ts/lib/Compactable'
import { Either } from 'fp-ts/lib/Either'
import { Filterable1, getFilterableComposition } from 'fp-ts/lib/Filterable'
import { identity, Lazy, Predicate, Refinement } from 'fp-ts/lib/function'
import { Functor1 } from 'fp-ts/lib/Functor'
import { Monad1 } from 'fp-ts/lib/Monad'
import * as O from 'fp-ts/lib/Option'
import { getOptionM } from 'fp-ts/lib/OptionT'
import { pipe } from 'fp-ts/lib/pipeable'
import { task, of as taskOf, map as taskMap, Task } from 'fp-ts/lib/Task'
import { TaskEither } from 'fp-ts/lib/TaskEither'

const F = getFilterableComposition(task, O.option)
const T = getOptionM(task)

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 0.1.0
 */
export interface TaskOption<A> extends Task<O.Option<A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 0.1.0
 */
export const none: TaskOption<never> = T.none()

/**
 * @category constructors
 * @since 0.1.0
 */
export const some: <A>(a: A) => TaskOption<A> = T.of

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromOption: <A>(ma: O.Option<A>) => TaskOption<A> = taskOf

/**
 * @category constructors
 * @since 0.1.10
 */
export const fromOptionK: <A extends Array<unknown>, B>(f: (...a: A) => O.Option<B>) => (...a: A) => TaskOption<B> = (
  f
) => (...a) => fromOption(f(...a))

/**
 * @category constructors
 * @since 0.1.0
 */
export const fromTask: <A>(as: Task<A>) => TaskOption<A> = T.fromM

/**
 * @category constructors
 * @since 0.1.4
 */
export const fromNullable: <A>(a: A) => TaskOption<NonNullable<A>> = (a) => fromOption(O.fromNullable(a))

/**
 * @category constructors
 * @since 0.1.4
 */
export const fromTaskEither: <A>(ma: TaskEither<any, A>) => TaskOption<A> = (ma) => task.map(ma, O.fromEither)

/**
 * @category constructors
 * @since 0.1.5
 */
export const tryCatch: <A>(f: Lazy<Promise<A>>) => TaskOption<A> = (f) => () =>
  f().then(
    (a) => O.some(a),
    () => O.none
  )

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 0.1.0
 */
export const fold: <A, B>(onNone: () => Task<B>, onSome: (a: A) => Task<B>) => (as: TaskOption<A>) => Task<B> = (
  onNone,
  onSome
) => (as) => T.fold(as, onNone, onSome)

/**
 * @category destructors
 * @since 0.1.0
 */
export const getOrElse: <A>(onNone: () => Task<A>) => (as: TaskOption<A>) => Task<A> = (onNone) => (as) =>
  T.getOrElse(as, onNone)

/**
 * @category destructors
 * @since 0.1.4
 */
export const toUndefined: <A>(ma: TaskOption<A>) => Task<A | undefined> = (ma) => task.map(ma, O.toUndefined)

/**
 * @category destructors
 * @since 0.1.4
 */
export const toNullable: <A>(ma: TaskOption<A>) => Task<A | null> = (ma) => task.map(ma, O.toNullable)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 0.1.5
 */
export const mapNullable: <A, B>(f: (a: A) => B | null | undefined) => (ma: TaskOption<A>) => TaskOption<B> = (f) =>
  taskMap(O.mapNullable(f))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 0.1.18
 */
export const map: <A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B> = (f) => (fa) => T.map(fa, f)

/**
 * @category Apply
 * @since 0.1.18
 */
export const ap: <A>(fa: TaskOption<A>) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B> = (fa) => (fab) =>
  T.ap(fab, fa)

/**
 * @category Apply
 * @since 0.1.18
 */
export const apFirst = <B>(fb: TaskOption<B>) => <A>(fa: TaskOption<A>): TaskOption<A> =>
  pipe(
    fa,
    map((a) => (_: B) => a),
    ap(fb)
  )

/**
 * @category Apply
 * @since 0.1.18
 */
export const apSecond = <B>(fb: TaskOption<B>) => <A>(fa: TaskOption<A>): TaskOption<B> =>
  pipe(
    fa,
    map(() => (b: B) => b),
    ap(fb)
  )

/**
 * @category Applicative
 * @since 0.1.18
 */
export const of: <A>(a: A) => TaskOption<A> = some

/**
 * @category Monad
 * @since 0.1.18
 */
export const chain: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<B> = (f) => (ma) =>
  T.chain(ma, f)

/**
 * @category Monad
 * @since 0.1.18
 */
export const chainFirst: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<A> = (f) => (ma) =>
  T.chain(ma, (a) => T.map(f(a), () => a))

/**
 * @category Monad
 * @since 0.1.4
 */
export const chainTask: <A, B>(f: (a: A) => Task<B>) => (ma: TaskOption<A>) => TaskOption<B> = (f) => (ma) =>
  T.chain(ma, (a) => fromTask(f(a)))

/**
 * @category Monad
 * @since 0.1.4
 */
export const chainOption: <A, B>(f: (a: A) => O.Option<B>) => (ma: TaskOption<A>) => TaskOption<B> = (f) =>
  taskMap(O.chain(f))

/**
 * @category Monad
 * @since 0.1.10
 */
export const chainOptionK: <A, B>(f: (a: A) => O.Option<B>) => (ma: TaskOption<A>) => TaskOption<B> = (f) =>
  chain(fromOptionK(f))

/**
 * @category Monad
 * @since 0.1.18
 */
export const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A> = (mma) => T.chain(mma, identity)

/**
 * @category Alternative
 * @since 0.1.18
 */
export const alt: <A>(that: () => TaskOption<A>) => (fa: TaskOption<A>) => TaskOption<A> = (that) => (fa) =>
  T.alt(fa, that)

/**
 * @category Alternative
 * @since 0.1.18
 */
export const zero: <A>() => TaskOption<A> = T.none

/**
 * @category Compactable
 * @since 0.1.18
 */
export const compact: <A>(fa: TaskOption<O.Option<A>>) => TaskOption<A> = F.compact

/**
 * @category Compactable
 * @since 0.1.18
 */
export const separate: <A, B>(ma: TaskOption<Either<A, B>>) => Separated<TaskOption<A>, TaskOption<B>> = F.separate

/**
 * @category Filterable
 * @since 0.1.18
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: TaskOption<A>) => TaskOption<B>
  <A>(predicate: Predicate<A>): (fa: TaskOption<A>) => TaskOption<A>
} = <A>(predicate: Predicate<A>) => (fa: TaskOption<A>): TaskOption<A> => F.filter(fa, predicate)

/**
 * @category Filterable
 * @since 0.1.18
 */
export const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fa: TaskOption<A>) => TaskOption<B> = (f) => (fa) =>
  F.filterMap(fa, f)

/**
 * @category Filterable
 * @since 0.1.18
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: TaskOption<A>) => Separated<TaskOption<A>, TaskOption<B>>
  <A>(predicate: Predicate<A>): (fa: TaskOption<A>) => Separated<TaskOption<A>, TaskOption<A>>
} = <A>(predicate: Predicate<A>) => (fa: TaskOption<A>): Separated<TaskOption<A>, TaskOption<A>> =>
  F.partition(fa, predicate)

/**
 * @category Filterable
 * @since 0.1.18
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: TaskOption<A>) => Separated<TaskOption<B>, TaskOption<C>> = (f) => (fa) => F.partitionMap(fa, f)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 0.1.0
 */
const URI = 'TaskOptionContrib'

/**
 * @category instances
 * @since 0.1.0
 */
export type URI = typeof URI

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    TaskOptionContrib: TaskOption<A>
  }
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Functor: Functor1<URI> = {
  URI,
  map: T.map
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Applicative: Applicative1<URI> = {
  URI,
  map: T.map,
  ap: T.ap,
  of
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Apply: Apply1<URI> = {
  URI,
  map: T.map,
  ap: T.ap
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Monad: Monad1<URI> = {
  URI,
  map: T.map,
  ap: T.ap,
  chain: T.chain,
  of
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Alternative: Alternative1<URI> = {
  URI,
  map: T.map,
  ap: T.ap,
  alt: T.alt,
  of,
  zero
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Compactable: Compactable1<URI> = {
  URI,
  compact,
  separate
}

/**
 * @category instances
 * @since 0.1.18
 */
export const Filterable: Filterable1<URI> = {
  URI,
  map: T.map,
  compact: F.compact,
  filter: F.filter,
  filterMap: F.filterMap,
  separate: F.separate,
  partition: F.partition,
  partitionMap: F.partitionMap
}

/**
 * @category instances
 * @since 0.1.0
 */
export const taskOption: Monad1<URI> & Alternative1<URI> & Filterable1<URI> = {
  URI,
  of: some,
  ap: T.ap,
  chain: T.chain,
  alt: T.alt,
  zero: T.none,
  ...getFilterableComposition(task, O.option)
}
