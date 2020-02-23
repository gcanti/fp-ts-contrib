---
title: MVar.ts
nav_order: 12
parent: Modules
---

# MVar overview

Adapted from https://hackage.haskell.org/package/base-4.12.0.0/docs/Control-Concurrent-MVar.html

Added in v0.1.13

---

<h2 class="text-delta">Table of contents</h2>

- [isEmpty](#isempty)
- [modify](#modify)
- [newEmptyMVar](#newemptymvar)
- [newMVar](#newmvar)
- [put](#put)
- [read](#read)
- [swap](#swap)
- [take](#take)
- [tryPut](#tryput)
- [tryRead](#tryread)
- [tryTake](#trytake)

---

# isEmpty

**Signature**

```ts
export function isEmpty<T>(mv: MVar<T>): boolean { ... }
```

Added in v0.1.13

# modify

**Signature**

```ts
export function modify<T>(mv: MVar<T>): (f: (a: T) => T.Task<T>) => T.Task<void> { ... }
```

Added in v0.1.13

# newEmptyMVar

**Signature**

```ts
export function newEmptyMVar<T>(): MVar<T> { ... }
```

Added in v0.1.13

# newMVar

**Signature**

```ts
export function newMVar<T>(a: T): MVar<T> { ... }
```

Added in v0.1.13

# put

**Signature**

```ts
export function put<T>(a: T): (mv: MVar<T>) => T.Task<void> { ... }
```

Added in v0.1.13

# read

**Signature**

```ts
export function read<T>(mv: MVar<T>): T.Task<T> { ... }
```

Added in v0.1.13

# swap

**Signature**

```ts
export function swap<T>(mv: MVar<T>): (a: T) => T.Task<T> { ... }
```

Added in v0.1.13

# take

**Signature**

```ts
export function take<T>(mv: MVar<T>): T.Task<T> { ... }
```

Added in v0.1.13

# tryPut

**Signature**

```ts
export function tryPut<T>(mv: MVar<T>): (a: T) => IO.IO<boolean> { ... }
```

Added in v0.1.13

# tryRead

**Signature**

```ts
export function tryRead<T>(mv: MVar<T>): IO.IO<O.Option<T>> { ... }
```

Added in v0.1.13

# tryTake

**Signature**

```ts
export function tryTake<T>(mv: MVar<T>): IO.IO<O.Option<T>> { ... }
```

Added in v0.1.13
