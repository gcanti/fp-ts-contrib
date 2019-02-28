---
title: TaskOption.ts
nav_order: 10
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [URI](#uri)
- [TaskOption](#taskoption)
  - [run](#run)
  - [map](#map)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [chain](#chain)
  - [fold](#fold)
  - [getOrElse](#getorelse)
- [URI](#uri-1)
- [none](#none)
- [some](#some)
- [taskOption](#taskoption)
- [fromOption](#fromoption)
- [fromTask](#fromtask)
- [tryCatch](#trycatch)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# TaskOption

**Signature** (class)

```ts
export class TaskOption<A> {
  constructor(readonly value: Task<Option<A>>) { ... }
  ...
}
```

## run

**Signature** (method)

```ts
run(): Promise<Option<A>> { ... }
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): TaskOption<B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: TaskOption<(a: A) => B>): TaskOption<B> { ... }
```

## ap\_

**Signature** (method)

```ts
ap_<B, C>(this: TaskOption<(b: B) => C>, fb: TaskOption<B>): TaskOption<C> { ... }
```

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => TaskOption<B>): TaskOption<B> { ... }
```

## fold

**Signature** (method)

```ts
fold<R>(onNone: R, onSome: (a: A) => R): Task<R> { ... }
```

## getOrElse

**Signature** (method)

```ts
getOrElse(a: A): Task<A> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# none

**Signature** (constant)

```ts
export const none = ...
```

# some

**Signature** (constant)

```ts
export const some = ...
```

# taskOption

**Signature** (constant)

```ts
export const taskOption: Monad1<URI> = ...
```

# fromOption

**Signature** (function)

```ts
export const fromOption = <A>(ma: Option<A>): TaskOption<A> => ...
```

# fromTask

**Signature** (function)

```ts
export const fromTask = <A>(ma: Task<A>): TaskOption<A> => ...
```

# tryCatch

**Signature** (function)

```ts
export const tryCatch = <A>(f: Lazy<Promise<A>>): TaskOption<A> =>
  new TaskOption(tryCatchTask(f, () => ...
```
