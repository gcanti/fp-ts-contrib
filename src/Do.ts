/**
 * @file This module provides a simuation of Haskell do notation.
 */
import { HKT, Type, Type2, URIS, URIS2, URIS3, Type3 } from 'fp-ts/lib/HKT'
import { Monad, Monad1, Monad2, Monad2C, Monad3, Monad3C } from 'fp-ts/lib/Monad'

export interface Do3<M extends URIS3, S extends object> {
  do: <U, L>(ma: Type3<M, U, L, unknown>) => Do3C<M, S, U, L>
  doL: <U, L>(f: (s: S) => Type3<M, U, L, unknown>) => Do3C<M, S, U, L>
  bind: <N extends string, A, U, L>(
    name: Exclude<N, keyof S>,
    ma: Type3<M, U, L, A>
  ) => Do3C<M, S & { [K in N]: A }, U, L>
  bindL: <N extends string, A, U, L>(
    name: Exclude<N, keyof S>,
    f: (s: S) => Type3<M, U, L, A>
  ) => Do3C<M, S & { [K in N]: A }, U, L>
  return: <A, U, L>(f: (s: S) => A) => Type3<M, U, L, A>
  done: <U, L>() => Type3<M, U, L, S>
}

export interface Do3C<M extends URIS3, S extends object, U, L> {
  do: (ma: Type3<M, U, L, unknown>) => Do3C<M, S, U, L>
  doL: (f: (s: S) => Type3<M, U, L, unknown>) => Do3C<M, S, U, L>
  bind: <N extends string, A>(name: Exclude<N, keyof S>, ma: Type3<M, U, L, A>) => Do3C<M, S & { [K in N]: A }, U, L>
  bindL: <N extends string, A>(
    name: Exclude<N, keyof S>,
    f: (s: S) => Type3<M, U, L, A>
  ) => Do3C<M, S & { [K in N]: A }, U, L>
  return: <A>(f: (s: S) => A) => Type3<M, U, L, A>
  done: () => Type3<M, U, L, S>
}

export interface Do2<M extends URIS2, S extends object> {
  do: <L>(ma: Type2<M, L, unknown>) => Do2C<M, S, L>
  doL: <L>(f: (s: S) => Type2<M, L, unknown>) => Do2C<M, S, L>
  bind: <N extends string, A, L>(name: Exclude<N, keyof S>, ma: Type2<M, L, A>) => Do2C<M, S & { [K in N]: A }, L>
  bindL: <N extends string, A, L>(
    name: Exclude<N, keyof S>,
    f: (s: S) => Type2<M, L, A>
  ) => Do2C<M, S & { [K in N]: A }, L>
  return: <A, L>(f: (s: S) => A) => Type2<M, L, A>
  done: <L>() => Type2<M, L, S>
}

export interface Do2C<M extends URIS2, S extends object, L> {
  do: (ma: Type2<M, L, unknown>) => Do2C<M, S, L>
  doL: (f: (s: S) => Type2<M, L, unknown>) => Do2C<M, S, L>
  bind: <N extends string, A>(name: Exclude<N, keyof S>, ma: Type2<M, L, A>) => Do2C<M, S & { [K in N]: A }, L>
  bindL: <N extends string, A>(
    name: Exclude<N, keyof S>,
    f: (s: S) => Type2<M, L, A>
  ) => Do2C<M, S & { [K in N]: A }, L>
  return: <A>(f: (s: S) => A) => Type2<M, L, A>
  done: () => Type2<M, L, S>
}

export interface Do1<M extends URIS, S extends object> {
  do: (ma: Type<M, unknown>) => Do1<M, S>
  doL: (f: (s: S) => Type<M, unknown>) => Do1<M, S>
  bind: <N extends string, A>(name: Exclude<N, keyof S>, ma: Type<M, A>) => Do1<M, S & { [K in N]: A }>
  bindL: <N extends string, A>(name: Exclude<N, keyof S>, f: (s: S) => Type<M, A>) => Do1<M, S & { [K in N]: A }>
  return: <A>(f: (s: S) => A) => Type<M, A>
  done: () => Type<M, S>
}

