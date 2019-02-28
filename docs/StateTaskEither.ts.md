---
title: StateTaskEither.ts
nav_order: 9
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [URI](#uri)
- [StateTaskEither](#statetaskeither)
  - [run](#run)
  - [eval](#eval)
  - [exec](#exec)
  - [map](#map)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [chain](#chain)
  - [orElse](#orelse)
- [URI](#uri-1)
- [stateTaskEither](#statetaskeither)
- [fromState](#fromstate)
- [fromTaskEither](#fromtaskeither)
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

# StateTaskEither

**Signature** (class)

```ts
export class StateTaskEither<S, L, A> {
  constructor(readonly value: (s: S) => TaskEither<L, [A, S]>) { ... }
  ...
}
```

## run

**Signature** (method)

```ts
run(s: S): Promise<Either<L, [A, S]>> { ... }
```

## eval

**Signature** (method)

```ts
eval(s: S): Promise<Either<L, A>> { ... }
```

## exec

**Signature** (method)

```ts
exec(s: S): Promise<Either<L, S>> { ... }
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): StateTaskEither<S, L, B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: StateTaskEither<S, L, (a: A) => B>): StateTaskEither<S, L, B> { ... }
```

## ap\_

**Signature** (method)

```ts
ap_<B, C>(this: StateTaskEither<S, L, (b: B) => C>, fb: StateTaskEither<S, L, B>): StateTaskEither<S, L, C> { ... }
```

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => StateTaskEither<S, L, B>): StateTaskEither<S, L, B> { ... }
```

## orElse

**Signature** (method)

```ts
orElse<M>(f: (l: L) => StateTaskEither<S, M, A>): StateTaskEither<S, M, A> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# stateTaskEither

**Signature** (constant)

```ts
export const stateTaskEither: Monad3<URI> = ...
```

# fromState

**Signature** (function)

```ts
export const fromState = <S, A, L>(fa: State<S, A>): StateTaskEither<S, L, A> => ...
```

# fromTaskEither

**Signature** (function)

```ts
export const fromTaskEither = <S, L, A>(fa: TaskEither<L, A>): StateTaskEither<S, L, A> => ...
```

# get

**Signature** (function)

```ts
export const get = <L, S>(): StateTaskEither<S, L, S> => ...
```

# gets

**Signature** (function)

```ts
export const gets = <S, L, A>(f: (s: S) => A): StateTaskEither<S, L, A> => ...
```

# modify

**Signature** (function)

```ts
export const modify = <L, S>(f: Endomorphism<S>): StateTaskEither<S, L, void> => ...
```

# put

**Signature** (function)

```ts
export const put = <L, S>(s: S): StateTaskEither<S, L, void> => ...
```
