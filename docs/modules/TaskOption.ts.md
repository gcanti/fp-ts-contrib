---
title: TaskOption.ts
nav_order: 19
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
- [chainOption (function)](#chainoption-function)
- [chainTask (function)](#chaintask-function)
- [fold (function)](#fold-function)
- [fromNullable (function)](#fromnullable-function)
- [fromTaskEither (function)](#fromtaskeither-function)
- [getOrElse (function)](#getorelse-function)
- [mapNullable (function)](#mapnullable-function)
- [toNullable (function)](#tonullable-function)
- [toUndefined (function)](#toundefined-function)
- [tryCatch (function)](#trycatch-function)
- [alt (export)](#alt-export)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [compact (export)](#compact-export)
- [filter (export)](#filter-export)
- [filterMap (export)](#filtermap-export)
- [flatten (export)](#flatten-export)
- [map (export)](#map-export)
- [partition (export)](#partition-export)
- [partitionMap (export)](#partitionmap-export)
- [separate (export)](#separate-export)

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
export const URI: "TaskOption" = ...
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
export const taskOption: Monad1<URI> & Alt1<URI> & Filterable1<URI> = ...
```

Added in v0.1.0

# chainOption (function)

**Signature**

```ts
export function chainOption<A, B>(f: (a: A) => Option<B>): (ma: TaskOption<A>) => TaskOption<B> { ... }
```

Added in v0.1.4

# chainTask (function)

**Signature**

```ts
export function chainTask<A, B>(f: (a: A) => Task<B>): (ma: TaskOption<A>) => TaskOption<B> { ... }
```

Added in v0.1.4

# fold (function)

**Signature**

```ts
export function fold<A, B>(onNone: () => Task<B>, onSome: (a: A) => Task<B>): (as: TaskOption<A>) => Task<B> { ... }
```

Added in v0.1.0

# fromNullable (function)

**Signature**

```ts
export function fromNullable<A>(a: A): TaskOption<NonNullable<A>> { ... }
```

Added in v0.1.4

# fromTaskEither (function)

**Signature**

```ts
export function fromTaskEither<A>(ma: TaskEither<any, A>): TaskOption<A> { ... }
```

Added in v0.1.4

# getOrElse (function)

**Signature**

```ts
export function getOrElse<A>(onNone: () => Task<A>): (as: TaskOption<A>) => Task<A> { ... }
```

Added in v0.1.0

# mapNullable (function)

**Signature**

```ts
export function mapNullable<A, B>(f: (a: A) => B | null | undefined): (ma: TaskOption<A>) => TaskOption<B> { ... }
```

Added in v0.1.5

# toNullable (function)

**Signature**

```ts
export function toNullable<A>(ma: TaskOption<A>): Task<A | null> { ... }
```

Added in v0.1.4

# toUndefined (function)

**Signature**

```ts
export function toUndefined<A>(ma: TaskOption<A>): Task<A | undefined> { ... }
```

Added in v0.1.4

# tryCatch (function)

**Signature**

```ts
export function tryCatch<A>(f: Lazy<Promise<A>>): TaskOption<A> { ... }
```

Added in v0.1.5

# alt (export)

**Signature**

```ts
<A>(that: () => TaskOption<A>) => (fa: TaskOption<A>) => TaskOption<A>
```

Added in v0.1.0

# ap (export)

**Signature**

```ts
<A>(fa: TaskOption<A>) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v0.1.0

# apFirst (export)

**Signature**

```ts
<B>(fb: TaskOption<B>) => <A>(fa: TaskOption<A>) => TaskOption<A>
```

Added in v0.1.0

# apSecond (export)

**Signature**

```ts
<B>(fb: TaskOption<B>) => <A>(fa: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.0

# chain (export)

**Signature**

```ts
<A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.0

# chainFirst (export)

**Signature**

```ts
<A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<A>
```

Added in v0.1.0

# compact (export)

**Signature**

```ts
<A>(fa: TaskOption<Option<A>>) => TaskOption<A>
```

Added in v0.1.5

# filter (export)

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: TaskOption<A>) => TaskOption<B>; <A>(predicate: Predicate<A>): (fa: TaskOption<A>) => TaskOption<A>; }
```

Added in v0.1.5

# filterMap (export)

**Signature**

```ts
<A, B>(f: (a: A) => Option<B>) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.5

# flatten (export)

**Signature**

```ts
<A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A>
```

Added in v0.1.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.0

# partition (export)

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: TaskOption<A>) => Separated<TaskOption<A>, TaskOption<B>>; <A>(predicate: Predicate<A>): (fa: TaskOption<A>) => Separated<TaskOption<A>, TaskOption<A>>; }
```

Added in v0.1.5

# partitionMap (export)

**Signature**

```ts
<A, B, C>(f: (a: A) => Either<B, C>) => (fa: TaskOption<A>) => Separated<TaskOption<B>, TaskOption<C>>
```

Added in v0.1.5

# separate (export)

**Signature**

```ts
<A, B>(fa: TaskOption<Either<A, B>>) => Separated<TaskOption<A>, TaskOption<B>>
```

Added in v0.1.5
