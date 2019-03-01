---
title: StateIO.ts
nav_order: 8
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [URI](#uri)
- [StateIO](#stateio)
  - [run](#run)
  - [eval](#eval)
  - [exec](#exec)
  - [map](#map)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [chain](#chain)
- [URI](#uri-1)
- [stateIO](#stateio)
- [fromIO](#fromio)
- [fromState](#fromstate)
- [get](#get)
- [gets](#gets)
- [modify](#modify)
- [put](#put)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# StateIO

**Signature** (class)

```ts
export class StateIO<S, A> {
  constructor(readonly value: (s: S) => IO<[A, S]>) { ... }
  ...
}
```

## run

**Signature** (method)

```ts
run(s: S): [A, S] { ... }
```

## eval

**Signature** (method)

```ts
eval(s: S): A { ... }
```

## exec

**Signature** (method)

```ts
exec(s: S): S { ... }
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): StateIO<S, B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: StateIO<S, (a: A) => B>): StateIO<S, B> { ... }
```

## ap\_

**Signature** (method)

```ts
ap_<B, C>(this: StateIO<S, (b: B) => C>, fb: StateIO<S, B>): StateIO<S, C> { ... }
```

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => StateIO<S, B>): StateIO<S, B> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# stateIO

**Signature** (constant)

```ts
export const stateIO: Monad2<URI> = ...
```

# fromIO

**Signature** (function)

```ts
export const fromIO = <S, A>(fa: IO<A>): StateIO<S, A> => ...
```

# fromState

**Signature** (function)

```ts
export const fromState = <S, A>(fa: State<S, A>): StateIO<S, A> => ...
```

# get

**Signature** (function)

```ts
export const get = <S>(): StateIO<S, S> => ...
```

# gets

**Signature** (function)

```ts
export const gets = <S, A>(f: (s: S) => A): StateIO<S, A> => ...
```

# modify

**Signature** (function)

```ts
export const modify = <S>(f: Endomorphism<S>): StateIO<S, void> => ...
```

# put

**Signature** (function)

```ts
export const put = <S>(s: S): StateIO<S, void> => ...
```
