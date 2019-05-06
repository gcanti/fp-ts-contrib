---
title: TaskValidation.ts
nav_order: 20
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [TaskValidation (class)](#taskvalidation-class)
  - [map (method)](#map-method)
  - [fold (method)](#fold-method)
- [URI (constant)](#uri-constant)
- [taskValidation (constant)](#taskvalidation-constant)
- [getApplicative (function)](#getapplicative-function)
- [withTimeout (function)](#withtimeout-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# TaskValidation (class)

**Signature**

```ts
export class TaskValidation<L, A> {
  constructor(readonly value: task.Task<validation.Validation<L, A>>) { ... }
  ...
}
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): TaskValidation<L, B> { ... }
```

## fold (method)

**Signature**

```ts
fold<R>(failure: (l: L) => R, success: (a: A) => R): task.Task<R> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# taskValidation (constant)

**Signature**

```ts
export const taskValidation: Functor2<URI> = ...
```

# getApplicative (function)

**Signature**

```ts
export const getApplicative = <L>(S: Semigroup<L>): Applicative2C<URI, L> => ...
```

# withTimeout (function)

Returns the `TaskValidation` result if it completes within a timeout, or a fallback value instead.

**Signature**

```ts
export const withTimeout = <L, A>(
  fa: TaskValidation<L, A>,
  onTimeout: validation.Validation<L, A>,
  millis: number
): TaskValidation<L, A> => ...
```

**Example**

```ts
import { TaskValidation, withTimeout } from 'fp-ts-contrib/lib/TaskValidation'
import { delay } from 'fp-ts/lib/Task'
import { success, failure } from 'fp-ts/lib/Validation'

const completeAfter2s = new TaskValidation(delay(2000, success('result')))

withTimeout(completeAfter2s, failure('timeout'), 3000).value.run() // Promise(success('result'))
withTimeout(completeAfter2s, failure('timeout'), 1000).value.run() // Promise(failure('timeout'))
withTimeout(completeAfter2s, success('timeout'), 1000).value.run() // Promise(success('timeout'))
```

Added in v0.0.6
