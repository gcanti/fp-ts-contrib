---
title: Free.ts
nav_order: 10
parent: Modules
---

## Free overview

Added in v0.1.3

---

<h2 class="text-delta">Table of contents</h2>

- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [flatten](#flatten)
- [combinators](#combinators)
  - [hoistFree](#hoistfree)
- [constructors](#constructors)
  - [liftF](#liftf)
- [destructors](#destructors)
  - [FoldFree2 (interface)](#foldfree2-interface)
  - [FoldFree2C (interface)](#foldfree2c-interface)
  - [FoldFree3 (interface)](#foldfree3-interface)
  - [foldFree](#foldfree)
- [instances](#instances)
  - [Applicative](#applicative-1)
  - [Apply](#apply-1)
  - [Functor](#functor-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [free](#free)
- [model](#model)
  - [Free (type alias)](#free-type-alias)
- [utils](#utils)
  - [isImpure](#isimpure)
  - [isPure](#ispure)

---

# Applicative

## of

**Signature**

```ts
export declare const of: <F, A>(a: A) => Free<F, A>
```

Added in v0.1.18

# Apply

## ap

**Signature**

```ts
export declare const ap: <F, A, B>(fa: Free<F, A>) => (fab: Free<F, (a: A) => B>) => Free<F, B>
```

Added in v0.1.18

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <F>(fa: Free<F, A>) => Free<F, B>
```

Added in v0.1.18

# Monad

## chain

**Signature**

```ts
export declare const chain: <F, A, B>(f: (a: A) => Free<F, B>) => (ma: Free<F, A>) => Free<F, B>
```

Added in v0.1.18

## flatten

**Signature**

```ts
export declare const flatten: <E, A>(mma: Free<E, Free<E, A>>) => Free<E, A>
```

Added in v0.1.18

# combinators

## hoistFree

Use a natural transformation to change the generating type constructor of a free monad

**Signature**

```ts
export declare function hoistFree<F extends URIS3 = never, G extends URIS3 = never>(
  nt: <U, L, A>(fa: Kind3<F, U, L, A>) => Kind3<G, U, L, A>
): <A>(fa: Free<F, A>) => Free<G, A>
export declare function hoistFree<F extends URIS2 = never, G extends URIS2 = never>(
  nt: <L, A>(fa: Kind2<F, L, A>) => Kind2<G, L, A>
): <A>(fa: Free<F, A>) => Free<G, A>
export declare function hoistFree<F extends URIS = never, G extends URIS = never>(
  nt: <A>(fa: Kind<F, A>) => Kind<G, A>
): <A>(fa: Free<F, A>) => Free<G, A>
export declare function hoistFree<F, G>(nt: <A>(fa: HKT<F, A>) => HKT<G, A>): <A>(fa: Free<F, A>) => Free<G, A>
```

Added in v0.1.3

# constructors

## liftF

Lift an impure value described by the generating type constructor `F` into the free monad

**Signature**

```ts
export declare const liftF: <F, A>(fa: HKT<F, A>) => Free<F, A>
```

Added in v0.1.3

# destructors

## FoldFree2 (interface)

**Signature**

```ts
export interface FoldFree2<M extends URIS2> {
  <F extends URIS2, L, A>(nt: <X>(fa: Kind2<F, L, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
  <F extends URIS, L, A>(nt: <X>(fa: Kind<F, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
}
```

Added in v0.1.3

## FoldFree2C (interface)

**Signature**

```ts
export interface FoldFree2C<M extends URIS2, L> {
  <F extends URIS2, A>(nt: <X>(fa: Kind2<F, L, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
  <F extends URIS, A>(nt: <X>(fa: Kind<F, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
}
```

Added in v0.1.3

## FoldFree3 (interface)

**Signature**

```ts
export interface FoldFree3<M extends URIS3> {
  <F extends URIS3, U, L, A>(nt: <X>(fa: Kind3<F, U, L, X>) => Kind3<M, U, L, X>, fa: Free<F, A>): Kind3<M, U, L, A>
  <F extends URIS2, U, L, A>(nt: <X>(fa: Kind2<F, L, X>) => Kind3<M, U, L, X>, fa: Free<F, A>): Kind3<M, U, L, A>
  <F extends URIS, U, L, A>(nt: <X>(fa: Kind<F, X>) => Kind3<M, U, L, X>, fa: Free<F, A>): Kind3<M, U, L, A>
}
```

Added in v0.1.3

## foldFree

Perform folding of a free monad using given natural transformation as an interpreter

**Signature**

```ts
export declare function foldFree<M extends URIS3>(M: Monad3<M>): FoldFree3<M>
export declare function foldFree<M extends URIS2>(M: Monad2<M>): FoldFree2<M>
export declare function foldFree<M extends URIS2, L>(M: Monad2C<M, L>): FoldFree2C<M, L>
export declare function foldFree<M extends URIS>(
  M: Monad1<M>
): <F extends URIS, A>(nt: <X>(fa: Kind<F, X>) => Kind<M, X>, fa: Free<F, A>) => Kind<M, A>
export declare function foldFree<M>(
  M: Monad<M>
): <F, A>(nt: <X>(fa: HKT<F, X>) => HKT<M, X>, fa: Free<F, A>) => HKT<M, A>
```

Added in v0.1.3

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'Free'>
```

Added in v0.1.18

## Apply

**Signature**

```ts
export declare const Apply: Apply2<'Free'>
```

Added in v0.1.18

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Free'>
```

Added in v0.1.18

## URI

**Signature**

```ts
export declare const URI: 'Free'
```

Added in v0.1.3

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.3

## free

Monad instance for Free

**Signature**

```ts
export declare const free: Monad2<'Free'>
```

Added in v0.1.3

# model

## Free (type alias)

**Signature**

```ts
export type Free<F, A> = Pure<F, A> | Impure<F, A, any>
```

Added in v0.1.3

# utils

## isImpure

Check if given Free instance is Impure

**Signature**

```ts
export declare const isImpure: <F, A>(fa: Free<F, A>) => fa is Impure<F, A, any>
```

Added in v0.1.3

## isPure

Check if given Free instance is Pure

**Signature**

```ts
export declare const isPure: <F, A>(fa: Free<F, A>) => fa is Pure<F, A>
```

Added in v0.1.3
