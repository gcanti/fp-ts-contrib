---
title: IxChain.ts
nav_order: 15
parent: Modules
---

## IxChain overview

Added in v0.1.24

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [ichainFirst](#ichainfirst)
- [type classes](#type-classes)
  - [IxChain3 (interface)](#ixchain3-interface)
  - [IxChain4 (interface)](#ixchain4-interface)
- [utils](#utils)
  - [ibind](#ibind)

---

# combinators

## ichainFirst

**Signature**

```ts
export declare function ichainFirst<M extends URIS4>(
  M: IxChain4<M>
): <I, O, Z, E, A, B>(f: (a: A) => Kind4<M, O, Z, E, B>) => (first: Kind4<M, I, O, E, A>) => Kind4<M, I, Z, E, A>
export declare function ichainFirst<M extends URIS3>(
  M: IxChain3<M>
): <I, O, Z, A, B>(f: (a: A) => Kind3<M, O, Z, B>) => (first: Kind3<M, I, O, A>) => Kind3<M, I, Z, A>
```

Added in v0.1.24

# type classes

## IxChain3 (interface)

**Signature**

```ts
export interface IxChain3<F extends URIS3> extends IxApply3<F> {
  readonly ichain: <A, B, I, O, Z>(fa: Kind3<F, I, O, A>, f: (a: A) => Kind3<F, O, Z, B>) => Kind3<F, I, Z, B>
}
```

Added in v0.1.24

## IxChain4 (interface)

**Signature**

```ts
export interface IxChain4<F extends URIS4> extends IxApply4<F> {
  readonly ichain: <I, O, Z, E, A, B>(
    fa: Kind4<F, I, O, E, A>,
    f: (a: A) => Kind4<F, O, Z, E, B>
  ) => Kind4<F, I, Z, E, B>
}
```

Added in v0.1.24

# utils

## ibind

**Signature**

```ts
export declare function ibind<M extends URIS4>(
  M: IxChain4<M>
): <N extends string, A, Second, Third, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind4<M, Second, Third, E, B>
) => <First>(
  ma: Kind4<M, First, Second, E, A>
) => Kind4<M, First, Third, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function ibind<M extends URIS3>(
  M: IxChain3<M>
): <N extends string, A, Second, Third, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind3<M, Second, Third, B>
) => <First>(
  ma: Kind3<M, First, Second, A>
) => Kind3<M, First, Third, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.24
