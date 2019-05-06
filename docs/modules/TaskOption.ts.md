---
title: TaskOption.ts
nav_order: 19
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [TaskOption (class)](#taskoption-class)
  - [run (method)](#run-method)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [chain (method)](#chain-method)
  - [fold (method)](#fold-method)
  - [getOrElse (method)](#getorelse-method)
- [URI (constant)](#uri-constant)
- [none (constant)](#none-constant)
- [some (constant)](#some-constant)
- [taskOption (constant)](#taskoption-constant)
- [fromOption (function)](#fromoption-function)
- [fromTask (function)](#fromtask-function)
- [tryCatch (function)](#trycatch-function)
- [withTimeout (function)](#withtimeout-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# TaskOption (class)

**Signature**

```ts
export class TaskOption<A> {
  constructor(readonly value: Task<Option<A>>) { ... }
  ...
}
```

## run (method)

**Signature**

```ts
run(): Promise<Option<A>> { ... }
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): TaskOption<B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: TaskOption<(a: A) => B>): TaskOption<B> { ... }
```

## ap\_ (method)

**Signature**

```ts
ap_<B, C>(this: TaskOption<(b: B) => C>, fb: TaskOption<B>): TaskOption<C> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => TaskOption<B>): TaskOption<B> { ... }
```

## fold (method)

**Signature**

```ts
fold<R>(onNone: R, onSome: (a: A) => R): Task<R> { ... }
```

## getOrElse (method)

**Signature**

```ts
getOrElse(a: A): Task<A> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# none (constant)

**Signature**

```ts
export const none = ...
```

# some (constant)

**Signature**

```ts
export const some = ...
```

# taskOption (constant)

**Signature**

```ts
export const taskOption: Monad1<URI> = ...
```

# fromOption (function)

**Signature**

```ts
export const fromOption = <A>(ma: Option<A>): TaskOption<A> => ...
```

# fromTask (function)

**Signature**

```ts
export const fromTask = <A>(ma: Task<A>): TaskOption<A> => ...
```

# tryCatch (function)

**Signature**

```ts
export const tryCatch = <A>(f: Lazy<Promise<A>>): TaskOption<A> =>
  new TaskOption(tryCatchTask(f, () => ...
```

# withTimeout (function)

Returns the `TaskOption` result if it completes within a timeout, or a fallback value instead.

**Signature**

```ts
export const withTimeout = <A>(fa: TaskOption<A>, onTimeout: Option<A>, millis: number): TaskOption<A> => ...
```

**Example**

```ts
import { TaskOption, withTimeout } from 'fp-ts-contrib/lib/TaskOption'
import { delay } from 'fp-ts/lib/Task'
import { some, none } from 'fp-ts/lib/Option'

const completeAfter2s = new TaskOption(delay(2000, some('result')))

withTimeout(completeAfter2s, some('timeout'), 3000).run() // Promise(some('result'))
withTimeout(completeAfter2s, none, 1000).run() // Promise(none)
withTimeout(completeAfter2s, some('timeout'), 1000).run() // Promise(some('timeout'))
```

Added in v0.0.6
