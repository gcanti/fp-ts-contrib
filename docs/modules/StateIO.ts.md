---
title: StateIO.ts
nav_order: 15
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [StateIO (class)](#stateio-class)
  - [run (method)](#run-method)
  - [eval (method)](#eval-method)
  - [exec (method)](#exec-method)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [chain (method)](#chain-method)
- [URI (constant)](#uri-constant)
- [stateIO (constant)](#stateio-constant)
- [fromIO (function)](#fromio-function)
- [fromState (function)](#fromstate-function)
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

# StateIO (class)

**Signature**

```ts
export class StateIO<S, A> {
  constructor(readonly value: (s: S) => IO<[A, S]>) { ... }
  ...
}
```

## run (method)

**Signature**

```ts
run(s: S): [A, S] { ... }
```

## eval (method)

**Signature**

```ts
eval(s: S): A { ... }
```

## exec (method)

**Signature**

```ts
exec(s: S): S { ... }
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): StateIO<S, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: StateIO<S, (a: A) => B>): StateIO<S, B> { ... }
```

## ap\_ (method)

**Signature**

```ts
ap_<B, C>(this: StateIO<S, (b: B) => C>, fb: StateIO<S, B>): StateIO<S, C> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => StateIO<S, B>): StateIO<S, B> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# stateIO (constant)

**Signature**

```ts
export const stateIO: Monad2<URI> = ...
```

# fromIO (function)

**Signature**

```ts
export const fromIO = <S, A>(fa: IO<A>): StateIO<S, A> => ...
```

# fromState (function)

**Signature**

```ts
export const fromState = <S, A>(fa: State<S, A>): StateIO<S, A> => ...
```

# get (function)

**Signature**

```ts
export const get = <S>(): StateIO<S, S> => ...
```

# gets (function)

**Signature**

```ts
export const gets = <S, A>(f: (s: S) => A): StateIO<S, A> => ...
```

# modify (function)

**Signature**

```ts
export const modify = <S>(f: Endomorphism<S>): StateIO<S, void> => ...
```

# put (function)

**Signature**

```ts
export const put = <S>(s: S): StateIO<S, void> => ...
```
