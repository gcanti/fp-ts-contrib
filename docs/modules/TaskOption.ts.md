---
title: TaskOption.ts
nav_order: 24
parent: Modules
---

## TaskOption overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alternative](#alternative)
  - [alt](#alt)
  - [zero](#zero)
- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [Compactable](#compactable)
  - [compact](#compact)
  - [separate](#separate)
- [Filterable](#filterable)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [chainOption](#chainoption)
  - [chainOptionK](#chainoptionk)
  - [chainTask](#chaintask)
  - [flatten](#flatten)
- [combinators](#combinators)
  - [mapNullable](#mapnullable)
- [constructors](#constructors)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromOptionK](#fromoptionk)
  - [fromTask](#fromtask)
  - [fromTaskEither](#fromtaskeither)
  - [none](#none)
  - [some](#some)
  - [tryCatch](#trycatch)
- [destructors](#destructors)
  - [fold](#fold)
  - [getOrElse](#getorelse)
  - [toNullable](#tonullable)
  - [toUndefined](#toundefined)
- [instances](#instances)
  - [Alternative](#alternative-1)
  - [Applicative](#applicative-1)
  - [Apply](#apply-1)
  - [Compactable](#compactable-1)
  - [Filterable](#filterable-1)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [URI (type alias)](#uri-type-alias)
  - [taskOption](#taskoption)
- [model](#model)
  - [TaskOption (interface)](#taskoption-interface)

---

# Alternative

## alt

**Signature**

```ts
export declare const alt: <A>(that: () => TaskOption<A>) => (fa: TaskOption<A>) => TaskOption<A>
```

Added in v0.1.18

## zero

**Signature**

```ts
export declare const zero: <A>() => TaskOption<A>
```

Added in v0.1.18

# Applicative

## of

**Signature**

```ts
export declare const of: <A>(a: A) => TaskOption<A>
```

Added in v0.1.18

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(fa: TaskOption<A>) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v0.1.18

## apFirst

**Signature**

```ts
export declare const apFirst: <B>(fb: TaskOption<B>) => <A>(fa: TaskOption<A>) => TaskOption<A>
```

Added in v0.1.18

## apSecond

**Signature**

```ts
export declare const apSecond: <B>(fb: TaskOption<B>) => <A>(fa: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.18

# Compactable

## compact

**Signature**

```ts
export declare const compact: <A>(fa: TaskOption<O.Option<A>>) => TaskOption<A>
```

Added in v0.1.18

## separate

**Signature**

```ts
export declare const separate: <A, B>(ma: TaskOption<Either<A, B>>) => Separated<TaskOption<A>, TaskOption<B>>
```

Added in v0.1.18

# Filterable

## filter

**Signature**

```ts
export declare const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: TaskOption<A>) => TaskOption<B>
  <A>(predicate: Predicate<A>): (fa: TaskOption<A>) => TaskOption<A>
}
```

Added in v0.1.18

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.18

## partition

**Signature**

```ts
export declare const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: TaskOption<A>) => Separated<TaskOption<A>, TaskOption<B>>
  <A>(predicate: Predicate<A>): (fa: TaskOption<A>) => Separated<TaskOption<A>, TaskOption<A>>
}
```

Added in v0.1.18

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: TaskOption<A>) => Separated<TaskOption<B>, TaskOption<C>>
```

Added in v0.1.18

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.18

# Monad

## chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.18

## chainFirst

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<A>
```

Added in v0.1.18

## chainOption

**Signature**

```ts
export declare const chainOption: <A, B>(f: (a: A) => O.Option<B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.4

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <A, B>(f: (a: A) => O.Option<B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.10

## chainTask

**Signature**

```ts
export declare const chainTask: <A, B>(f: (a: A) => Task<B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.4

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A>
```

Added in v0.1.18

# combinators

## mapNullable

**Signature**

```ts
export declare const mapNullable: <A, B>(f: (a: A) => B | null | undefined) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.5

# constructors

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => TaskOption<NonNullable<A>>
```

Added in v0.1.4

## fromOption

**Signature**

```ts
export declare const fromOption: <A>(ma: O.Option<A>) => TaskOption<A>
```

Added in v0.1.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends unknown[], B>(f: (...a: A) => O.Option<B>) => (...a: A) => TaskOption<B>
```

Added in v0.1.10

## fromTask

**Signature**

```ts
export declare const fromTask: <A>(as: Task<A>) => TaskOption<A>
```

Added in v0.1.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <A>(ma: TaskEither<any, A>) => TaskOption<A>
```

Added in v0.1.4

## none

**Signature**

```ts
export declare const none: TaskOption<never>
```

Added in v0.1.0

## some

**Signature**

```ts
export declare const some: <A>(a: A) => TaskOption<A>
```

Added in v0.1.0

## tryCatch

**Signature**

```ts
export declare const tryCatch: <A>(f: Lazy<Promise<A>>) => TaskOption<A>
```

Added in v0.1.5

# destructors

## fold

**Signature**

```ts
export declare const fold: <A, B>(onNone: () => Task<B>, onSome: (a: A) => Task<B>) => (as: TaskOption<A>) => Task<B>
```

Added in v0.1.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <A>(onNone: () => Task<A>) => (as: TaskOption<A>) => Task<A>
```

Added in v0.1.0

## toNullable

**Signature**

```ts
export declare const toNullable: <A>(ma: TaskOption<A>) => Task<A | null>
```

Added in v0.1.4

## toUndefined

**Signature**

```ts
export declare const toUndefined: <A>(ma: TaskOption<A>) => Task<A | undefined>
```

Added in v0.1.4

# instances

## Alternative

**Signature**

```ts
export declare const Alternative: Alternative1<'TaskOption'>
```

Added in v0.1.18

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'TaskOption'>
```

Added in v0.1.18

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'TaskOption'>
```

Added in v0.1.18

## Compactable

**Signature**

```ts
export declare const Compactable: Compactable1<'TaskOption'>
```

Added in v0.1.18

## Filterable

**Signature**

```ts
export declare const Filterable: Filterable1<'TaskOption'>
```

Added in v0.1.18

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'TaskOption'>
```

Added in v0.1.18

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'TaskOption'>
```

Added in v0.1.18

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.0

## taskOption

**Signature**

```ts
export declare const taskOption: Monad1<'TaskOption'> & Alternative1<'TaskOption'> & Filterable1<'TaskOption'>
```

Added in v0.1.0

# model

## TaskOption (interface)

**Signature**

```ts
export interface TaskOption<A> extends Task<O.Option<A>> {}
```

Added in v0.1.0
