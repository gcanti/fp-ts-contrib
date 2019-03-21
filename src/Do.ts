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

export function Do<M extends URIS3>(M: Monad3<M>): Do3<M, {}>
export function Do<M extends URIS3, U, L>(M: Monad3C<M, U, L>): Do3C<M, {}, U, L>
export function Do<M extends URIS2>(M: Monad2<M>): Do2<M, {}>
export function Do<M extends URIS2, L>(M: Monad2C<M, L>): Do2C<M, {}, L>
export function Do<M extends URIS>(M: Monad1<M>): Do1<M, {}>
export function Do<M>(M: Monad<M>): Do0<M, {}>
export function Do<M>(_: Monad<M>): Do0<M, {}> {
  function toDo<A extends object>(ma: HKT<M, A>): Do0<M, A> {
    return {
      do(mv: HKT<M, unknown>): Do0<M, A> {
        return toDo(_.chain(ma, a => _.map(mv, () => a)))
      },
      doL(fmv: (s: A) => HKT<M, unknown>): Do0<M, A> {
        return toDo(_.chain(ma, a => _.map(fmv(a), () => a)))
      },
      bind<N extends string, B>(name: Exclude<N, keyof A>, mb: HKT<M, B>): Do0<M, A & { [K in N]: B }> {
        return toDo(_.chain(ma, a => _.map(mb, b => ({ ...(a as object), [name]: b })))) as any
      },
      bindL<N extends string, B>(name: Exclude<N, keyof A>, fmb: (s: A) => HKT<M, B>): Do0<M, A & { [K in N]: B }> {
        return toDo(_.chain(ma, a => _.map(fmb(a), b => ({ ...(a as object), [name]: b })))) as any
      },
      return<B>(f: (s: A) => B): HKT<M, B> {
        return _.map(ma, f)
      },
      done(): HKT<M, A> {
        return ma
      }
    }
  }

  return toDo(_.of({}))
}
