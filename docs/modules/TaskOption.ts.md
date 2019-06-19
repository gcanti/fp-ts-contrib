---
title: TaskOption.ts
nav_order: 15
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [TaskOption (interface)](#taskoption-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [fromOption (constant)](#fromoption-constant)
- [fromTask (constant)](#fromtask-constant)
- [none (constant)](#none-constant)
- [some (constant)](#some-constant)
- [taskOption (constant)](#taskoption-constant)
- [fold (function)](#fold-function)
- [getOrElse (function)](#getorelse-function)

---

# TaskOption (interface)

**Signature**

```ts
export interface TaskOption<A> extends Task<Option<A>> {}
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

# fromOption (constant)

**Signature**

```ts
export const fromOption: <A>(ma: Option<A>) => TaskOption<A> = ...
```

Added in v0.1.0

# fromTask (constant)

**Signature**

```ts
export const fromTask: <A>(as: Task<A>) => TaskOption<A> = ...
```

Added in v0.1.0

# none (constant)

**Signature**

```ts
export const none: TaskOption<never> = ...
```

Added in v0.1.0

# some (constant)

**Signature**

```ts
export const some: <A>(a: A) => TaskOption<A> = ...
```

Added in v0.1.0

# taskOption (constant)

**Signature**

```ts
export const taskOption: Monad1<URI> & Alt1<URI> = ...
```

Added in v0.1.0

# fold (function)

**Signature**

```ts
export function fold<A, B>(onNone: () => Task<B>, onSome: (a: A) => Task<B>): (as: TaskOption<A>) => Task<B> { ... }
```

Added in v0.1.0

# getOrElse (function)

**Signature**

```ts
export function getOrElse<A>(onNone: () => Task<A>): (as: TaskOption<A>) => Task<A> { ... }
```

Added in v0.1.0
