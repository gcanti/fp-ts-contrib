---
title: StateTaskEither.ts
nav_order: 9
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [StateTaskEither (class)](#statetaskeither-class)
  - [run (method)](#run-method)
  - [eval (method)](#eval-method)
  - [exec (method)](#exec-method)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [chain (method)](#chain-method)
  - [orElse (method)](#orelse-method)
- [URI (constant)](#uri-constant)
- [stateTaskEither (constant)](#statetaskeither-constant)
- [fromState (function)](#fromstate-function)
- [fromTaskEither (function)](#fromtaskeither-function)
- [get (function)](#get-function)
- [gets (function)](#gets-function)
- [modify (function)](#modify-function)
- [put (function)](#put-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# StateTaskEither (class)

**Signature**

```ts
export class StateTaskEither<S, L, A> {
  constructor(readonly value: (s: S) => TaskEither<L, [A, S]>) { ... }
  ...
}
```

## run (method)

**Signature**

```ts
run(s: S): Promise<Either<L, [A, S]>> { ... }
```

## eval (method)

**Signature**

```ts
eval(s: S): Promise<Either<L, A>> { ... }
```

## exec (method)

**Signature**

```ts
exec(s: S): Promise<Either<L, S>> { ... }
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): StateTaskEither<S, L, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: StateTaskEither<S, L, (a: A) => B>): StateTaskEither<S, L, B> { ... }
```

## ap\_ (method)

**Signature**

```ts
ap_<B, C>(this: StateTaskEither<S, L, (b: B) => C>, fb: StateTaskEither<S, L, B>): StateTaskEither<S, L, C> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => StateTaskEither<S, L, B>): StateTaskEither<S, L, B> { ... }
```

## orElse (method)

**Signature**

```ts
orElse<M>(f: (l: L) => StateTaskEither<S, M, A>): StateTaskEither<S, M, A> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# stateTaskEither (constant)

**Signature**

```ts
export const stateTaskEither: Monad3<URI> = ...
```

# fromState (function)

**Signature**

```ts
export const fromState = <S, A, L>(fa: State<S, A>): StateTaskEither<S, L, A> => ...
```

# fromTaskEither (function)

**Signature**

```ts
export const fromTaskEither = <S, L, A>(fa: TaskEither<L, A>): StateTaskEither<S, L, A> => ...
```

# get (function)

**Signature**

```ts
export const get = <L, S>(): StateTaskEither<S, L, S> => ...
```

# gets (function)

**Signature**

```ts
export const gets = <S, L, A>(f: (s: S) => A): StateTaskEither<S, L, A> => ...
```

# modify (function)

**Signature**

```ts
export const modify = <L, S>(f: Endomorphism<S>): StateTaskEither<S, L, void> => ...
```

# put (function)

**Signature**

```ts
export const put = <L, S>(s: S): StateTaskEither<S, L, void> => ...
```
