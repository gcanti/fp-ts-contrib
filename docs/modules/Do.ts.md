---
title: Do.ts
nav_order: 8
parent: Modules
---

# Do overview

This module provides a simuation of Haskell do notation.

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Do0 (interface)](#do0-interface)
- [Do1 (interface)](#do1-interface)
- [Do2 (interface)](#do2-interface)
- [Do2C (interface)](#do2c-interface)
- [Do3 (interface)](#do3-interface)
- [Do3C (interface)](#do3c-interface)
- [Do](#do)

---

# Do0 (interface)

**Signature**

```ts
export interface Do0<M, S extends object> {
  do: (ma: HKT<M, any>) => Do0<M, S>
  doL: (f: (s: S) => HKT<M, any>) => Do0<M, S>
  bind: <N extends string, A>(name: Exclude<N, keyof S>, ma: HKT<M, A>) => Do0<M, S & { [K in N]: A }>
  bindL: <N extends string, A>(name: Exclude<N, keyof S>, f: (s: S) => HKT<M, A>) => Do0<M, S & { [K in N]: A }>
  sequenceS: <R extends Record<string, HKT<M, any>>>(
    r: EnforceNonEmptyRecord<R> & { [K in keyof S]?: never }
  ) => Do0<M, S & { [K in keyof R]: [R[K]] extends [HKT<M, infer A>] ? A : never }>
  sequenceSL: <R extends Record<string, HKT<M, any>>>(
    f: (s: S) => EnforceNonEmptyRecord<R> & { [K in keyof S]?: never }
  ) => Do0<M, S & { [K in keyof R]: [R[K]] extends [HKT<M, infer A>] ? A : never }>
  return: <A>(f: (s: S) => A) => HKT<M, A>
  done: () => HKT<M, S>
}
```

Added in v0.1.0

# Do1 (interface)

**Signature**

```ts
export interface Do1<M extends URIS, S extends object> {
  do: (ma: Kind<M, any>) => Do1<M, S>
  doL: (f: (s: S) => Kind<M, any>) => Do1<M, S>
  bind: <N extends string, A>(name: Exclude<N, keyof S>, ma: Kind<M, A>) => Do1<M, S & { [K in N]: A }>
  bindL: <N extends string, A>(name: Exclude<N, keyof S>, f: (s: S) => Kind<M, A>) => Do1<M, S & { [K in N]: A }>
  sequenceS: <R extends Record<string, Kind<M, any>>>(
    r: EnforceNonEmptyRecord<R> & { [K in keyof S]?: never }
  ) => Do1<M, S & { [K in keyof R]: [R[K]] extends [Kind<M, infer A>] ? A : never }>
  sequenceSL: <I extends Record<string, Kind<M, any>>>(
    f: (s: S) => EnforceNonEmptyRecord<I> & { [K in keyof S]?: never }
  ) => Do1<M, S & { [K in keyof I]: [I[K]] extends [Kind<M, infer A>] ? A : never }>
  return: <A>(f: (s: S) => A) => Kind<M, A>
  done: () => Kind<M, S>
}
```

Added in v0.1.0

# Do2 (interface)

**Signature**

```ts
export interface Do2<M extends URIS2, S extends object> {
  do: <E>(ma: Kind2<M, E, any>) => Do2C<M, S, E>
  doL: <E>(f: (s: S) => Kind2<M, E, any>) => Do2C<M, S, E>
  bind: <N extends string, A, E>(name: Exclude<N, keyof S>, ma: Kind2<M, E, A>) => Do2C<M, S & { [K in N]: A }, E>
  bindL: <N extends string, A, E>(
    name: Exclude<N, keyof S>,
    f: (s: S) => Kind2<M, E, A>
  ) => Do2C<M, S & { [K in N]: A }, E>
  sequenceS: <E, I extends Record<string, Kind2<M, E, any>>>(
    r: EnforceNonEmptyRecord<I> & Record<string, Kind2<M, E, any>> & { [K in keyof S]?: never }
  ) => Do2C<M, S & { [K in keyof I]: [I[K]] extends [Kind2<M, any, infer A>] ? A : never }, E>
  sequenceSL: <E, I extends Record<string, Kind2<M, E, any>>>(
    f: (s: S) => EnforceNonEmptyRecord<I> & Record<string, Kind2<M, E, any>> & { [K in keyof S]?: never }
  ) => Do2C<M, S & { [K in keyof I]: [I[K]] extends [Kind2<M, any, infer A>] ? A : never }, E>
  return: <E, A>(f: (s: S) => A) => Kind2<M, E, A>
  done: <E>() => Kind2<M, E, S>
}
```

Added in v0.1.0

# Do2C (interface)

**Signature**

```ts
export interface Do2C<M extends URIS2, S extends object, E> {
  do: (ma: Kind2<M, E, any>) => Do2C<M, S, E>
  doL: (f: (s: S) => Kind2<M, E, any>) => Do2C<M, S, E>
  bind: <N extends string, A>(name: Exclude<N, keyof S>, ma: Kind2<M, E, A>) => Do2C<M, S & { [K in N]: A }, E>
  bindL: <N extends string, A>(
    name: Exclude<N, keyof S>,
    f: (s: S) => Kind2<M, E, A>
  ) => Do2C<M, S & { [K in N]: A }, E>
  sequenceS: <I extends Record<string, Kind2<M, E, any>>>(
    r: EnforceNonEmptyRecord<I> & { [K in keyof S]?: never }
  ) => Do2C<M, S & { [K in keyof I]: [I[K]] extends [Kind2<M, any, infer A>] ? A : never }, E>
  sequenceSL: <I extends Record<string, Kind2<M, E, any>>>(
    f: (s: S) => EnforceNonEmptyRecord<I> & { [K in keyof S]?: never }
  ) => Do2C<M, S & { [K in keyof I]: [I[K]] extends [Kind2<M, any, infer A>] ? A : never }, E>
  return: <A>(f: (s: S) => A) => Kind2<M, E, A>
  done: () => Kind2<M, E, S>
}
```

Added in v0.1.0

# Do3 (interface)

**Signature**

```ts
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
  sequenceS: <R, E, I extends Record<string, Kind3<M, R, E, any>>>(
    r: EnforceNonEmptyRecord<I> & Record<string, Kind3<M, R, E, any>> & { [K in keyof S]?: never }
  ) => Do3C<M, S & { [K in keyof I]: [I[K]] extends [Kind3<M, any, any, infer A>] ? A : never }, R, E>
  sequenceSL: <R, E, I extends Record<string, Kind3<M, R, E, any>>>(
    f: (s: S) => EnforceNonEmptyRecord<I> & Record<string, Kind3<M, R, E, any>> & { [K in keyof S]?: never }
  ) => Do3C<M, S & { [K in keyof I]: [I[K]] extends [Kind3<M, any, any, infer A>] ? A : never }, R, E>
  return: <R, E, A>(f: (s: S) => A) => Kind3<M, R, E, A>
  done: <R, E>() => Kind3<M, R, E, S>
}
```

Added in v0.1.0

# Do3C (interface)

**Signature**

```ts
export interface Do3C<M extends URIS3, S extends object, R, E> {
  do: (ma: Kind3<M, R, E, any>) => Do3C<M, S, R, E>
  doL: (f: (s: S) => Kind3<M, R, E, any>) => Do3C<M, S, R, E>
  bind: <N extends string, A>(name: Exclude<N, keyof S>, ma: Kind3<M, R, E, A>) => Do3C<M, S & { [K in N]: A }, R, E>
  bindL: <N extends string, A>(
    name: Exclude<N, keyof S>,
    f: (s: S) => Kind3<M, R, E, A>
  ) => Do3C<M, S & { [K in N]: A }, R, E>
  sequenceS: <I extends Record<string, Kind3<M, R, E, any>>>(
    r: EnforceNonEmptyRecord<I> & { [K in keyof S]?: never }
  ) => Do3C<M, S & { [K in keyof I]: [I[K]] extends [Kind3<M, any, any, infer A>] ? A : never }, R, E>
  sequenceSL: <I extends Record<string, Kind3<M, R, E, any>>>(
    f: (s: S) => EnforceNonEmptyRecord<I> & { [K in keyof S]?: never }
  ) => Do3C<M, S & { [K in keyof I]: [I[K]] extends [Kind3<M, any, any, infer A>] ? A : never }, R, E>
  return: <A>(f: (s: S) => A) => Kind3<M, R, E, A>
  done: () => Kind3<M, R, E, S>
}
```

Added in v0.1.0

# Do

This function provides a simulation of Haskell do notation. The `bind` / `bindL` functions contributes to a threaded
scope that is available to each subsequent step. The `do` / `doL` functions can be used to perform computations that
add nothing to the scope. The `return` function lifts the given callback to the monad context. Finally the `done`
function returns the scope.

**Signature**

```ts
export function Do<M extends URIS3>(M: Monad3<M>): Do3<M, {}>
export function Do<M extends URIS2>(M: Monad2<M>): Do2<M, {}>
export function Do<M extends URIS2, L>(M: Monad2C<M, L>): Do2C<M, {}, L>
export function Do<M extends URIS>(M: Monad1<M>): Do1<M, {}>
export function Do<M>(M: Monad<M>): Do0<M, {}> { ... }
```

**Example**

```ts
import { option, some } from 'fp-ts/lib/Option'
import { Do } from 'fp-ts-contrib/lib/Do'

// x: Option<number>
const x = Do(option) // <- a monad instance
  .bindL('foo', () => some('bar'))
  .bindL('baz', () => some(4))
  .return(({ foo, baz }) => foo.length + baz)

assert.deepStrictEqual(x, some(7))
```

Added in v0.0.2