export interface Do0<M, S extends object> {
  do: (ma: HKT<M, unknown>) => Do0<M, S>
  doL: (f: (s: S) => HKT<M, unknown>) => Do0<M, S>
  bind: <N extends string, A>(name: Exclude<N, keyof S>, ma: HKT<M, A>) => Do0<M, S & { [K in N]: A }>
  bindL: <N extends string, A>(name: Exclude<N, keyof S>, f: (s: S) => HKT<M, A>) => Do0<M, S & { [K in N]: A }>
  return: <A>(f: (s: S) => A) => HKT<M, A>
  done: () => HKT<M, S>
}

type LinkedList<A> = { type: 'Nil'; length: number } | { type: 'Cons'; head: A; tail: LinkedList<A>; length: number }

const nil: LinkedList<never> = { type: 'Nil', length: 0 }

const cons = <A>(head: A, tail: LinkedList<A>): LinkedList<A> => ({
  type: 'Cons',
  head,
  tail,
  length: tail.length + 1
})

const toArray = <A>(list: LinkedList<A>): Array<A> => {
  const len = list.length
  const r: Array<A> = new Array(len)
  let l: LinkedList<A> = list
  let i = 1
  while (l.type !== 'Nil') {
    r[len - i] = l.head
    i++
    l = l.tail
  }
  return r
}

type Action<M> =
  | { type: 'do'; action: HKT<M, unknown> }
  | { type: 'doL'; f: (s: unknown) => HKT<M, unknown> }
  | { type: 'bind'; name: string; action: HKT<M, unknown> }
  | { type: 'bindL'; name: string; f: (s: unknown) => HKT<M, unknown> }

class DoClass<M> {
  constructor(readonly M: Monad<M>, private actions: LinkedList<Action<M>>) {}
  do(action: HKT<M, unknown>): DoClass<M> {
    return new DoClass(this.M, cons({ type: 'do', action }, this.actions))
  }
  doL(f: (s: unknown) => HKT<M, unknown>): DoClass<M> {
    return new DoClass(this.M, cons({ type: 'doL', f }, this.actions))
  }
  bind(name: string, action: HKT<M, unknown>): DoClass<M> {
    return new DoClass(this.M, cons({ type: 'bind', name, action }, this.actions))
  }
  bindL(name: string, f: (s: unknown) => HKT<M, unknown>): DoClass<M> {
    return new DoClass(this.M, cons({ type: 'bindL', name, f }, this.actions))
  }
  return<B>(f: (s: unknown) => B): HKT<M, B> {
    return this.M.map(this.done(), f)
  }
  done(): HKT<M, unknown> {
    const actions = this.actions
    const len = actions.length
    const as = toArray(actions)
    let result: HKT<M, any> = this.M.of({})
    const M = this.M
    for (let i = 0; i < len; i++) {
      const a = as[i]
      switch (a.type) {
        case 'do':
          result = M.chain(result, s => M.map(a.action, () => s))
          break
        case 'doL':
          result = M.chain(result, s => M.map(a.f(s), () => s))
          break
        case 'bind':
          result = M.chain(result, s =>
            M.map(a.action, b => {
              s[a.name] = b
              return s
            })
          )
          break
        case 'bindL':
          result = M.chain(result, s =>
            M.map(a.f(s), b => {
              s[a.name] = b
              return s
            })
          )
          break
      }
    }
    return result
  }
}

/**
 * This function provides a simuation of Haskell do notation. The `bind` / `bindL` functions contributes to a threaded
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
export function Do<M extends URIS3, U, L>(M: Monad3C<M, U, L>): Do3C<M, {}, U, L>
export function Do<M extends URIS2>(M: Monad2<M>): Do2<M, {}>
export function Do<M extends URIS2, L>(M: Monad2C<M, L>): Do2C<M, {}, L>
export function Do<M extends URIS>(M: Monad1<M>): Do1<M, {}>
export function Do<M>(M: Monad<M>): Do0<M, {}>
export function Do<M>(M: Monad<M>): Do0<M, {}> {
  return new DoClass(M, nil) as any
}
