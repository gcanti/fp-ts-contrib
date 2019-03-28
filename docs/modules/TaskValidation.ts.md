---
title: TaskValidation.ts
nav_order: 11
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
