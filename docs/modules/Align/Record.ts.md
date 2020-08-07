---
title: Align/Record.ts
nav_order: 4
parent: Modules
---

## Record overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [align](#align)
  - [alignWith](#alignwith)
  - [nil](#nil)

---

# utils

## align

**Signature**

```ts
export declare function align<K extends string, P extends string, A, B>(
  fa: Record<K, A>,
  fb: Record<P, B>
): Record<K | P, These<A, B>>
export declare function align<A, B>(fa: Record<string, A>, fb: Record<string, B>): Record<string, These<A, B>>
```

Added in v0.1.0

## alignWith

**Signature**

```ts
export declare function alignWith<K extends string, P extends string, A, B, C>(
  fa: Record<K, A>,
  fb: Record<P, B>,
  f: (x: These<A, B>) => C
): Record<K | P, C>
export declare function alignWith<A, B, C>(
  fa: Record<string, A>,
  fb: Record<string, B>,
  f: (x: These<A, B>) => C
): Record<string, C>
```

Added in v0.1.0

## nil

**Signature**

```ts
export declare function nil<A>(): Record<string, A>
```

Added in v0.1.0
