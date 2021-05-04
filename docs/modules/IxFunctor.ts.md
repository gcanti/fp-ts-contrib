---
title: IxFunctor.ts
nav_order: 16
parent: Modules
---

## IxFunctor overview

Added in v0.1.24

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [iflap](#iflap)
- [type classes](#type-classes)
  - [IxFunctor3 (interface)](#ixfunctor3-interface)
  - [IxFunctor4 (interface)](#ixfunctor4-interface)
- [utils](#utils)
  - [ibindTo](#ibindto)

---

# combinators

## iflap

**Signature**

```ts
export declare function iflap<F extends URIS4>(
  F: IxFunctor4<F>
): <A>(a: A) => <I, O, E, B>(fab: Kind4<F, I, O, E, (a: A) => B>) => Kind4<F, I, O, E, B>
export declare function iflap<F extends URIS3>(
  F: IxFunctor3<F>
): <A>(a: A) => <I, O, B>(fab: Kind3<F, I, O, (a: A) => B>) => Kind3<F, I, O, B>
```

Added in v0.1.24

# type classes

## IxFunctor3 (interface)

**Signature**

```ts
export interface IxFunctor3<F extends URIS3> {
  readonly URI: F
  readonly imap: <I, O, A, B>(fa: Kind3<F, I, O, A>, f: (a: A) => B) => Kind3<F, I, O, B>
}
```

Added in v0.1.24

## IxFunctor4 (interface)

**Signature**

```ts
export interface IxFunctor4<F extends URIS4> {
  readonly URI: F
  readonly imap: <I, O, E, A, B>(fa: Kind4<F, I, O, E, A>, f: (a: A) => B) => Kind4<F, I, O, E, B>
}
```

Added in v0.1.24

# utils

## ibindTo

**Signature**

```ts
export declare function ibindTo<F extends URIS4>(
  F: IxFunctor4<F>
): <N extends string>(name: N) => <I, O, E, A>(fa: Kind4<F, I, O, E, A>) => Kind4<F, I, O, E, { [K in N]: A }>
export declare function ibindTo<F extends URIS3>(
  F: IxFunctor3<F>
): <N extends string>(name: N) => <I, O, A>(fa: Kind3<F, I, O, A>) => Kind3<F, I, O, { [K in N]: A }>
```

Added in v0.1.24
