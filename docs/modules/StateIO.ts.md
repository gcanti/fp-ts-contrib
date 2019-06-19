---
title: StateIO.ts
nav_order: 12
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [StateIO (interface)](#stateio-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [evalState (constant)](#evalstate-constant)
- [execState (constant)](#execstate-constant)
- [fromIO (constant)](#fromio-constant)
- [fromState (constant)](#fromstate-constant)
- [get (constant)](#get-constant)
- [gets (constant)](#gets-constant)
- [modify (constant)](#modify-constant)
- [put (constant)](#put-constant)
- [stateIO (constant)](#stateio-constant)
- [run (function)](#run-function)

---

# StateIO (interface)

**Signature**

```ts
export interface StateIO<S, A> {
  (s: S): IO<[A, S]>
}
```

Added in v0.1.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.0

# URI (constant)

**Signature**

```ts
export const URI = ...
```

Added in v0.1.0

# evalState (constant)

**Signature**

```ts
export const evalState: <S, A>(ma: StateIO<S, A>, s: S) => IO<A> = ...
```

Added in v0.1.0

# execState (constant)

**Signature**

```ts
export const execState: <S, A>(ma: StateIO<S, A>, s: S) => IO<S> = ...
```

Added in v0.1.0

# fromIO (constant)

**Signature**

```ts
export const fromIO: <S, A>(ma: IO<A>) => StateIO<S, A> = ...
```

Added in v0.1.0

# fromState (constant)

**Signature**

```ts
export const fromState: <S, A>(ma: State<S, A>) => StateIO<S, A> = ...
```

Added in v0.1.0

# get (constant)

**Signature**

```ts
export const get: <S>() => StateIO<S, S> = ...
```

Added in v0.1.0

# gets (constant)

**Signature**

```ts
export const gets: <S, A>(f: (s: S) => A) => StateIO<S, A> = ...
```

Added in v0.1.0

# modify (constant)

**Signature**

```ts
export const modify: <S>(f: (s: S) => S) => StateIO<S, void> = ...
```

Added in v0.1.0

# put (constant)

**Signature**

```ts
export const put: <S>(s: S) => StateIO<S, void> = ...
```

Added in v0.1.0

# stateIO (constant)

**Signature**

```ts
export const stateIO: Monad2<URI> = ...
```

Added in v0.1.0

# run (function)

**Signature**

```ts
export function run<S, A>(ma: StateIO<S, A>, s: S): A { ... }
```

Added in v0.1.0
