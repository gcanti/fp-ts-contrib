---
title: IxPointed.ts
nav_order: 18
parent: Modules
---

## IxPointed overview

Added in v0.1.24

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [IxPointed3 (interface)](#ixpointed3-interface)
  - [IxPointed4 (interface)](#ixpointed4-interface)

---

# type classes

## IxPointed3 (interface)

**Signature**

```ts
export interface IxPointed3<F extends URIS3> {
  readonly URI: F
  readonly iof: <I, A>(a: A) => Kind3<F, I, I, A>
}
```

Added in v0.1.24

## IxPointed4 (interface)

**Signature**

```ts
export interface IxPointed4<F extends URIS4> {
  readonly URI: F
  readonly iof: <I, E, A>(a: A) => Kind4<F, I, I, E, A>
}
```

Added in v0.1.24
