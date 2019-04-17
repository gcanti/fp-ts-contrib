---
title: Align/Record.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [align (function)](#align-function)
- [alignWith (function)](#alignwith-function)
- [nil (function)](#nil-function)

---

# align (function)

**Signature**

```ts
export function align<K extends string, P extends string, A, B>(
  fa: Record<K, A>,
  fb: Record<P, B>
): Record<K | P, These<A, B>>
export function align<A, B>(fa: Record<string, A>, fb: Record<string, B>): Record<string, These<A, B>> { ... }
```

# alignWith (function)

**Signature**

```ts
export function alignWith<K extends string, P extends string, A, B, C>(
  fa: Record<K, A>,
  fb: Record<P, B>,
  f: (x: These<A, B>) => C
): Record<K | P, C>
export function alignWith<A, B, C>(
  fa: Record<string, A>,
  fb: Record<string, B>,
  f: (x: These<A, B>) => C
): Record<string, C> { ... }
```

# nil (function)

**Signature**

```ts
export const nil = <A>(): Record<string, A> => ...
```
