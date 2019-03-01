---
title: TaskValidation.ts
nav_order: 11
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [URI](#uri)
- [TaskValidation](#taskvalidation)
  - [map](#map)
  - [fold](#fold)
- [URI](#uri-1)
- [taskValidation](#taskvalidation)
- [getApplicative](#getapplicative)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# TaskValidation

**Signature** (class)

```ts
export class TaskValidation<L, A> {
  constructor(readonly value: task.Task<validation.Validation<L, A>>) { ... }
  ...
}
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): TaskValidation<L, B> { ... }
```

## fold

**Signature** (method)

```ts
fold<R>(failure: (l: L) => R, success: (a: A) => R): task.Task<R> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# taskValidation

**Signature** (constant)

```ts
export const taskValidation: Functor2<URI> = ...
```

# getApplicative

**Signature** (function)

```ts
export const getApplicative = <L>(S: Semigroup<L>): Applicative2C<URI, L> => ...
```
