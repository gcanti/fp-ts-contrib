---
title: IxApply.ts
nav_order: 14
parent: Modules
---

## IxApply overview

Added in v0.1.24

---

<h2 class="text-delta">Table of contents</h2>

- [Combinators](#combinators)
  - [iapFirst](#iapfirst)
  - [iapS](#iaps)
  - [iapSecond](#iapsecond)
- [type classes](#type-classes)
  - [IxApply3 (interface)](#ixapply3-interface)
  - [IxApply4 (interface)](#ixapply4-interface)

---

# Combinators

## iapFirst

**Signature**

```ts
export declare function iapFirst<F extends URIS4>(
  F: IxApply4<F>
): <O, Z, E, B>(second: Kind4<F, O, Z, E, B>) => <I, A>(first: Kind4<F, I, O, E, A>) => Kind4<F, I, Z, E, A>
export declare function iapFirst<F extends URIS3>(
  F: IxApply3<F>
): <O, Z, B>(second: Kind3<F, O, Z, B>) => <I, A>(first: Kind3<F, I, O, A>) => Kind3<F, I, Z, A>
```

Added in v0.1.24

## iapS

**Signature**

```ts
export declare function iapS<F extends URIS4>(
  F: IxApply4<F>
): <N extends string, A, I, O, E, B>(
  name: Exclude<N, keyof A>,
  fb: Kind4<F, I, O, E, B>
) => (fa: Kind4<F, I, O, E, A>) => Kind4<F, I, O, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function iapS<F extends URIS3>(
  F: IxApply3<F>
): <N extends string, A, O, S, B>(
  name: Exclude<N, keyof A>,
  fb: Kind3<F, O, S, B>
) => <First, O>(fa: Kind3<F, First, O, A>) => Kind3<F, First, S, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
```

Added in v0.1.24

## iapSecond

**Signature**

```ts
export declare function iapSecond<F extends URIS4>(
  F: IxApply4<F>
): <I, O, Z, E, A, B>(second: Kind4<F, O, Z, E, B>) => (first: Kind4<F, I, O, E, A>) => Kind4<F, I, Z, E, B>
export declare function iapSecond<F extends URIS3>(
  F: IxApply3<F>
): <I, O, Z, A, B>(second: Kind3<F, O, Z, B>) => (first: Kind3<F, I, O, A>) => Kind3<F, I, Z, B>
```

Added in v0.1.24

# type classes

## IxApply3 (interface)

**Signature**

```ts
export interface IxApply3<F extends URIS3> extends IxFunctor3<F> {
  readonly iap: <I, O, Z, A, B>(fab: Kind3<F, I, O, (a: A) => B>, fa: Kind3<F, O, Z, A>) => Kind3<F, I, Z, B>
}
```

Added in v0.1.24

## IxApply4 (interface)

**Signature**

```ts
export interface IxApply4<F extends URIS4> extends IxFunctor4<F> {
  readonly iap: <I, O, Z, E, A, B>(fab: HKT4<F, I, O, E, (a: A) => B>, fa: HKT4<F, O, Z, E, A>) => HKT4<F, I, Z, E, B>
}
```

Added in v0.1.24
