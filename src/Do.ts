/**
 * This module provides a simuation of Haskell do notation.
 *
 * @since 0.1.0
 */
import { sequenceS } from 'fp-ts/lib/Apply'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from 'fp-ts/lib/HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3 } from 'fp-ts/lib/Monad'

type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R

/**
 * @since 0.1.0
 */
export interface Do3<M extends URIS3, S extends object> {
  do: <R, E>(ma: Kind3<M, R, E, any>) => Do3C<M, S, R, E>
  doL: <R, E>(f: (s: S) => Kind3<M, R, E, any>) => Do3C<M, S, R, E>
  bind: <N extends string, A, R, E>(
    name: Exclude<N, keyof S>,
    ma: Kind3<M, R, E, A>
  ) => Do3C<M, S & { [K in N]: A }, R, E>
  bindL: <N extends string, A, R, E>(
    name: Exclude<N, keyof S>,
    f: (s: S) => Kind3<M, R, E, A>
  ) => Do3C<M, S & { [K in N]: A }, R, E>
  let: <N extends string, A, R, E>(name: Exclude<N, keyof S>, a: A) => Do3C<M, S & { [K in N]: A }, R, E>
  letL: <N extends string, A, R, E>(name: Exclude<N, keyof S>, f: (s: S) => A) => Do3C<M, S & { [K in N]: A }, R, E>
  sequenceS: <R, E, I extends Record<string, Kind3<M, R, E, any>>>(
    r: EnforceNonEmptyRecord<I> & Record<string, Kind3<M, R, E, any>> & { [K in keyof S]?: never }
  ) => Do3C<M, S & { [K in keyof I]: [I[K]] extends [Kind3<M, any, any, infer A>] ? A : never }, R, E>
  sequenceSL: <R, E, I extends Record<string, Kind3<M, R, E, any>>>(
    f: (s: S) => EnforceNonEmptyRecord<I> & Record<string, Kind3<M, R, E, any>> & { [K in keyof S]?: never }
  ) => Do3C<M, S & { [K in keyof I]: [I[K]] extends [Kind3<M, any, any, infer A>] ? A : never }, R, E>
  return: <R, E, A>(f: (s: S) => A) => Kind3<M, R, E, A>
  done: <R, E>() => Kind3<M, R, E, S>
}

/**
 * @since 0.1.0
 */
export interface Do3C<M extends URIS3, S extends object, R, E> {
  do: (ma: Kind3<M, R, E, any>) => Do3C<M, S, R, E>
  doL: (f: (s: S) => Kind3<M, R, E, any>) => Do3C<M, S, R, E>
  bind: <N extends string, A>(name: Exclude<N, keyof S>, ma: Kind3<M, R, E, A>) => Do3C<M, S & { [K in N]: A }, R, E>
  bindL: <N extends string, A>(
    name: Exclude<N, keyof S>,
    f: (s: S) => Kind3<M, R, E, A>
  ) => Do3C<M, S & { [K in N]: A }, R, E>
  let: <N extends string, A>(name: Exclude<N, keyof S>, a: A) => Do3C<M, S & { [K in N]: A }, R, E>
  letL: <N extends string, A>(name: Exclude<N, keyof S>, f: (s: S) => A) => Do3C<M, S & { [K in N]: A }, R, E>
  sequenceS: <I extends Record<string, Kind3<M, R, E, any>>>(
    r: EnforceNonEmptyRecord<I> & { [K in keyof S]?: never }
  ) => Do3C<M, S & { [K in keyof I]: [I[K]] extends [Kind3<M, any, any, infer A>] ? A : never }, R, E>
  sequenceSL: <I extends Record<string, Kind3<M, R, E, any>>>(
    f: (s: S) => EnforceNonEmptyRecord<I> & { [K in keyof S]?: never }
  ) => Do3C<M, S & { [K in keyof I]: [I[K]] extends [Kind3<M, any, any, infer A>] ? A : never }, R, E>
  return: <A>(f: (s: S) => A) => Kind3<M, R, E, A>
  done: () => Kind3<M, R, E, S>
}

/**
 * @since 0.1.0
 */
