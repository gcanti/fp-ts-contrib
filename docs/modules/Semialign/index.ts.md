---
title: Semialign/index.ts
nav_order: 13
parent: Modules
---

# Overview

The `Semialign` type class represents functors supporting a zip operation that takes the
union of non-uniform shapes.

`Semialign` instances are required to satisfy the following laws:

1. `F.align(fa, fa) = F.map(fa, (a) => both(a, a))`
2. `F.align(F.map(fa, f), F.map(fb, g)) = F.map(F.align(fa, fb), (t) => These.bimap(t, f, g))`
3. `F.alignWith(fa, fb, f) = F.map(F.align(fa, fb), f)`
4. `F.align(fa, F.align(fb, fc)) = F.map(F.align(F.align(fa, fb), fc), These.assoc)`

Where `These.assoc` implements the associativity law of `These` and has the following type signature:
`function assoc<A, B, C>(fa: These<A, These<B, C>>): These<These<A, B>, C>`

Adapted from http://hackage.haskell.org/package/these-0.8/docs/Data-Align.html

---

<h2 class="text-delta">Table of contents</h2>

- [Semialign (interface)](#semialign-interface)
- [Semialign1 (interface)](#semialign1-interface)
- [Semialign2 (interface)](#semialign2-interface)
- [Semialign2C (interface)](#semialign2c-interface)
- [Semialign3 (interface)](#semialign3-interface)
- [Semialign3C (interface)](#semialign3c-interface)

---

# Semialign (interface)

**Signature**

```ts
export interface Semialign<F> extends Functor<F> {
  readonly align: <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, These<A, B>>
  readonly alignWith: <A, B, C>(fa: HKT<F, A>, fb: HKT<F, B>, f: (x: These<A, B>) => C) => HKT<F, C>
}
```

Added in v0.3.0

# Semialign1 (interface)

**Signature**

```ts
export interface Semialign1<F extends URIS> extends Functor1<F> {
  readonly align: <A, B>(fa: Type<F, A>, fb: Type<F, B>) => Type<F, These<A, B>>
  readonly alignWith: <A, B, C>(fa: Type<F, A>, fb: Type<F, B>, f: (x: These<A, B>) => C) => Type<F, C>
}
```

# Semialign2 (interface)

**Signature**

```ts
export interface Semialign2<F extends URIS2> extends Functor2<F> {
  readonly align: <L, A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, These<A, B>>
  readonly alignWith: <L, A, B, C>(fa: Type2<F, L, A>, fb: Type2<F, L, B>, f: (x: These<A, B>) => C) => Type2<F, L, C>
}
```

# Semialign2C (interface)

**Signature**

```ts
export interface Semialign2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly align: <A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, These<A, B>>
  readonly alignWith: <A, B, C>(fa: Type2<F, L, A>, fb: Type2<F, L, B>, f: (x: These<A, B>) => C) => Type2<F, L, C>
}
```

# Semialign3 (interface)

**Signature**

```ts
export interface Semialign3<F extends URIS3> extends Functor3<F> {
  readonly align: <U, L, A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, These<A, B>>
  readonly alignWith: <U, L, A, B, C>(
    fa: Type3<F, U, L, A>,
    fb: Type3<F, U, L, B>,
    f: (x: These<A, B>) => C
  ) => Type3<F, U, L, C>
}
```

# Semialign3C (interface)

**Signature**

```ts
export interface Semialign3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
  readonly align: <A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, These<A, B>>
  readonly alignWith: <A, B, C>(
    fa: Type3<F, U, L, A>,
    fb: Type3<F, U, L, B>,
    f: (x: These<A, B>) => C
  ) => Type3<F, U, L, C>
}
```
