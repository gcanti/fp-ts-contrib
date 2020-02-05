---
title: TaskOption.ts
nav_order: 21
parent: Modules
---

# TaskOption overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [TaskOption (interface)](#taskoption-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [alt](#alt)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [chain](#chain)
- [chainFirst](#chainfirst)
- [chainOption](#chainoption)
- [chainOptionK](#chainoptionk)
- [chainTask](#chaintask)
- [compact](#compact)
- [filter](#filter)
- [filterMap](#filtermap)
- [flatten](#flatten)
- [fold](#fold)
- [fromNullable](#fromnullable)
- [fromOption](#fromoption)
- [fromOptionK](#fromoptionk)
- [fromTask](#fromtask)
- [fromTaskEither](#fromtaskeither)
- [getOrElse](#getorelse)
- [map](#map)
- [mapNullable](#mapnullable)
- [none](#none)
- [partition](#partition)
- [partitionMap](#partitionmap)
- [separate](#separate)
- [some](#some)
- [taskOption](#taskoption)
- [toNullable](#tonullable)
- [toUndefined](#toundefined)
- [tryCatch](#trycatch)

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

# URI

**Signature**

```ts
export const URI: "TaskOption" = ...
```

Added in v0.1.0

# alt

**Signature**

```ts
<A>(that: () => TaskOption<A>) => (fa: TaskOption<A>) => TaskOption<A>
```

Added in v0.1.0

# ap

**Signature**

```ts
<A>(fa: TaskOption<A>) => <B>(fab: TaskOption<(a: A) => B>) => TaskOption<B>
```

Added in v0.1.0

# apFirst

**Signature**

```ts
<B>(fb: TaskOption<B>) => <A>(fa: TaskOption<A>) => TaskOption<A>
```

Added in v0.1.0

# apSecond

**Signature**

```ts
<B>(fb: TaskOption<B>) => <A>(fa: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.0

# chain

**Signature**

```ts
<A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.0

# chainFirst

**Signature**

```ts
<A, B>(f: (a: A) => TaskOption<B>) => (ma: TaskOption<A>) => TaskOption<A>
```

Added in v0.1.0

# chainOption

**Signature**

```ts
export function chainOption<A, B>(f: (a: A) => Option<B>): (ma: TaskOption<A>) => TaskOption<B> { ... }
```

Added in v0.1.4

# chainOptionK

**Signature**

```ts
export function chainOptionK<A, B>(f: (a: A) => Option<B>): (ma: TaskOption<A>) => TaskOption<B> { ... }
```

Added in v0.1.10

# chainTask

**Signature**

```ts
export function chainTask<A, B>(f: (a: A) => Task<B>): (ma: TaskOption<A>) => TaskOption<B> { ... }
```

Added in v0.1.4

# compact

**Signature**

```ts
<A>(fa: TaskOption<Option<A>>) => TaskOption<A>
```

Added in v0.1.5

# filter

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: TaskOption<A>) => TaskOption<B>; <A>(predicate: Predicate<A>): (fa: TaskOption<A>) => TaskOption<A>; }
```

Added in v0.1.5

# filterMap

**Signature**

```ts
<A, B>(f: (a: A) => Option<B>) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.5

# flatten

**Signature**

```ts
<A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A>
```

Added in v0.1.0

# fold

**Signature**

```ts
export function fold<A, B>(onNone: () => Task<B>, onSome: (a: A) => Task<B>): (as: TaskOption<A>) => Task<B> { ... }
```

Added in v0.1.0

# fromNullable

**Signature**

```ts
export function fromNullable<A>(a: A): TaskOption<NonNullable<A>> { ... }
```

Added in v0.1.4

# fromOption

**Signature**

```ts
export const fromOption: <A>(ma: Option<A>) => TaskOption<A> = ...
```

Added in v0.1.0

# fromOptionK

**Signature**

```ts
export function fromOptionK<A extends Array<unknown>, B>(f: (...a: A) => Option<B>): (...a: A) => TaskOption<B> { ... }
```

Added in v0.1.10

# fromTask

**Signature**

```ts
export const fromTask: <A>(as: Task<A>) => TaskOption<A> = ...
```

Added in v0.1.0

# fromTaskEither

**Signature**

```ts
export function fromTaskEither<A>(ma: TaskEither<any, A>): TaskOption<A> { ... }
```

Added in v0.1.4

# getOrElse

**Signature**

```ts
export function getOrElse<A>(onNone: () => Task<A>): (as: TaskOption<A>) => Task<A> { ... }
```

Added in v0.1.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => (fa: TaskOption<A>) => TaskOption<B>
```

Added in v0.1.0

# mapNullable

**Signature**

```ts
export function mapNullable<A, B>(f: (a: A) => B | null | undefined): (ma: TaskOption<A>) => TaskOption<B> { ... }
```

Added in v0.1.5

# none

**Signature**

```ts
export const none: TaskOption<never> = ...
```

Added in v0.1.0

# partition

**Signature**

```ts
{ <A, B>(refinement: Refinement<A, B>): (fa: TaskOption<A>) => Separated<TaskOption<A>, TaskOption<B>>; <A>(predicate: Predicate<A>): (fa: TaskOption<A>) => Separated<TaskOption<A>, TaskOption<A>>; }
```

Added in v0.1.5

# partitionMap

**Signature**

```ts
<A, B, C>(f: (a: A) => Either<B, C>) => (fa: TaskOption<A>) => Separated<TaskOption<B>, TaskOption<C>>
```

Added in v0.1.5

# separate

**Signature**

```ts
<A, B>(fa: TaskOption<Either<A, B>>) => Separated<TaskOption<A>, TaskOption<B>>
```

Added in v0.1.5

# some

**Signature**

```ts
export const some: <A>(a: A) => TaskOption<A> = ...
```

Added in v0.1.0

# taskOption

**Signature**

```ts
export const taskOption: Monad1<URI> & Alt1<URI> & Filterable1<URI> = ...
```

Added in v0.1.0

# toNullable

**Signature**

```ts
export function toNullable<A>(ma: TaskOption<A>): Task<A | null> { ... }
```

Added in v0.1.4

# toUndefined

**Signature**

```ts
export function toUndefined<A>(ma: TaskOption<A>): Task<A | undefined> { ... }
```

Added in v0.1.4

# tryCatch

**Signature**

```ts
export function tryCatch<A>(f: Lazy<Promise<A>>): TaskOption<A> { ... }
```

Added in v0.1.5
