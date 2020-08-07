---
title: ArrayOption.ts
nav_order: 5
parent: Modules
---

## ArrayOption overview

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
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [chainOptionK](#chainoptionk)
  - [flatten](#flatten)
- [constructors](#constructors)
  - [fromArray](#fromarray)
  - [fromOption](#fromoption)
  - [fromOptionK](#fromoptionk)
  - [none](#none)
  - [some](#some)
- [destructors](#destructors)
  - [fold](#fold)
  - [getOrElse](#getorelse)
- [instances](#instances)
  - [Alt](#alt)
  - [Alternative](#alternative-1)
  - [Applicative](#applicative-1)
  - [Apply](#apply-1)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [arrayOption](#arrayoption)
- [model](#model)
  - [ArrayOption (interface)](#arrayoption-interface)

---

# Alternative

## alt

**Signature**

```ts
export declare const alt: <A>(that: () => ArrayOption<A>) => (fa: ArrayOption<A>) => ArrayOption<A>
```

Added in v0.1.18

## zero

**Signature**

```ts
export declare const zero: <A>() => ArrayOption<A>
```

Added in v0.1.18

# Applicative

## of

**Signature**

```ts
export declare const of: <A>(a: A) => ArrayOption<A>
```

Added in v0.1.18

# Apply

## ap

**Signature**

```ts
export declare const ap: <A>(fa: ArrayOption<A>) => <B>(fab: ArrayOption<(a: A) => B>) => ArrayOption<B>
```

Added in v0.1.18

## apFirst

**Signature**

```ts
export declare const apFirst: <B>(fb: ArrayOption<B>) => <A>(fa: ArrayOption<A>) => ArrayOption<A>
```

Added in v0.1.18

## apSecond

**Signature**

```ts
export declare const apSecond: <B>(fb: ArrayOption<B>) => <A>(fa: ArrayOption<A>) => ArrayOption<B>
```

Added in v0.1.18

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: ArrayOption<A>) => ArrayOption<B>
```

Added in v0.1.18

# Monad

## chain

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => ArrayOption<B>) => (fa: ArrayOption<A>) => ArrayOption<B>
```

Added in v0.1.18

## chainFirst

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => ArrayOption<B>) => (ma: ArrayOption<A>) => ArrayOption<A>
```

Added in v0.1.18

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <A, B>(f: (a: A) => Option<B>) => (ma: ArrayOption<A>) => ArrayOption<B>
```

Added in v0.1.10

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: ArrayOption<ArrayOption<A>>) => ArrayOption<A>
```

Added in v0.1.18

# constructors

## fromArray

**Signature**

```ts
export declare const fromArray: <A>(as: A[]) => ArrayOption<A>
```

Added in v0.1.0

## fromOption

**Signature**

```ts
export declare const fromOption: <A>(ma: Option<A>) => ArrayOption<A>
```

Added in v0.1.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <A extends unknown[], B>(f: (...a: A) => Option<B>) => (...a: A) => ArrayOption<B>
```

Added in v0.1.10

## none

**Signature**

```ts
export declare const none: ArrayOption<never>
```

Added in v0.1.0

## some

**Signature**

```ts
export declare const some: <A>(a: A) => ArrayOption<A>
```

Added in v0.1.0

# destructors

## fold

**Signature**

```ts
export declare const fold: <A, B>(onNone: () => B[], onSome: (a: A) => B[]) => (as: ArrayOption<A>) => B[]
```

Added in v0.1.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <A>(onNone: () => A[]) => (as: ArrayOption<A>) => A[]
```

Added in v0.1.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'ArrayOption'>
```

Added in v0.1.18

## Alternative

**Signature**

```ts
export declare const Alternative: Alternative1<'ArrayOption'>
```

Added in v0.1.18

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'ArrayOption'>
```

Added in v0.1.18

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'ArrayOption'>
```

Added in v0.1.18

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'ArrayOption'>
```

Added in v0.1.18

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'ArrayOption'>
```

Added in v0.1.18

## URI

**Signature**

```ts
export declare const URI: 'ArrayOption'
```

Added in v0.1.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.0

## arrayOption

**Signature**

```ts
export declare const arrayOption: Monad1<'ArrayOption'> & Alt1<'ArrayOption'>
```

Added in v0.1.0

# model

## ArrayOption (interface)

**Signature**

```ts
export interface ArrayOption<A> extends Array<Option<A>> {}
```

Added in v0.1.0