export interface Do2<M extends URIS2, S extends object> {
  do: <E>(ma: Kind2<M, E, any>) => Do2C<M, S, E>
  doL: <E>(f: (s: S) => Kind2<M, E, any>) => Do2C<M, S, E>
  bind: <N extends string, A, E>(name: Exclude<N, keyof S>, ma: Kind2<M, E, A>) => Do2C<M, S & { [K in N]: A }, E>
  bindL: <N extends string, A, E>(
    name: Exclude<N, keyof S>,
    f: (s: S) => Kind2<M, E, A>
  ) => Do2C<M, S & { [K in N]: A }, E>
  let: <N extends string, A, E>(name: Exclude<N, keyof S>, a: A) => Do2C<M, S & { [K in N]: A }, E>
  letL: <N extends string, A, E>(name: Exclude<N, keyof S>, f: (s: S) => A) => Do2C<M, S & { [K in N]: A }, E>
  sequenceS: <E, I extends Record<string, Kind2<M, E, any>>>(
    r: EnforceNonEmptyRecord<I> & Record<string, Kind2<M, E, any>> & { [K in keyof S]?: never }
  ) => Do2C<M, S & { [K in keyof I]: [I[K]] extends [Kind2<M, any, infer A>] ? A : never }, E>
  sequenceSL: <E, I extends Record<string, Kind2<M, E, any>>>(
    f: (s: S) => EnforceNonEmptyRecord<I> & Record<string, Kind2<M, E, any>> & { [K in keyof S]?: never }
  ) => Do2C<M, S & { [K in keyof I]: [I[K]] extends [Kind2<M, any, infer A>] ? A : never }, E>
  return: <E, A>(f: (s: S) => A) => Kind2<M, E, A>
  done: <E>() => Kind2<M, E, S>
}

/**
 * @since 0.1.0
 */
export interface Do2C<M extends URIS2, S extends object, E> {
  do: (ma: Kind2<M, E, any>) => Do2C<M, S, E>
  doL: (f: (s: S) => Kind2<M, E, any>) => Do2C<M, S, E>
  bind: <N extends string, A>(name: Exclude<N, keyof S>, ma: Kind2<M, E, A>) => Do2C<M, S & { [K in N]: A }, E>
  bindL: <N extends string, A>(
    name: Exclude<N, keyof S>,
    f: (s: S) => Kind2<M, E, A>
  ) => Do2C<M, S & { [K in N]: A }, E>
  let: <N extends string, A>(name: Exclude<N, keyof S>, a: A) => Do2C<M, S & { [K in N]: A }, E>
  letL: <N extends string, A>(name: Exclude<N, keyof S>, f: (s: S) => A) => Do2C<M, S & { [K in N]: A }, E>
  sequenceS: <I extends Record<string, Kind2<M, E, any>>>(
    r: EnforceNonEmptyRecord<I> & { [K in keyof S]?: never }
  ) => Do2C<M, S & { [K in keyof I]: [I[K]] extends [Kind2<M, any, infer A>] ? A : never }, E>
  sequenceSL: <I extends Record<string, Kind2<M, E, any>>>(
    f: (s: S) => EnforceNonEmptyRecord<I> & { [K in keyof S]?: never }
  ) => Do2C<M, S & { [K in keyof I]: [I[K]] extends [Kind2<M, any, infer A>] ? A : never }, E>
  return: <A>(f: (s: S) => A) => Kind2<M, E, A>
  done: () => Kind2<M, E, S>
}

/**
 * @since 0.1.0
 */
export interface Do1<M extends URIS, S extends object> {
  do: (ma: Kind<M, any>) => Do1<M, S>
  doL: (f: (s: S) => Kind<M, any>) => Do1<M, S>
  bind: <N extends string, A>(name: Exclude<N, keyof S>, ma: Kind<M, A>) => Do1<M, S & { [K in N]: A }>
  bindL: <N extends string, A>(name: Exclude<N, keyof S>, f: (s: S) => Kind<M, A>) => Do1<M, S & { [K in N]: A }>
  let: <N extends string, A>(name: Exclude<N, keyof S>, a: A) => Do1<M, S & { [K in N]: A }>
  letL: <N extends string, A>(name: Exclude<N, keyof S>, f: (s: S) => A) => Do1<M, S & { [K in N]: A }>
  sequenceS: <R extends Record<string, Kind<M, any>>>(
    r: EnforceNonEmptyRecord<R> & { [K in keyof S]?: never }
  ) => Do1<M, S & { [K in keyof R]: [R[K]] extends [Kind<M, infer A>] ? A : never }>
  sequenceSL: <I extends Record<string, Kind<M, any>>>(
    f: (s: S) => EnforceNonEmptyRecord<I> & { [K in keyof S]?: never }
  ) => Do1<M, S & { [K in keyof I]: [I[K]] extends [Kind<M, infer A>] ? A : never }>
  return: <A>(f: (s: S) => A) => Kind<M, A>
  done: () => Kind<M, S>
}

/**
 * @since 0.1.0
 */
