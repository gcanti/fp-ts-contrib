---
title: Free.ts
nav_order: 9
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [FoldFree2 (interface)](#foldfree2-interface)
- [FoldFree2C (interface)](#foldfree2c-interface)
- [FoldFree3 (interface)](#foldfree3-interface)
- [Free (type alias)](#free-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [free (constant)](#free-constant)
- [foldFree (function)](#foldfree-function)
- [hoistFree (function)](#hoistfree-function)
- [isImpure (function)](#isimpure-function)
- [isPure (function)](#ispure-function)
- [liftF (function)](#liftf-function)
- [ap (export)](#ap-export)
- [chain (export)](#chain-export)
- [flatten (export)](#flatten-export)
- [map (export)](#map-export)

---

# FoldFree2 (interface)

**Signature**

```ts
export interface FoldFree2<M extends URIS2> {
  <F extends URIS2, L, A>(nt: <X>(fa: Kind2<F, L, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
  <F extends URIS, L, A>(nt: <X>(fa: Kind<F, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
}
```

Added in v0.1.3

# FoldFree2C (interface)

**Signature**

```ts
export interface FoldFree2C<M extends URIS2, L> {
  <F extends URIS2, A>(nt: <X>(fa: Kind2<F, L, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
  <F extends URIS, A>(nt: <X>(fa: Kind<F, X>) => Kind2<M, L, X>, fa: Free<F, A>): Kind2<M, L, A>
}
```

Added in v0.1.3

# FoldFree3 (interface)

**Signature**

```ts
export interface FoldFree3<M extends URIS3> {
  <F extends URIS3, U, L, A>(nt: <X>(fa: Kind3<F, U, L, X>) => Kind3<M, U, L, X>, fa: Free<F, A>): Kind3<M, U, L, A>
  <F extends URIS2, U, L, A>(nt: <X>(fa: Kind2<F, L, X>) => Kind3<M, U, L, X>, fa: Free<F, A>): Kind3<M, U, L, A>
  <F extends URIS, U, L, A>(nt: <X>(fa: Kind<F, X>) => Kind3<M, U, L, X>, fa: Free<F, A>): Kind3<M, U, L, A>
}
```

Added in v0.1.3

# Free (type alias)

**Signature**

```ts
export type Free<F, A> = Pure<F, A> | Impure<F, A, any>
```

Added in v0.1.3

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.3

# URI (constant)

**Signature**

```ts
export const URI: "Free" = ...
```

Added in v0.1.3

# free (constant)

Monad instance for Free

**Signature**

```ts
export const free: Monad2<URI> = ...
```

Added in v0.1.3

# foldFree (function)

Perform folding of a free monad using given natural transformation as an interpreter

**Signature**

```ts
export function foldFree<M extends URIS3>(M: Monad3<M>): FoldFree3<M>
export function foldFree<M extends URIS2>(M: Monad2<M>): FoldFree2<M>
export function foldFree<M extends URIS2, L>(M: Monad2C<M, L>): FoldFree2C<M, L>
export function foldFree<M extends URIS>(
  M: Monad1<M>
): <F extends URIS, A>(nt: <X>(fa: Kind<F, X>) => Kind<M, X>, fa: Free<F, A>) => Kind<M, A>
export function foldFree<M>(M: Monad<M>): <F, A>(nt: <X>(fa: HKT<F, X>) => HKT<M, X>, fa: Free<F, A>) => HKT<M, A> { ... }
```

Added in v0.1.3

# hoistFree (function)

Use a natural transformation to change the generating type constructor of a free monad

**Signature**

```ts
export function hoistFree<F extends URIS3 = never, G extends URIS3 = never>(
  nt: <U, L, A>(fa: Kind3<F, U, L, A>) => Kind3<G, U, L, A>
): <A>(fa: Free<F, A>) => Free<G, A>
export function hoistFree<F extends URIS2 = never, G extends URIS2 = never>(
  nt: <L, A>(fa: Kind2<F, L, A>) => Kind2<G, L, A>
): <A>(fa: Free<F, A>) => Free<G, A>
export function hoistFree<F extends URIS = never, G extends URIS = never>(
  nt: <A>(fa: Kind<F, A>) => Kind<G, A>
): <A>(fa: Free<F, A>) => Free<G, A>
export function hoistFree<F, G>(nt: <A>(fa: HKT<F, A>) => HKT<G, A>): <A>(fa: Free<F, A>) => Free<G, A> { ... }
```

Added in v0.1.3

# isImpure (function)

Check if given Free instance is Impure

**Signature**

```ts
export const isImpure = <F, A>(fa: Free<F, A>): fa is Impure<F, A, any> => ...
```

Added in v0.1.3

# isPure (function)

Check if given Free instance is Pure

**Signature**

```ts
export const isPure = <F, A>(fa: Free<F, A>): fa is Pure<F, A> => ...
```

Added in v0.1.3

# liftF (function)

Lift an impure value described by the generating type constructor `F` into the free monad

**Signature**

```ts
export const liftF = <F, A>(fa: HKT<F, A>): Free<F, A> => impure(fa, a => ...
```

Added in v0.1.3

# ap (export)

**Signature**

```ts
<E, A>(fa: Free<E, A>) => <B>(fab: Free<E, (a: A) => B>) => Free<E, B>
```

Added in v0.1.3

# chain (export)

**Signature**

```ts
<E, A, B>(f: (a: A) => Free<E, B>) => (ma: Free<E, A>) => Free<E, B>
```

Added in v0.1.3

# flatten (export)

**Signature**

```ts
<E, A>(mma: Free<E, Free<E, A>>) => Free<E, A>
```

Added in v0.1.3

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: Free<E, A>) => Free<E, B>
```

Added in v0.1.3