export interface Do0<M, S extends object> {
  do: (ma: HKT<M, any>) => Do0<M, S>
  doL: (f: (s: S) => HKT<M, any>) => Do0<M, S>
  bind: <N extends string, A>(name: Exclude<N, keyof S>, ma: HKT<M, A>) => Do0<M, S & { [K in N]: A }>
  bindL: <N extends string, A>(name: Exclude<N, keyof S>, f: (s: S) => HKT<M, A>) => Do0<M, S & { [K in N]: A }>
  let: <N extends string, A>(name: Exclude<N, keyof S>, a: A) => Do0<M, S & { [K in N]: A }>
  letL: <N extends string, A>(name: Exclude<N, keyof S>, f: (s: S) => A) => Do0<M, S & { [K in N]: A }>
  sequenceS: <R extends Record<string, HKT<M, any>>>(
    r: EnforceNonEmptyRecord<R> & { [K in keyof S]?: never }
  ) => Do0<M, S & { [K in keyof R]: [R[K]] extends [HKT<M, infer A>] ? A : never }>
  sequenceSL: <R extends Record<string, HKT<M, any>>>(
    f: (s: S) => EnforceNonEmptyRecord<R> & { [K in keyof S]?: never }
  ) => Do0<M, S & { [K in keyof R]: [R[K]] extends [HKT<M, infer A>] ? A : never }>
  return: <A>(f: (s: S) => A) => HKT<M, A>
  done: () => HKT<M, S>
}

class DoClass<M> {
  constructor(readonly M: Monad<M>, private result: HKT<M, any>) {}
  do(action: HKT<M, any>): DoClass<M> {
    return new DoClass(
      this.M,
      this.M.chain(this.result, (s) => this.M.map(action, () => s))
    )
  }
  doL(f: (s: any) => HKT<M, any>): DoClass<M> {
    return new DoClass(
      this.M,
      this.M.chain(this.result, (s) => this.M.map(f(s), () => s))
    )
  }
  bind(name: string, action: HKT<M, any>): DoClass<M> {
    return new DoClass(
      this.M,
      this.M.chain(this.result, (s) => this.M.map(action, (b) => Object.assign({}, s, { [name]: b })))
    )
  }
  bindL(name: string, f: (s: any) => HKT<M, any>): DoClass<M> {
    return new DoClass(
      this.M,
      this.M.chain(this.result, (s) => this.M.map(f(s), (b) => Object.assign({}, s, { [name]: b })))
    )
  }
  let(name: string, a: any): DoClass<M> {
    return new DoClass(
      this.M,
      this.M.map(this.result, (s) => Object.assign({}, s, { [name]: a }))
    )
  }
  letL(name: string, f: (s: any) => any): DoClass<M> {
    return new DoClass(
      this.M,
      this.M.map(this.result, (s) => Object.assign({}, s, { [name]: f(s) }))
    )
  }
  sequenceS(r: Record<string, HKT<M, any>>): DoClass<M> {
    return new DoClass(
      this.M,
      this.M.chain(this.result, (s) => this.M.map(sequenceS(this.M)(r), (r) => Object.assign({}, s, r)))
    )
  }
  sequenceSL(f: (s: any) => Record<string, HKT<M, any>>): DoClass<M> {
    return new DoClass(
      this.M,
      this.M.chain(this.result, (s) => this.M.map(sequenceS(this.M)(f(s)), (r) => Object.assign({}, s, r)))
    )
  }
  return<B>(f: (s: any) => B): HKT<M, B> {
    return this.M.map(this.result, f)
  }
  done(): HKT<M, any> {
    return this.result
  }
}

const init = {}

/**
 * This function provides a simulation of Haskell do notation. The `bind` / `bindL` functions contributes to a threaded
 * scope that is available to each subsequent step. The `do` / `doL` functions can be used to perform computations that
 * add nothing to the scope. The `return` function lifts the given callback to the monad context. Finally the `done`
 * function returns the scope.
 *
 * @example
 * import { option, some } from 'fp-ts/lib/Option'
 * import { Do } from 'fp-ts-contrib/lib/Do'
 *
 * // x: Option<number>
 * const x = Do(option) // <- a monad instance
 *   .bindL('foo', () => some('bar'))
 *   .bindL('baz', () => some(4))
 *   .return(({ foo, baz }) => foo.length + baz)
 *
 * assert.deepStrictEqual(x, some(7))
 *
 * @since 0.0.2
 */
export function Do<M extends URIS3>(M: Monad3<M>): Do3<M, {}>
export function Do<M extends URIS2>(M: Monad2<M>): Do2<M, {}>
export function Do<M extends URIS2, L>(M: Monad2C<M, L>): Do2C<M, {}, L>
export function Do<M extends URIS>(M: Monad1<M>): Do1<M, {}>
export function Do<M>(M: Monad<M>): Do0<M, {}>
export function Do<M>(M: Monad<M>): any {
  return new DoClass(M, M.of(init))
}
